import { AuthForm } from "@/app/components/AuthForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PDF AI - Register",
  description: "Register for PDF AI to start using our services",
};

export default function Register() {
  return (
    <div className="border rounded-[16px] shadow-xl pt-8 pb-11 px-9 mt-6">
      <AuthForm mode="register" />
    </div>
  );
}
