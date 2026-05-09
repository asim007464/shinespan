"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import type { ChatInquiryPayload } from "@/services/types";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import { FiMessageCircle, FiSend, FiX } from "react-icons/fi";

const QUICK = [
  "Regular house clean",
  "End of tenancy",
  "Airbnb turnover",
  "Office cleaning",
];

export function ChatbotWidget() {
  const inquirySeq = useRef(0);
  const uid = useId();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; text: string }[]>([
    { role: "assistant", text: "Hi — I can capture your cleaning needs for our team." },
  ]);
  const { value: inquiries, setValue: setInquiries, hydrated } = useLocalStorage<
    ChatInquiryPayload[]
  >("ss-chat-inquiries", []);

  const [meta, setMeta] = useState({
    cleaningType: "",
    budget: "",
    date: "",
    location: "",
  });

  useEffect(() => {
    if (!open) return;
    const el = document.getElementById(`${uid}-log`);
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open, uid]);

  async function persistSession(nextMessages: typeof messages, sessionId: string) {
    const payload: ChatInquiryPayload = {
      id: sessionId,
      cleaningType: meta.cleaningType || undefined,
      budget: meta.budget || undefined,
      date: meta.date || undefined,
      location: meta.location || undefined,
      messages: nextMessages.map((m) => ({
        ...m,
        at: new Date().toISOString(),
      })),
      createdAt: new Date().toISOString(),
    };
    setInquiries((prev) => [...(prev ?? []), payload]);
    try {
      await axios.post("/api/inquiries", payload, { validateStatus: () => true });
    } catch {
      /* offline — localStorage still holds copy */
    }
  }

  function send(text?: string) {
    const t = (text ?? input).trim();
    if (!t) return;
    const userMsg = { role: "user" as const, text: t };
    const lower = t.toLowerCase();
    let reply =
      "Thanks — noted. Would you like to book online or receive a call back?";
    if (lower.includes("budget")) {
      setMeta((m) => ({ ...m, budget: t }));
      reply = "Budget captured. Preferred date or postcode next?";
    } else if (lower.includes("202") || lower.includes("mon") || lower.includes("tue")) {
      setMeta((m) => ({ ...m, date: t }));
      reply = "Date noted. Where should we send the crew?";
    } else if (
      lower.match(/\b([a-z]{1,2}\d[\da-z]?\s*\d[a-z]{2})\b/i) ||
      lower.includes("london") ||
      lower.includes("manchester")
    ) {
      setMeta((m) => ({ ...m, location: t }));
      reply = "Location saved — tap Book Now anytime to finalise.";
    } else if (
      lower.includes("clean") ||
      lower.includes("tenancy") ||
      lower.includes("airbnb") ||
      lower.includes("office")
    ) {
      setMeta((m) => ({ ...m, cleaningType: t }));
      reply = "Cleaning type noted. Share budget range or ideal date?";
    }

    const next = [...messages, userMsg, { role: "assistant" as const, text: reply }];
    setMessages(next);
    setInput("");
    inquirySeq.current += 1;
    const sessionId = `chat_${inquirySeq.current}`;
    void persistSession(next, sessionId);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open chat"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-ss-blue-700 to-ss-blue-500 text-white shadow-2xl shadow-ss-blue-700/40 transition hover:brightness-110 sm:bottom-6 sm:right-6"
      >
        <FiMessageCircle className="h-7 w-7" />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-24 right-5 z-50 flex h-[min(560px,78vh)] w-[min(380px,92vw)] flex-col overflow-hidden rounded-3xl border border-white/12 bg-ss-blue-950/98 shadow-2xl shadow-black/40 backdrop-blur-xl sm:bottom-28 sm:right-8"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-white">Shine Assistant</p>
                <p className="text-[11px] text-slate-400">
                  {hydrated && (inquiries?.length ?? 0) > 0
                    ? `${inquiries?.length ?? 0} saved inquiries`
                    : "We reply during business hours"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                className="rounded-xl p-2 text-slate-300 hover:bg-white/10 hover:text-white"
              >
                <FiX className="h-5 w-5" />
              </button>
            </div>

            <div id={`${uid}-log`} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div
                  key={`${i}-${m.text.slice(0, 12)}`}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-gradient-to-r from-ss-blue-700 to-ss-blue-500 text-white"
                        : "border border-white/10 bg-ss-blue-900/80 text-slate-100"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              <div className="flex flex-wrap gap-2 pt-2">
                {QUICK.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => send(q)}
                    className="rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-slate-200 hover:border-white/35 hover:bg-white/15"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <form
              className="border-t border-white/10 p-3"
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
            >
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about cleaning type, budget, date, location…"
                  className="flex-1 rounded-2xl border border-white/15 bg-ss-blue-950/90 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-ss-blue-500/50"
                />
                <button
                  type="submit"
                  className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-ss-blue-700 to-ss-blue-500 text-white shadow-lg"
                  aria-label="Send"
                >
                  <FiSend className="h-5 w-5" />
                </button>
              </div>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
