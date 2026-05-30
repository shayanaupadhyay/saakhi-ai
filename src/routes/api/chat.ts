import { createFileRoute } from "@tanstack/react-router";
import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";
import { SAKHI_SYSTEM_PROMPT } from "@/lib/sakhi-prompt";

type ChatRequestBody = { messages?: unknown };

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { messages } = (await request.json()) as ChatRequestBody;
        if (!Array.isArray(messages)) {
          return new Response("Messages are required", { status: 400 });
        }
        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const gateway = createLovableAiGatewayProvider(key);
        const result = streamText({
          model: gateway("google/gemini-3-flash-preview"),
          system: SAKHI_SYSTEM_PROMPT,
          messages: await convertToModelMessages(messages as UIMessage[]),
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages as UIMessage[],
          onError: (err) => {
            console.error("chat stream error", err);
            const msg = err instanceof Error ? err.message : String(err);
            if (msg.includes("429")) return "Bahut requests aa gayi — thodi der baad try karein.";
            if (msg.includes("402")) return "AI credits khatam ho gaye — workspace mein add karein.";
            return "Kuch gadbad ho gayi. Phir se try karein.";
          },
        });
      },
    },
  },
});
