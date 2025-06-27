"use client";

import { EllipsisVertical, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SidebarMenuButton } from "@/components/ui/sidebar";

export default function HoverDropdown({
  item,
}: {
  item: { title: string; url: string };
}) {
  return (
    <SidebarMenuButton asChild>
      {/* unique group for each item */}
      <div className="flex items-center justify-between group w-full px-3 py-2 rounded hover:bg-muted transition-colors">
        <a href={item.url} className="flex-1">
          <span>{item.title}</span>
        </a>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => e.stopPropagation()} // optional: prevent entire button click
            >
              <EllipsisVertical size={16} />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent side="right">
            <DropdownMenuItem className="flex items-center gap-2">
              <Trash2 size={16} />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </SidebarMenuButton>
  );
}
