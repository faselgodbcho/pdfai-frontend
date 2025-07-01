"use client";

import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import { useFetchWithAuth } from "@/app/hooks/useFetchWithAuth";

export default function LogoutButton() {
  const fetchWithAuth = useFetchWithAuth();
  const { accessToken, setAccessToken } = useAuth();
  const router = useRouter();

  const logoutUser = async () => {
    const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
    try {
      const data: { message: string } = await fetchWithAuth(
        `${API_BASE_URL}/auth/logout/`,
        {
          method: "POST",
        }
      );

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
    } catch (err: any) {
      console.error("Logout error:", err);
      toast.error("Logout Error", {
        description: "An Error occurred while logging out.",
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
