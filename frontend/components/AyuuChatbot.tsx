import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Message = {
  from: "bot" | "user";
  text: string;
};

export const AyuuChatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔴 REPLACE WITH YOUR N8N CHAT WEBHOOK
  const WEBHOOK_URL =
    "https://n8n.gkwebtech.cloud/webhook/ce2da385-28b9-47b5-8388-7200b0b0de2c/chat";

  // Persistent session ID (same browser = same conversation memory)
  const sessionId =
    typeof window !== "undefined"
      ? (localStorage.getItem("ayuuchat_session") ??
        (() => {
          const id = crypto.randomUUID();
          localStorage.setItem("ayuuchat_session", id);
          return id;
        })())
      : "static-session";

  // Auto-scroll reference
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll whenever messages or typing state changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userText = input;
    setInput("");

    setMessages((prev) => [...prev, { from: "user", text: userText }]);
    setLoading(true);

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chatInput: userText, // ✅ required by n8n Chat Trigger
          sessionId,           // ✅ required for memory
        }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text:
            data?.output ||
            data?.reply ||
            data?.assistant_reply ||
            "I’m not sure how to answer that yet.",
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          from: "bot",
          text: "Something went wrong. Please try again.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <>
      {/* Floating Open Button */}
      <button
        onClick={() => {
          setOpen(true);
          if (messages.length === 0) {
            setMessages([
              {
                from: "bot",
                text: "Hi 👋 I’m Ayuu. Ask me anything about GKWebtech.",
              },
            ]);
          }
        }}
        className="fixed bottom-6 right-6 bg-black text-white px-4 py-3 rounded-full shadow-lg z-50"
      >
        Ask Ayuu ✨
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="
              fixed bottom-20 right-6
              w-[420px] h-[540px]
              bg-white dark:bg-gray-900
              rounded-2xl shadow-xl
              border dark:border-gray-700
              p-4 z-50
              flex flex-col
            "
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b dark:border-gray-700 pb-2 mb-2">
              <h3 className="text-lg font-semibold text-black dark:text-white">
                Ayuu Assistant
              </h3>
              <button onClick={() => setOpen(false)}>
                <X className="text-black dark:text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`px-3 py-2 rounded-xl text-sm w-fit max-w-[90%] ${
                    msg.from === "bot"
                      ? "bg-gray-100 dark:bg-gray-800 text-black dark:text-white"
                      : "bg-black text-white ml-auto"
                  }`}
                >
                  {msg.text}
                </div>
              ))}

              {loading && (
                <div className="text-xs text-gray-500">
                  Ayuu is typing…
                </div>
              )}

              {/* Auto-scroll anchor */}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex gap-2 mt-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask anything…"
                className="
                  flex-1 border px-3 py-2 text-sm rounded-xl
                  dark:bg-gray-800 dark:border-gray-700
                  text-black dark:text-white
                "
              />
              <button
                onClick={sendMessage}
                className="bg-black text-white text-sm px-4 py-2 rounded-xl"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
