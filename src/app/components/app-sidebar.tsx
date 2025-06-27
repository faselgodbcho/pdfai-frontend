import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  SquarePen,
  EllipsisVertical,
  Trash2,
  Github,
} from "lucide-react";
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

import HoverDropdown from "./HoverDropdown";

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row items-center justify-between px-6 py-5">
        <Link href="/" className="text-[24px] font-extrabold text-black/80">
          PDF AI
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="px-4">
          <SidebarGroupContent>
            <SidebarMenu className="mb-4">
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/" className="py-3">
                    <SquarePen />
                    <span className="text-gray-80">New Chat</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
          <SidebarGroupLabel className="text-[15px] mb-2">
            Chats
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <HoverDropdown item={{ title: item.title, url: item.url }} />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Github />

            <span>
              <a href="https://github.com/faselgodbcho/pdf-ai" target="_blank">
                Github
              </a>
            </span>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
