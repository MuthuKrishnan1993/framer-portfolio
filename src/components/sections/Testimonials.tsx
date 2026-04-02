"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { Testimonial } from "@/lib/content";
import MarqueeTicker from "@/components/ui/MarqueeTicker";

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section className="w-full bg-white-100 overflow-hidden pb-[100px]">
      {/* Header */}
      <motion.div
        ref={headerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center gap-[30px] pb-[60px]"
      >
        <h3 className="text-h8 w-full">Applause Corner</h3>
      </motion.div>

      {/* Testimonial Ticker */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <MarqueeTicker speed={50} gap={48}>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </MarqueeTicker>
      </div>
    </section>
  );
}

function TestimonialCard({
  quote,
  name,
  title,
}: {
  quote: string;
  name: string;
  title: string;
}) {
  return (
    <div className="flex flex-col justify-between w-[400px] h-[500px] shrink-0 bg-white-98 rounded-lg p-[40px_30px]">
      {/* Quote Mark */}
      <div className="relative">
        <span className="absolute -top-2 -left-2 text-[200px] leading-none text-black-100/[0.03] font-serif select-none">
          &ldquo;
        </span>
        <p className="text-h9 text-black-90 relative z-[1] pl-5 pt-12">
          {quote}
        </p>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 pt-6">
        {/* Avatar */}
        <div className="w-[42px] h-[42px] rounded-full bg-black-20 border-2 border-black-10 shrink-0 flex items-center justify-center">
          <span className="text-mono-14 text-black-60">
            {name.charAt(0)}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-mono-18 text-black-90">{name}</span>
          <div className="w-full h-px bg-black-10 my-1" />
          <span className="text-mono-16 text-black-40">{title}</span>
        </div>
      </div>
    </div>
  );
}
