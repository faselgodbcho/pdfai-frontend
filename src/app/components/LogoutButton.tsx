"use client";

import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { useFetchWithAuth } from "@/app/hooks/useFetchWithAuth";

export default function LogoutButton() {
  const fetchWithAuth = useFetchWithAuth();
  const { setAccessToken } = useAuth();
  const router = useRouter();

  const logoutUser = async () => {
    try {
      const res = await fetchWithAuth("/api/auth/logout/", { method: "POST" });

      const data: { message: string } = await res.json();

      setAccessToken(null);
      return { data, error: null };
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setAccessToken(null);
      return { data: null, error: message };
    }
  };

  const handleLogout = async (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();

    try {
      const { data, error } = await logoutUser();

      if (error || !data)
        throw new Error(error || "Something went wrong while logging out.");

      router.push("/login");
    } catch (err) {
      console.error("Logout error:", err);
      toast.error("Logout Error", {
        description: "An Error occurred while logging out.",
      });
    }
  };

  return (
    <DropdownMenuItem
      className="focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 dark:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative flex cursor-pointer items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[inset]:pl-8 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
      onClick={handleLogout}
    >
      <LogOut size={18} className="text-black/80" />

      <span>Logout</span>
    </DropdownMenuItem>
  );
}
