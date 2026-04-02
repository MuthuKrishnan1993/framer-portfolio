"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface ServiceCardProps {
  number: string;
  title: string;
  description: string;
  features: string[];
  isLast: boolean;
}

export default function ServiceCard({
  number,
  title,
  description,
  features,
  isLast,
}: ServiceCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className={`bg-white-98 border-t border-black-10 ${isLast ? "pb-[100px]" : ""}`}
    >
      <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row justify-between gap-8 lg:gap-[320px] px-6 md:px-10 py-10 pb-[60px]">
        {/* Left - Info */}
        <div className="flex flex-col gap-4 lg:max-w-[500px]">
          <span className="text-mono-16 text-black-40">{number} ——</span>
          <h4 className="text-h6 text-black-90">{title}</h4>
          <p className="text-body-16 text-black-60">{description}</p>
        </div>

        {/* Right - Features */}
        <div className="flex flex-col shrink-0 lg:w-[300px]">
          {features.map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-3 py-4 border-b border-black-10"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="shrink-0"
              >
                <circle cx="8" cy="8" r="3" fill="rgb(26,26,26)" />
              </svg>
              <span className="text-body-16 text-black-90">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
