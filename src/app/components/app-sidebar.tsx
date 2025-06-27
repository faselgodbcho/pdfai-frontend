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

import HoverDropdown from "./HoverDropdown";

const items = [
  {
    id: "1",
    title: "The i3 Guide that no one on this planet",
    url: "#",
  },
  {
    id: "2",
    title: "The i3 Guide that no one on this planet",
    url: "#",
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row items-center justify-between px-6 py-5">
        <Link href="/" className="text-[23px] font-extrabold text-black/80">
          PDF AI
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
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.id} className="mb-1">
                  <HoverDropdown
                    item={{
                      title:
                        item.title.length > 25
                          ? item.title.slice(0, 25) + "..."
                          : item.title,
                      url: item.url,
                    }}
                  />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <Separator className="mb-2" />
          <SidebarMenuItem>
            <a
              href="https://github.com/faselgodbcho/pdf-ai"
              target="_blank"
              className="flex items-center gap-4 px-6 py-2 hover:bg-muted transition-colors rounded-xl"
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
