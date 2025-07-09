import { AuthForm } from "@/app/components/AuthForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF AI - Login",
  description: "Login to your PDF AI account",
};

export default function Login() {
  return (
    <div className="border rounded-[16px] shadow-xl pt-8 pb-11 px-9">
      <AuthForm mode="login" />
    </div>
  );
}
