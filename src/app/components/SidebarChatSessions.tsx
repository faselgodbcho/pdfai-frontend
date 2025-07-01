"use client";

import {
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import HoverDropdown from "./HoverDropdown";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useFetchWithAuth } from "@/app/hooks/useFetchWithAuth";
import { toast } from "sonner";

export default function SidebarChatSessions() {
  const fetchWithAuth = useFetchWithAuth();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const { accessToken, refreshAccessToken } = useAuth();

  useEffect(() => {
    if (!accessToken) return;

    const fetchChatSessions = async () => {
      setLoading(true);

      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
        const res = await fetchWithAuth(`${API_BASE_URL}/sessions`, {
          method: "GET",
        });

        const sessions: Session[] = await res.json();

        setSessions(sessions);
        setIsError(false);
      } catch (err) {
        console.error("Sidebar init error:", err);
        toast.error("Sidebar Error", {
          description: "An Error occurred while fetching chats.",
        });
        setIsError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchChatSessions();
  }, [accessToken, refreshAccessToken]);

  const handleDeleteSession = (id: string) => {
    setSessions((prev) => prev.filter((session) => String(session.id) !== id));
  };

  if (isError) {
    return (
      <SidebarGroupContent>
        <p className="p-4 text-gray-500">
          Failed to load chat sessions. Refreshing the page might help.
        </p>
      </SidebarGroupContent>
    );
  }

  if (loading) {
    return (
      <SidebarGroupContent>
        <p className="p-4 text-center text-gray-500">Loading chats…</p>
      </SidebarGroupContent>
    );
  }

  if (sessions.length === 0) {
    return (
      <SidebarGroupContent>
        <p className="p-4 text-gray-500">
          No chat sessions yet. Upload a PDF to start.
        </p>
      </SidebarGroupContent>
    );
  }

  return (
    <SidebarGroupContent>
      <SidebarMenu>
        {sessions.map((session) => (
          <SidebarMenuItem key={session.id} className="mb-1">
            <HoverDropdown
              item={{
                title:
                  session.pdf.title.length > 25
                    ? session.pdf.title.slice(0, 25) + "..."
                    : session.pdf.title,
                id: `${session.id}`,
              }}
              onDelete={handleDeleteSession}
            />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroupContent>
  );
}
