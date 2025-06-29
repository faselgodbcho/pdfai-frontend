"use client";

import {
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { getUserChatSessions, refreshAccessToken } from "@/lib/data";
import HoverDropdown from "./HoverDropdown";
import { useEffect, useState } from "react";
import { Content } from "next/font/google";

export default function SidebarChatSessions() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errMessage, setErrMessage] = useState<string | null>("");

  useEffect(() => {
    const initialize = async () => {
      setLoading(true);

      try {
        const { token, error } = await refreshAccessToken();
        if (error || !token?.access)
          throw new Error(error || "Failed to fetch token");

        const { data: sessionData, error: sessionError } =
          await getUserChatSessions(token.access);

        if (sessionError || !sessionData) throw new Error(sessionError);
        setSessions(sessionData);
        setErrMessage(null);
      } catch (err) {
        console.error("Sidebar init error:", err);
        const message = err instanceof Error ? err.message : String(err);
        setErrMessage(message);
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  if (errMessage) {
    return (
      <SidebarGroupContent>
        <p className="p-4 text-gray-500">{errMessage}</p>
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
                url: `/${session.id}`,
              }}
            />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroupContent>
  );
}
