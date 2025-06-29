import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Settings, Settings2, LogOut } from "lucide-react";

const items = [
  {
    title: "Logout",
    icon: <LogOut />,
  },
  {
    title: "Settings",
    icon: <Settings />,
  },
];

export default function AppHeader() {
  return (
    <header className="w-full flex items-center sticky top-0 z-10 justify-between px-6 py-4 bg-white shadow">
      <SidebarTrigger className="hover:bg-white cursor-pointer" />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger>
          <Settings2 className="stroke-black/80 cursor-pointer" />{" "}
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" align="end">
          {items.map((item) => (
            <DropdownMenuItem className="cursor-pointer gap-2" key={item.title}>
              {item.icon}

              <span>{item.title}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
