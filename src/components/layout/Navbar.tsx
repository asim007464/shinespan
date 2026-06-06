"use client";

import { COMPANY, IMAGES, NAV_LINKS } from "@/utils/constants";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 shadow-sm shadow-slate-200/30 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex items-center">
          <Image
            src={IMAGES.logo}
            alt={`${COMPANY.shortName}, cleaning services London`}
            width={560}
            height={172}
            className="h-28 w-auto sm:h-32"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-ss-blue-50 text-ss-blue-800"
                    : "text-slate-600 hover:bg-slate-50 hover:text-ss-blue-800"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button href="/booking" className="hidden !py-2.5 sm:inline-flex">
            Book Now
          </Button>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm lg:hidden"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-slate-200 bg-white lg:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-3 text-base font-medium text-slate-700 hover:bg-ss-blue-50"
                >
                  {link.label}
                </Link>
              ))}
              <Button href="/booking" className="w-full justify-center">
                Book Now
              </Button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
