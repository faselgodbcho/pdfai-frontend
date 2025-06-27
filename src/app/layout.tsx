import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";

import { inter } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "PDF AI - Your AI PDF Assistant",
  description:
    "Transform your PDF experience with AI-powered insights and tools.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
        <Toaster richColors />
      </body>
    </html>
  );
}
