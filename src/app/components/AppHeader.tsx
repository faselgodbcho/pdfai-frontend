import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Settings2 } from "lucide-react";

export default function AppHeader() {
  return (
    <div className="max-w-full relative">
      <header className="w-full flex items-center justify-between px-6 py-4 bg-white shadow">
        <SidebarTrigger className="hover:bg-white cursor-pointer" />

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Settings2 className="stroke-black/80 cursor-pointer" />{" "}
          </DropdownMenuTrigger>
          <DropdownMenuContent side="bottom" align="end">
            <DropdownMenuItem className="cursor-pointer">
              Github
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    </div>
  );
}
