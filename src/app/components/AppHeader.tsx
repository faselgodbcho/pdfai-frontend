import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Settings2 } from "lucide-react";
import LogoutButton from "./LogoutButton";

export default function AppHeader() {
  return (
    <header className="w-full flex items-center sticky top-0 z-10 justify-between px-6 py-4 bg-white shadow">
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
