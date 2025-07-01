import { cookies } from "next/headers";

import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/app/components/app-sidebar";
import AppHeader from "../components/AppHeader";
import { AuthProvider } from "../context/AuthContext";

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
        <AppSidebar />
        <main className="flex-1 relative">
          <AppHeader />
          {children}
        </main>
      </AuthProvider>
    </SidebarProvider>
  );
}
