import { useRouter } from "next/navigation";
import { useFetchWithAuth } from "../hooks/useFetchWithAuth";
import { toast } from "sonner";
import { TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useChatSessions } from "../context/ChatSessionContext";

export default function DataControlSettings() {
  const fetchWithAuth = useFetchWithAuth();
  const { resetSessions } = useChatSessions();
  const router = useRouter();

  const handleClearChatHistory = async () => {
    if (!confirm("Are you sure you want to clear all chat history?")) return;

    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
      await fetchWithAuth(`${API_BASE_URL}/chat/clear/`, {
        method: "DELETE",
      });

      resetSessions();
      toast.success("Chat history cleared!");
      router.push("/");
    } catch (err) {
      toast.error("Failed to clear chat history.");
      console.error(err);
    }
  };

  const handleExportData = async () => {
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

      const res = await fetchWithAuth(`${API_BASE_URL}/chat/export/pdf/`);

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `all-chat-sessions.pdf`;
      link.click();
      toast.success("All chats exported as PDF!");
    } catch (err) {
      toast.error("Failed to export chat history.");
      console.error(err);
    }
  };

  return (
    <TabsContent value="dataControl" className="mt-4 max-w-md space-y-6">
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Clear Chat History</CardTitle>
          <CardDescription>
            Permanently delete all your conversations. This can’t be undone.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-end">
          <button
            onClick={handleClearChatHistory}
            className="px-4 py-2 text-sm cursor-pointer rounded border border-destructive text-destructive hover:bg-destructive/10 transition"
          >
            Clear History
          </button>
        </CardContent>
      </Card>

      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Export Chat Data</CardTitle>
          <CardDescription>
            Download your chat history as a PDF document.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-end">
          <button
            onClick={handleExportData}
            className="px-4 py-2 text-sm rounded bg-gray-800 text-white hover:bg-gray-700 transition cursor-pointer"
          >
            Export
          </button>
        </CardContent>
      </Card>
    </TabsContent>
  );
}
