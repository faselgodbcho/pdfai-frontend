import { cookies } from "next/headers";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/components/app-sidebar";
import AppHeader from "../components/AppHeader";
import { AuthProvider } from "@/app/context/AuthContext";
import { ChatSessionProvider } from "@/app/context/ChatSessionContext";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AuthProvider>
        <ChatSessionProvider>
          <AppSidebar />
          <div className="flex-1 relative">
            <AppHeader />
            {children}
          </div>
        </ChatSessionProvider>
      </AuthProvider>
    </SidebarProvider>
  );
}
