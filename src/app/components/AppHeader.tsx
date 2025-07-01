"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Settings2 } from "lucide-react";
import LogoutButton from "./LogoutButton";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function AppHeader() {
  const pathname = usePathname();

  const currentSessionId = pathname.startsWith("/c/")
    ? pathname.split("/c/")[1]
    : null;

  return (
    <header
      className={cn(
        "w-full flex items-center sticky top-0 z-10 justify-between px-6 py-4 bg-white",
        currentSessionId && "shadow"
      )}
    >
      <SidebarTrigger className="hover:bg-white cursor-pointer" />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <Settings2 className="stroke-black/80 cursor-pointer" />{" "}
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="end" className="p-2">
          <LogoutButton />
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
