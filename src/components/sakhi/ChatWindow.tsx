import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, type UIMessage } from "ai";
import { Send, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ParsedMessage } from "./MessageParser";
import { SAKHI_OPENING } from "@/lib/sakhi-prompt";

const SUGGESTIONS = [
  "Kurti with mirror ka kaam under ₹400 for Teej",
  "Laal saree under ₹500",
  "Bhai ki shaadi ke liye suit",
  "Compare neem soap aur kumkumadi soap",
];

const OPENING_MESSAGE: UIMessage = {
  id: "opening",
  role: "assistant",
  parts: [{ type: "text", text: SAKHI_OPENING }],
};

function messageText(m: UIMessage): string {
  return m.parts
    .map((p) => (p.type === "text" ? p.text : ""))
    .join("");
}

export function ChatWindow() {
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const transport = useRef(new DefaultChatTransport({ api: "/api/chat" })).current;

  const { messages, sendMessage, status, error } = useChat({
    id: "sakhi-main",
    messages: [OPENING_MESSAGE],
    transport,
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  const submit = (text: string) => {
    const t = text.trim();
    if (!t || isLoading) return;
    setInput("");
    void sendMessage({ text: t });
  };

  return (
    <div className="mx-auto flex h-[100dvh] w-full max-w-md flex-col bg-background">
      {/* Header */}
      <header className="flex items-center gap-3 border-b border-border bg-card px-4 py-3 shadow-sm">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold text-primary-foreground"
          style={{ background: "var(--gradient-primary)" }}
        >
          🌸
        </div>
        <div className="flex-1">
          <h1 className="flex items-center gap-1 text-base font-bold text-foreground">
            SakhiAI <Sparkles className="h-4 w-4 text-primary" />
          </h1>
          <p className="text-xs text-muted-foreground">Meesho ka shopping buddy</p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
          <span className="h-1.5 w-1.5 rounded-full bg-success" /> Online
        </span>
      </header>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-3">
          {messages.map((m) => {
            const text = messageText(m);
            const isUser = m.role === "user";
            return (
              <div
                key={m.id}
                className={`flex ${isUser ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={
                    isUser
                      ? "max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-3 py-2 text-sm text-primary-foreground shadow-[var(--shadow-soft)]"
                      : "max-w-[90%] rounded-2xl rounded-bl-sm bg-card px-3 py-2.5 text-foreground shadow-[var(--shadow-soft)] ring-1 ring-border"
                  }
                >
                  {isUser ? (
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{text}</p>
                  ) : (
                    <ParsedMessage content={text} />
                  )}
                </div>
              </div>
            );
          })}
          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-bl-sm bg-card px-4 py-3 shadow-[var(--shadow-soft)] ring-1 ring-border">
                <div className="flex gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-primary" />
                </div>
              </div>
            </div>
          )}
          {error && (
            <p className="text-center text-xs text-destructive">
              {error.message || "Connection error"}
            </p>
          )}
        </div>

        {messages.length <= 1 && (
          <div className="mt-4 space-y-2">
            <p className="px-1 text-xs font-medium text-muted-foreground">Try asking:</p>
            <div className="grid gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => submit(s)}
                  className="rounded-xl border border-border bg-card px-3 py-2 text-left text-xs text-foreground transition-colors hover:border-primary hover:bg-accent"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Composer */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(input);
        }}
        className="border-t border-border bg-card px-3 py-3"
      >
        <div className="flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Kya dhundh rahe hain aap?"
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="flex h-8 w-8 items-center justify-center rounded-full text-primary-foreground transition-opacity disabled:opacity-40"
            style={{ background: "var(--gradient-primary)" }}
            aria-label="Send"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
