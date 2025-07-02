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
import { useFetchWithAuth } from "../hooks/useFetchWithAuth";
import { toast } from "sonner";

export default function HoverDropdown({
  item,
  onDelete,
}: {
  item: { title: string; id: string };
  onDelete: (id: string) => void;
}) {
  const fetchWithAuth = useFetchWithAuth();

  const handleDelete = async (id: string) => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

    try {
      await fetchWithAuth(`${API_BASE_URL}/sessions/${id}`, {
        method: "DELETE",
      });

      toast.success("Deleted Successfully", {
        description: `Chat ${id} deleted successfully.`,
      });

      onDelete(id);
    } catch (err: any) {
      console.error("Deletion Error:", err);
      toast.error("Deletion Error", {
        description: `An Error occurred while deleting chat ${id}.`,
      });
    }
  };

  return (
    <SidebarMenuButton asChild>
      <div className="flex items-center group justify-between w-full px-3 py-4 rounded hover:bg-muted transition-colors">
        <Link href={`/c/${item.id}`} className="flex-1">
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
            <DropdownMenuItem
              className="flex items-center gap-2 cursor-pointer"
              onClick={(e) => handleDelete(item.id)}
            >
              <Trash2 size={16} />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </SidebarMenuButton>
  );
}
