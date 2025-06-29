const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

export async function refreshAccessToken() {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    const accessToken: { access: string } = await res.json();
    return { token: accessToken, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { token: null, error: message };
  }
}

export async function getUserChatSessions(
  accessToken: string
): Promise<GetUserSessionsResult> {
  try {
    const res = await fetch(`${API_BASE_URL}/sessions`, {
      method: "GET",
      credentials: "include",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    const sessions: Session[] = await res.json();

    return { data: sessions, error: null };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { data: null, error: message };
  }
}
