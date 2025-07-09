export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <main className="min-h-screen bg-[#ffffff] flex justify-center items-center relative max-sm:px-8">
        <div>{children}</div>
      </main>
    </div>
  );
}
