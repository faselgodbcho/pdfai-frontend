"use client";

import { EllipsisVertical, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SidebarMenuButton } from "@/components/ui/sidebar";
import Link from "next/link";

export default function HoverDropdown({
  item,
}: {
  item: { title: string; url: string };
}) {
  return (
    <SidebarMenuButton asChild>
      <div className="flex items-center group justify-between w-full px-3 py-4 rounded hover:bg-muted transition-colors">
        <Link href={`/c/${item.url}`} className="flex-1">
          <span>{item.title}</span>
        </Link>

        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <button
              className="border-none outline-none cursor-pointer"
              onClick={(e) => e.stopPropagation()}
            >
              <EllipsisVertical size={16} />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent side="bottom" align="start">
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
              <Trash2 size={16} />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </SidebarMenuButton>
  );
}
