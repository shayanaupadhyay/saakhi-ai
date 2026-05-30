import { createFileRoute } from "@tanstack/react-router";
import { ChatWindow } from "@/components/sakhi/ChatWindow";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SakhiAI — Meesho Shopping Assistant" },
      {
        name: "description",
        content:
          "SakhiAI: Meesho's AI shopping buddy. Hinglish, Hindi ya English mein puchein — best products laati hoon!",
      },
      { property: "og:title", content: "SakhiAI — Meesho Shopping Assistant" },
      {
        property: "og:description",
        content: "Hinglish shopping assistant for Meesho. Occasion batao, budget batao.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-accent/40 to-background">
      <ChatWindow />
    </main>
  );
}
