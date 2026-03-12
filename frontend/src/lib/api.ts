import { auth } from "./firebase";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

interface RequestOptions extends RequestInit {
  data?: any;
}

/**
 * Wrapper around fetch that automatically appends the Firebase ID token
 * if the user is currently logged in.
 */
export async function apiFetch<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { data, headers: customHeaders, ...rest } = options;

  const user = auth.currentUser;
  const token = user ? await user.getIdToken() : null;

  const headers = new Headers(customHeaders);

  if (data) {
    headers.set("Content-Type", "application/json");
    rest.body = JSON.stringify(data);
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...rest,
    headers,
  });

  if (!response.ok) {
    let errorMessage = "API request failed";
    try {
      const errorData = await response.json();
      errorMessage = errorData.error || errorData.message || errorMessage;
    } catch {
      // ignore
    }
    throw new Error(errorMessage);
  }

  return response.json();
}
