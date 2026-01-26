import React, { useState, useRef, useEffect } from "react";
import { X, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";

type Message = {
  from: "bot" | "user";
  text: string;
};

export const AyuuChatbot: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

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

  const handleClose = () => {
    if (messages.length > 1) {
      setShowWarning(true);
    } else {
      setOpen(false);
      setShowWarning(false);
    }
  };

  const confirmClose = () => {
    setOpen(false);
    setShowWarning(false);
    // Optional: Clear messages on close if desired, but user might want persistence.
    // Based on "conversation will reset" warning, we should probably clear or just imply session reset.
    // For now, we just close. The warning implies the *session* context might be lost or user just wants to know.
    // Actually, prompt says "warning user the conversation will reset".
    // So we should probably clear messages to reflect that "reset".
    setMessages([]); 
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
        className="fixed bottom-6 right-6 bg-black text-white px-4 py-3 rounded-full shadow-lg z-50 hover:scale-105 transition-transform"
      >
        Ask Ayuu ✨
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="
              fixed bottom-20 right-4 md:right-6
              w-[92vw] md:w-[420px] max-w-[420px]
              h-[80vh] md:h-[540px]
              bg-white dark:bg-gray-900
              rounded-2xl shadow-2xl
              border dark:border-gray-700
              p-4 z-[60]
              flex flex-col
              overflow-hidden
            "
          >
            {/* Warning Overlay */}
            {showWarning && (
              <div className="absolute inset-0 z-50 bg-white/95 dark:bg-gray-900/95 flex flex-col items-center justify-center text-center p-6 rounded-2xl backdrop-blur-sm">
                <AlertTriangle className="w-12 h-12 text-yellow-500 mb-4" />
                <h4 className="text-lg font-bold text-black dark:text-white mb-2">End Conversation?</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
                  Your chat history will be cleared if you close this window.
                </p>
                <div className="flex gap-3 w-full">
                  <button 
                    onClick={() => setShowWarning(false)}
                    className="flex-1 py-2 px-4 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={confirmClose}
                    className="flex-1 py-2 px-4 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition"
                  >
                    End Chat
                  </button>
                </div>
              </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-center border-b dark:border-gray-700 pb-3 mb-2 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <h3 className="text-lg font-bold text-black dark:text-white">
                  Ayuu Assistant
                </h3>
              </div>
              <button 
                onClick={handleClose}
                className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`px-4 py-3 rounded-2xl text-sm w-fit max-w-[85%] shadow-sm ${
                    msg.from === "bot"
                      ? "bg-gray-50 dark:bg-gray-800 text-black dark:text-gray-100 border border-gray-100 dark:border-gray-700 rounded-tl-none"
                      : "bg-black text-white ml-auto rounded-tr-none"
                  }`}
                >
                  {msg.from === "bot" ? (
                    <ReactMarkdown
                      components={{
                        p: ({ node, ...props }) => <p className="mb-2 last:mb-0 leading-relaxed" {...props} />,
                        ul: ({ node, ...props }) => <ul className="list-disc pl-4 mb-2 space-y-1" {...props} />,
                        ol: ({ node, ...props }) => <ol className="list-decimal pl-4 mb-2 space-y-1" {...props} />,
                        li: ({ node, ...props }) => <li className="" {...props} />,
                        strong: ({ node, ...props }) => <strong className="font-bold text-secondary-600 dark:text-secondary-400" {...props} />,
                        h1: ({ node, ...props }) => <h1 className="text-lg font-bold mb-2" {...props} />,
                        h2: ({ node, ...props }) => <h2 className="text-base font-bold mb-2" {...props} />,
                        h3: ({ node, ...props }) => <h3 className="text-sm font-bold mb-1" {...props} />,
                        a: ({ node, ...props }) => <a className="text-blue-600 dark:text-blue-400 hover:underline break-all" target="_blank" rel="noopener noreferrer" {...props} />,
                        code: ({ node, ...props }) => <code className="bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded text-xs font-mono" {...props} />,
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  ) : (
                    <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex items-center gap-2 text-xs text-gray-400 ml-2 animate-pulse">
                   <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
                   <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }}></div>
                   <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }}></div>
                   <span>Ayuu is thinking...</span>
                </div>
              )}

              {/* Auto-scroll anchor */}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="flex gap-2 mt-3 shrink-0">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Ask anything..."
                className="
                  flex-1 border px-4 py-3 text-sm rounded-xl outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all
                  bg-white dark:bg-gray-800 dark:border-gray-700
                  text-black dark:text-white placeholder:text-gray-400
                "
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || loading}
                className="bg-black dark:bg-white text-white dark:text-black font-medium text-sm px-5 py-2 rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
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
