"use client";

import { Download } from "lucide-react";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { useState } from "react";
import { useFetchWithAuth } from "../hooks/useFetchWithAuth";
import { usePathname } from "next/navigation";

export default function ExportPDF() {
  const pathname = usePathname();

  const currentSessionId = pathname.startsWith("/c/")
    ? pathname.split("/c/")[1]
    : null;

  const fetchWithAuth = useFetchWithAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!currentSessionId || isLoading) return;

    setIsLoading(true);
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
      const res = await fetchWithAuth(
        `${API_BASE_URL}/files/download/${currentSessionId}/`,
        {
          method: "GET",
        }
      );
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      const disposition = res.headers.get("Content-Disposition");
      const filenameMatch = disposition?.match(/filename="(.+)"/);
      const filename = filenameMatch
        ? filenameMatch[1]
        : `${currentSessionId}.pdf`;
      a.download = filename;
      a.click();

      window.URL.revokeObjectURL(url);
      toast.success("PDF download started!");
    } catch (err) {
      console.error(err);
      toast.error("PDF Download failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenuItem
      className="focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
      onClick={handleDownload}
    >
      <Download size={18} className="text-black/80" />

      <span>Download PDF</span>
    </DropdownMenuItem>
  );
}
