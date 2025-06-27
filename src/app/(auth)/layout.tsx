export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <main className="min-h-screen bg-[#ffffff] flex justify-center relative">
        <div>{children}</div>
      </main>
    </div>
  );
}
