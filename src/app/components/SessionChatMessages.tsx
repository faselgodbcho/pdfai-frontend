"use client";

import { useEffect, useRef } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn, parseAIMessage } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ScrollArea } from "@/components/ui/scroll-area";

type SessionChatMessagesProps = {
  loading: boolean;
  messages: Message[];
  displayMessage: boolean;
  isChatting: boolean;
};

export default function SessionChatMessages({
  loading,
  messages,
  displayMessage,
  isChatting,
}: SessionChatMessagesProps) {
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="h-full w-full flex justify-center items-start px-4 pb-6">
      <ScrollArea className="w-full h-full">
        {loading ? (
          <div className="max-w-3xl mx-auto space-y-4 pt-8">
            {/* <div className="flex justify-end px-3 py-2">
              <Skeleton className="h-9 w-40 rounded-xl bg-black/5" />
            </div>
            <div className="flex justify-start px-3 py-2">
              <Skeleton className="h-20 w-sm rounded-xl bg-black/5" />
            </div>
            <div className="flex justify-end px-3 py-2 mt-2">
              <Skeleton className="h-9 w-80 rounded-xl bg-black/5" />
            </div>
            <div className="flex justify-start px-3 py-2">
              <Skeleton className="h-20 w-md rounded-xl bg-black/5" />
            </div> */}
          </div>
        ) : messages.length === 0 && displayMessage ? (
          <div className="max-w-3xl mx-auto pt-16 text-center text-muted-foreground text-sm">
            <p>No messages yet.</p>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-4 pt-8 pb-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex gap-3 text-base px-3 py-2",
                  msg.sender === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "px-4 py-2 rounded-xl whitespace-pre-wrap",
                    msg.sender === "user"
                      ? "bg-[#e9e9e980] text-foreground max-w-lg"
                      : "text-foreground max-w-3xl"
                  )}
                >
                  {msg.sender === "ai" ? (
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={{
                        a: ({ href, children }) => (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {children}
                          </a>
                        ),
                      }}
                    >
                      {parseAIMessage(msg.content)}
                    </ReactMarkdown>
                  ) : (
                    msg.content
                  )}
                </div>
              </div>
            ))}

            {isChatting && (
              <div className="flex gap-3 text-base px-3 py-2 justify-start">
                <div className="flex items-center justify-start h-6">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-ping-dot" />
                </div>
              </div>
            )}
          </div>
        )}
        <div ref={scrollRef} />
      </ScrollArea>
    </div>
  );
}
