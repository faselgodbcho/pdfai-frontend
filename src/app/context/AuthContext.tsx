// components/AuthProvider.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL!;

type AuthContextType = {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
  refreshAccessToken: () => Promise<{
    token: string | null;
    error: string | null;
  }>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const refreshAccessToken = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        cache: "no-store",
      });

      if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);

      const { access }: { access: string } = await res.json();
      setAccessToken(access);
      return { token: access, error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setAccessToken(null);
      return { token: null, error: message };
    }
  };

  useEffect(() => {
    refreshAccessToken();

    const interval = setInterval(() => {
      refreshAccessToken();
    }, 15 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, refreshAccessToken }}
    >
      {children}
    </AuthContext.Provider>
  );
}
