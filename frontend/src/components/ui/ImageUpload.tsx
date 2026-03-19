import React, { useState, useRef } from "react";
import { UploadCloud, X, Loader2 } from "lucide-react";
import { uploadImage } from "@/lib/uploadImage";

interface ImageUploadProps {
  onUploadSuccess: (url: string) => void;
  initialImage?: string;
  folder?: string;
}

export default function ImageUpload({ onUploadSuccess, initialImage, folder = "products" }: ImageUploadProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(initialImage || null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please select a valid image file.");
      return;
    }

    // Set preview immediately
    const localUrl = URL.createObjectURL(file);
    setImagePreview(localUrl);
    setIsUploading(true);
    setError(null);

    try {
      const downloadURL = await uploadImage(file, folder);
      onUploadSuccess(downloadURL);
    } catch {
      setError("Upload failed. Please try again.");
      setImagePreview(initialImage || null);
    } finally {
      setIsUploading(false);
    }
  };

  const handleClear = () => {
    setImagePreview(null);
    onUploadSuccess("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      {imagePreview ? (
        <div className="relative rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex items-center justify-center p-2 group h-48">
          <img
            src={imagePreview}
            alt="Preview"
            className={`w-full h-full object-contain ${isUploading ? "opacity-50" : ""}`}
          />
          
          {isUploading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="h-8 w-8 text-gray-900 animate-spin" />
            </div>
          )}

          {!isUploading && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-900 rounded-full p-1.5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
              title="Remove image"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-400 hover:bg-gray-50 transition-colors focus:outline-none"
        >
          <UploadCloud className="h-8 w-8 mb-3 text-gray-400" />
          <span className="text-sm font-medium">Click to upload image</span>
          <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 10MB</span>
        </button>
      )}

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}
