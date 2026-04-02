"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { Stat } from "@/lib/content";
import AnimatedNumber from "@/components/ui/AnimatedNumber";

const statIcons: Record<string, React.ReactNode> = {
  awards: (
    <svg width="56" height="40" viewBox="0 0 56 40" fill="none">
      <path d="M28 4l4 8 9 1.3-6.5 6.3 1.5 9L28 24l-8 4.6 1.5-9L15 13.3l9-1.3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  ),
  projects: (
    <svg width="56" height="40" viewBox="0 0 56 40" fill="none">
      <rect x="14" y="8" width="28" height="24" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M14 16h28" stroke="currentColor" strokeWidth="2" />
      <circle cx="20" cy="12" r="1.5" fill="currentColor" />
      <circle cx="25" cy="12" r="1.5" fill="currentColor" />
    </svg>
  ),
  satisfaction: (
    <svg width="56" height="40" viewBox="0 0 56 40" fill="none">
      <circle cx="28" cy="20" r="12" stroke="currentColor" strokeWidth="2" />
      <path d="M22 24c1.5 3 3.5 4 6 4s4.5-1 6-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="17" r="1.5" fill="currentColor" />
      <circle cx="32" cy="17" r="1.5" fill="currentColor" />
    </svg>
  ),
  clients: (
    <svg width="56" height="40" viewBox="0 0 56 40" fill="none">
      <circle cx="28" cy="14" r="6" stroke="currentColor" strokeWidth="2" />
      <path d="M16 34c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
};

export default function Stats({ stats }: { stats: Stat[] }) {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section className="bg-white-100 overflow-hidden pt-[200px] pb-[100px]">
      {/* Header */}
      <motion.h3
        ref={headerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-h8 w-full pb-[120px]"
      >
        Metric marvels
      </motion.h3>

      {/* Stats Rows */}
      <div className="max-w-[1200px] mx-auto flex flex-col gap-[120px] px-6 md:px-[80px]">
        {stats.map((stat, index) => (
          <StatRow key={stat.label} stat={stat} index={index} />
        ))}
      </div>
    </section>
  );
}

function StatRow({
  stat,
  index,
}: {
  stat: Stat;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-[200px]"
    >
      {/* Left - Icon + Label + Number */}
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-6 max-w-[290px] pb-3">
          <span className="text-black-90">{statIcons[stat.icon]}</span>
          <span className="text-mono-20 text-black-90">{stat.label}</span>
        </div>
        <AnimatedNumber
          start={stat.start}
          end={stat.end}
          duration={2}
          suffix={stat.suffix}
          className="text-h2 text-black-90"
        />
      </div>

      {/* Right - Breakdown */}
      {stat.breakdown.length > 0 && (
        <div className="flex gap-4">
          <div className="flex flex-col gap-1.5">
            {stat.breakdown.map((item) => (
              <span key={item.label} className="text-h6 text-black-90">
                {item.count}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-1.5">
            {stat.breakdown.map((item) => (
              <span key={item.label} className="text-h6 text-black-90">
                {item.label}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
