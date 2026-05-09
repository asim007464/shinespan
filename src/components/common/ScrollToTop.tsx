"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiChevronUp } from "react-icons/fi";

export function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > 480);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function goTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <AnimatePresence>
      {show ? (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.25 }}
          onClick={goTop}
          aria-label="Back to top"
          className="fixed bottom-24 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-ss-blue-950/95 text-white shadow-xl shadow-black/30 backdrop-blur sm:bottom-8 sm:right-8"
        >
          <FiChevronUp className="h-6 w-6" />
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
}
