import UploadButton from "@/app/components/UploadButton";

export default function Home() {
  return (
    <main
      className="flex pt-38 justify-center px-4 bg-background"
      style={{ minHeight: "calc(100vh - 60px)" }}
    >
      <div className="text-center space-y-5 max-w-xl">
        {/* <h1 className="text-3xl font-bold tracking-tight md:text-4xl text-[#1e293b]">
          Chat with your PDFs
        </h1> */}

        <p className="text-muted-foreground text-lg">
          Upload a pdf document and get instant answers — like ChatGPT, but
          trained on your files.
        </p>

        <UploadButton />
      </div>
    </main>
  );
}
