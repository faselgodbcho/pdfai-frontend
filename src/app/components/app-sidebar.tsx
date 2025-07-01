import { SquarePen, Github } from "lucide-react";
import Link from "next/link";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

import SidebarChatSessions from "./SidebarChatSessions";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row items-center justify-between px-6 py-5">
        <Link href="/" className="text-[23px] font-extrabold text-black/80">
          <span className="text-primary">PDF</span>{" "}
          <span className="text-black/70">AI</span>
        </Link>
      </SidebarHeader>
      <SidebarGroupContent>
        <SidebarMenu className="mb-4 px-4">
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/" className="py-4">
                <SquarePen />
                <span className="text-gray-80">New Chat</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
      <SidebarContent className="overflow-y-auto scrollbar-none">
        <SidebarGroup className="px-4">
          <SidebarGroupLabel className="text-[15px] mb-1 font-light">
            Chats
          </SidebarGroupLabel>
          <SidebarChatSessions />
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <Separator className="mb-2" />
          <SidebarMenuItem>
            <a
              href="https://github.com/faselgodbcho/pdfai-frontend"
              target="_blank"
              className="flex items-center gap-4 px-6 py-2 hover:bg-black/5 transition-colors rounded-xl"
            >
              <Github size={28} />

              <span>
                <p className="text-[17px] font-semibold">Source Code</p>
                <p className="text-xs text-gray-500">
                  View the project repository on GitHub
                </p>
              </span>
            </a>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
