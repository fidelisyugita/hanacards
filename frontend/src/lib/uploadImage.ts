import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

/**
 * Uploads an image to Firebase Storage and returns the public download URL.
 * @param file - The File object to upload
 * @param folder - The folder name in the storage bucket (defaults to 'products')
 * @returns Promise resolving to the download URL string
 */
export const uploadImage = async (file: File, folder: string = "products"): Promise<string> => {
  if (!file) throw new Error("No file provided");

  const timestamp = Date.now();
  const fileExtension = file.name.split('.').pop() || "png";
  const fileName = `${folder}/${timestamp}_${Math.random().toString(36).substring(2, 8)}.${fileExtension}`;
  
  const storageRef = ref(storage, fileName);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      () => {
        // Can be used to hook up an upload progress bar later
        // const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log(`Upload is ${progress}% done`);
      },
      (error) => {
        console.error("Upload failed", error);
        reject(error);
      },
      async () => {
        try {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        } catch (error) {
          reject(error);
        }
      }
    );
  });
};
