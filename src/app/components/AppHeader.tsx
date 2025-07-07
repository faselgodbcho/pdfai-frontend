"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Settings, Settings2 } from "lucide-react";
import LogoutButton from "./LogoutButton";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import ExportPDF from "./ExportPDF";
import UserSettings from "./UserSettings";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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
      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarTrigger className="hover:bg-white cursor-pointer" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Toggle Sidebar</p>
        </TooltipContent>
      </Tooltip>

      <Dialog>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger>
            <Tooltip>
              <TooltipTrigger asChild>
                <Settings2 className="stroke-black/80 cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent>
                <p>More Options</p>
              </TooltipContent>
            </Tooltip>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="end" className="p-2">
            {currentSessionId && <ExportPDF />}
            <DialogTrigger asChild>
              <DropdownMenuItem className="focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
                <Settings size={18} className="text-black/80" />
                <span>Settings</span>
              </DropdownMenuItem>
            </DialogTrigger>
            <LogoutButton />
          </DropdownMenuContent>
        </DropdownMenu>
        <UserSettings />
      </Dialog>
    </header>
  );
}
