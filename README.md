# PDF AI Frontend

A modern AI-powered frontend interface for chatting with PDF documents. Built with **Next.js App Router**, **ShadCN UI**, and **TailwindCSS**.

👉 [Live Demo](https://pdfai-frontend.vercel.app)

---

## Features

- Upload PDF files and chat with their content
- View and switch between multiple chat sessions
- Delete sessions with confirmation
- Seamless auth with protected routes
- Fully responsive UI with smooth UX
- Toast notifications and animated typing indicator

---

## Tech Stack

- [Next.js 14 (App Router)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [ShadCN UI](https://ui.shadcn.dev/)
- [Lucide Icons](https://lucide.dev/)
- [React Context](https://reactjs.org/docs/context.html)
- [React Query](https://tanstack.com/query) (for data fetching and caching)
- [Zod](https://zod.dev/) (for schema validation)

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/faselgodbcho/pdfai-frontend.git
cd pdfai-frontend
```
### 2. Install dependencies
```bash
npm install
# or
pnpm install
# or
yarn install
```
### 3. Start the dev server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

> ⚠️ Make sure to set the required environment variables in a .env.local file (see .env.example for reference).

## Environment Variables
Create a .env.local file and configure it like:
```bash
NEXT_PUBLIC_BACKEND_BASE_URL=https://your-backend-api.com
```

## Build for Production
```bash
npm run build
```
Then run:
```bash
npm start
```
## Resources
- [Next.js Docs](https://nextjs.org/)
- [ShadCN UI](https://ui.shadcn.com/)
- [TailwindCSS Docs](https://tailwindcss.com/docs/)
