import { useAuth } from "@/app/context/AuthContext";

export function useFetchWithAuth() {
  const { accessToken, refreshAccessToken, setAccessToken } = useAuth();

  async function fetchWithAuth(
    input: RequestInfo,
    init?: RequestInit
  ): Promise<Response> {
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
      const contentType = res.headers.get("content-type") || "";

      if (contentType.includes("application/json")) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Upload failed");
      } else {
        const fallbackText = await res.text();
        throw new Error(fallbackText || "Unknown error");
      }
    }

    return res;
  }

  return fetchWithAuth;
}
