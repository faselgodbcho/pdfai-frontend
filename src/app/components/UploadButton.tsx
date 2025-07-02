"use client";

import { Sparkles } from "lucide-react";
import { useFetchWithAuth } from "../hooks/useFetchWithAuth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useChatSessions } from "../context/ChatSessionContext";

export default function UploadButton() {
  const fetchWithAuth = useFetchWithAuth();
  const router = useRouter();
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const { addSession } = useChatSessions();

  const uploadPDF = async (file: File) => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

    const formData = new FormData();
    formData.append("file", file);

    setIsUploading(true);

    try {
      const res = await fetchWithAuth(`${API_BASE_URL}/files/upload/`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      const sessionId = data.session_id;

      addSession({ id: sessionId, pdf: { title: data.title } });

      toast.success(data.detail || "PDF uploaded successfully!");

      router.push(`/c/${sessionId}`);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      toast.error(`PDF Upload failed: ${message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <label
      htmlFor="file-upload"
      className={cn(
        "inline-flex items-center text-base px-4 py-2 gap-2 cursor-pointer rounded-full bg-primary text-white hover:bg-primary/90 transition select-none",
        isUploading && "cursor-not-allowed opacity-70"
      )}
    >
      {isUploading && (
        <svg
          className="animate-spin w-5 h-5 mr-2 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8z"
          />
        </svg>
      )}
      {isUploading ? "Uploading..." : "Upload a PDF to Get Started"}
      <input
        id="file-upload"
        type="file"
        accept=".pdf"
        className="hidden"
        disabled={isUploading}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            uploadPDF(file);
            e.target.value = "";
          } else {
            toast.error("PDF File not detected.");
          }
        }}
      />
    </label>
  );
}
