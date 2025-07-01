"use client";

import {
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import HoverDropdown from "./HoverDropdown";
import { useChatSessions } from "@/app/context/ChatSessionContext";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function SidebarChatSessions() {
  const { sessions, loading, isError, removeSession } = useChatSessions();

  const pathname = usePathname();

  const currentSessionId = pathname.startsWith("/c/")
    ? pathname.split("/c/")[1]
    : null;

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
          <SidebarMenuItem
            key={session.id}
            className={cn(
              "mb-1",
              currentSessionId === String(session.id) &&
                "bg-muted rounded-md border border-black/10"
            )}
          >
            <HoverDropdown
              item={{
                title:
                  session.pdf.title.length > 25
                    ? session.pdf.title.slice(0, 25) + "..."
                    : session.pdf.title,
                id: `${session.id}`,
              }}
              onDelete={removeSession}
            />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroupContent>
  );
}
