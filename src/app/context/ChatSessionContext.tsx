"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useFetchWithAuth } from "@/app/hooks/useFetchWithAuth";
import { useAuth } from "./AuthContext";
import { toast } from "sonner";

interface ChatSessionContextType {
  sessions: Session[];
  setSessions: React.Dispatch<React.SetStateAction<Session[]>>;
  loading: boolean;
  isError: boolean;
  refreshSessions: () => Promise<void>;
  addSession: (session: Session) => void;
  removeSession: (id: string) => void;
}

const ChatSessionContext = createContext<ChatSessionContextType | null>(null);

export function ChatSessionProvider({ children }: { children: ReactNode }) {
  const { accessToken } = useAuth();
  const fetchWithAuth = useFetchWithAuth();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const refreshSessions = async () => {
    if (!accessToken) return;

    setLoading(true);
    setIsError(false);

    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
      const res = await fetchWithAuth(`${API_BASE_URL}/sessions`);

      const sessions: Session[] = await res.json();
      setSessions(sessions);
    } catch (err) {
      console.error("Failed to refresh sessions", err);
      toast.error("Sidebar Error", {
        description: "An error occurred while fetching chat sessions.",
      });
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const addSession = (session: Session) => {
    setSessions((prev) => [session, ...prev]);
  };

  const removeSession = (id: string) => {
    setSessions((prev) => prev.filter((s) => String(s.id) !== id));
  };

  useEffect(() => {
    refreshSessions();
  }, [accessToken]);

  return (
    <ChatSessionContext.Provider
      value={{
        sessions,
        loading,
        isError,
        refreshSessions,
        addSession,
        removeSession,
        setSessions,
      }}
    >
      {children}
    </ChatSessionContext.Provider>
  );
}

export function useChatSessions() {
  const ctx = useContext(ChatSessionContext);
  if (!ctx)
    throw new Error("useChatSessions must be used within ChatSessionProvider");
  return ctx;
}
