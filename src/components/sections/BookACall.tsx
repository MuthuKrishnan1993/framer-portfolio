"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { SiteConfig } from "@/lib/content";

const rollingTexts = ["Have a project?", "Let's chat!", "Schedule a Call."];

export default function BookACall({ siteConfig }: { siteConfig: SiteConfig }) {
  const [currentText, setCurrentText] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % rollingTexts.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[40vh] w-full overflow-hidden bg-black-100">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-70"
        style={{
          backgroundImage: "url(/images/book-a-call-bg.jpg)",
        }}
      />
      <div className="absolute inset-0 bg-black-100/50" />

      {/* Content */}
      <div className="relative z-[1] flex flex-col md:flex-row items-center justify-between h-full max-w-[1200px] mx-auto px-6 md:px-10 py-12">
        {/* Left - Availability */}
        <div className="flex flex-col gap-2">
          <span className="text-h6 text-white-100">
            I&apos;m available for new projects from
          </span>
          <span className="text-h5 text-white-100">
            {siteConfig.availableDate}
          </span>
        </div>

        {/* Right - Rolling Text + CTA */}
        <div className="flex flex-col items-center md:items-end gap-6">
          {/* Rolling Text */}
          <div className="h-[60px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.span
                key={currentText}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="text-h3 text-white-100 block"
              >
                {rollingTexts[currentText]}
              </motion.span>
            </AnimatePresence>
          </div>

          {/* CTA Button */}
          <a
            href={siteConfig.calLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white-100 text-mono-16 text-white-100 hover:bg-white-100 hover:text-black-100 transition-all duration-300"
          >
            BOOK A FREE CALL
          </a>
        </div>
      </div>
    </section>
  );
}
