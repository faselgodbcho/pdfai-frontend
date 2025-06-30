"use client";

import { logoutUser } from "@/lib/userActions";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      const { data, error } = await logoutUser();

      if (error || !data)
        throw new Error(error || "Something went wrong while logging out.");

      router.push("/login");
    } catch (err: any) {
      const message = err instanceof Error ? err.message : "Please try again.";

      console.error("Logout error:", err);
      toast.error("Logout Error", {
        description: message,
      });
    }
  };

  return (
    <DropdownMenuItem
      className="cursor-pointer gap-2 flex items-center p-1"
      onClick={handleLogout}
    >
      <LogOut size={18} className="text-black/80" />

      <span>Logout</span>
    </DropdownMenuItem>
  );
}
