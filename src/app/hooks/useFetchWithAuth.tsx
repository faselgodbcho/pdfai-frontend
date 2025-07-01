// utils/useFetchWithAuth.ts
import { useAuth } from "@/app/context/AuthContext";

export function useFetchWithAuth() {
  const { accessToken, refreshAccessToken, setAccessToken } = useAuth();

  async function fetchWithAuth<T = any>(
    input: RequestInfo,
    init?: RequestInit
  ): Promise<T> {
    if (!accessToken) throw new Error("No access token available");

    const authHeaders = new Headers(init?.headers || {});
    authHeaders.set("Authorization", `Bearer ${accessToken}`);

    let res = await fetch(input, {
      ...init,
      headers: authHeaders,
      credentials: "include",
      cache: "no-store",
    });

    if (res.status === 401) {
      const { token, error } = await refreshAccessToken();

      if (error || !token) {
        setAccessToken(null);
        throw new Error(error || "Unauthorized: failed to refresh token");
      }

      authHeaders.set("Authorization", `Bearer ${token}`);

      res = await fetch(input, {
        ...init,
        headers: authHeaders,
        credentials: "include",
        cache: "no-store",
      });
    }

    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(
        `Request failed: ${res.status} ${res.statusText} - ${errorText}`
      );
    }

    // Return parsed response
    return res.json() as Promise<T>;
  }

  return fetchWithAuth;
}
