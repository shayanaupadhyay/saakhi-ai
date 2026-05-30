import { createFileRoute, Link } from "@tanstack/react-router";
import { ChatWindow } from "@/components/sakhi/ChatWindow";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/sakhi")({
  head: () => ({
    meta: [
      { title: "SakhiAI — Meesho Shopping Assistant" },
      {
        name: "description",
        content: "Hinglish AI shopping assistant. Occasion batao, budget batao.",
      },
    ],
  }),
  component: SakhiPage,
});

function SakhiPage() {
  return (
    <main className="min-h-[100dvh] bg-gradient-to-b from-accent/40 to-background">
      <div className="relative mx-auto w-full max-w-md">
        <Link
          to="/"
          className="absolute left-2 top-2.5 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-card/90 text-foreground shadow-sm backdrop-blur hover:bg-card"
          aria-label="Back to Meesho"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <ChatWindow />
      </div>
    </main>
  );
}
