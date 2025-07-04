"use client";

import { Textarea } from "@/components/ui/textarea";
import { ArrowUp, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFetchWithAuth } from "../hooks/useFetchWithAuth";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

export default function ChatInputBox({
  updateMessages,
}: {
  updateMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}) {
  const fetchWithAuth = useFetchWithAuth();

  const [prompt, setPrompt] = useState<string>("");
  const [isSending, setIsSending] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const pathname = usePathname();
  const currentSessionId = pathname.startsWith("/c/")
    ? pathname.split("/c/")[1]
    : null;

  // useEffect(() => {
  //   return () => {
  //     const controller = abortControllerRef.current;
  //     if (controller && !controller.signal.aborted) {
  //       controller.abort();
  //     }
  //   };
  // }, [pathname]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      if (!prompt.trim() || isSending) return;
      e.preventDefault();
      chatWithAI();
    }
  };

  const chatWithAI = async () => {
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt || !currentSessionId || isSending) return;

    const userMessage: Message = {
      id: `temp-${Date.now()}`,
      sender: "user",
      content: trimmedPrompt,
    };

    updateMessages((prev) => [...prev, userMessage]);
    setPrompt("");
    setIsSending(true);

    abortControllerRef.current?.abort();
    abortControllerRef.current = new AbortController();

    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
      const res = await fetchWithAuth(`${API_BASE_URL}/chat/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ session_id: currentSessionId, prompt }),
        signal: abortControllerRef.current.signal,
      });

      const aiResponse: { message: Message } = await res.json();
      updateMessages((prev) => [...prev, aiResponse.message]);
    } catch (err) {
      let message = "Something went wrong";
      if (err instanceof Error) message = err.message;

      console.error("Error chatting with AI:", err);
      toast.error(message, {
        description:
          "If the problem persists, email me at faselgodbcho@gmail.com",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="sticky bottom-0 bg-background pb-4 px-4 w-full">
      <div className="w-full max-w-3xl mx-auto space-y-2">
        <div className="relative">
          <Textarea
            placeholder="Ask something about the PDF..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            className="resize-none h-[100px] w-full border border-black/40 rounded-2xl overflow-y-auto shadow-none outline-none font-normal py-4 px-6 pr-14 text-base"
          />

          <button
            onClick={chatWithAI}
            disabled={!prompt.trim() || isSending}
            aria-label="Send message"
            className={`absolute bottom-3 right-3 w-9 h-9 rounded-full bg-black/80 flex items-center justify-center transition-opacity
              ${
                !prompt.trim() || isSending
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-black/90 cursor-pointer"
              }`}
          >
            {isSending ? (
              <Loader2 className="text-white animate-spin" size={19} />
            ) : (
              <ArrowUp className="text-white" size={19} />
            )}
          </button>
        </div>

        <p className="text-sm text-center text-muted-foreground px-2">
          PDF AI can make mistakes. Double-check important info.
        </p>
      </div>
    </div>
  );
}
