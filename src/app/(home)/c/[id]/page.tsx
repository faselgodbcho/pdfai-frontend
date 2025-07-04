"use client";

import ChatInputBox from "@/app/components/ChatInputBox";
import SessionChatMessages from "@/app/components/SessionChatMessages";
import { useFetchWithAuth } from "@/app/hooks/useFetchWithAuth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/app/context/AuthContext";

export default function Session() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [displayMessage, setDisplayMessage] = useState(false);

  const fetchWithAuth = useFetchWithAuth();
  const pathname = usePathname();
  const router = useRouter();
  const { accessToken } = useAuth();

  const currentSessionId = pathname.startsWith("/c/")
    ? pathname.split("/c/")[1]
    : null;

  useEffect(() => {
    if (!accessToken) return;

    const fetchChatMessages = async () => {
      try {
        const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
        const res = await fetchWithAuth(
          `${API_BASE_URL}/sessions/${currentSessionId}/messages/`
        );

        const fetchedMessages: Message[] = await res.json();

        if (fetchedMessages.length === 0) {
          setDisplayMessage(true);
        } else {
          setDisplayMessage(false);
        }
        setMessages(fetchedMessages);
      } catch (err) {
        console.error("Failed to fetch messages", err);
        toast.error("Failed to load messages for this session.");
        setDisplayMessage(false);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    if (currentSessionId) {
      fetchChatMessages();
    }
  }, [accessToken, currentSessionId, router]);

  return (
    <main className="flex flex-col bg-background h-[calc(100vh-60px)]">
      <div className="flex-1 overflow-hidden">
        <SessionChatMessages
          messages={messages}
          loading={loading}
          displayMessage={displayMessage}
        />
      </div>

      <ChatInputBox updateMessages={setMessages} />
    </main>
  );
}
