"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import type { Service } from "@/lib/content";
import ServiceCard from "@/components/ui/ServiceCard";

export default function Services({ services }: { services: Service[] }) {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section className="bg-white-98 overflow-visible pt-[200px]">
      {/* Header */}
      <div className="lg:sticky lg:top-[100px] z-[1] bg-white-98">
        <motion.h3
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-h8 w-full"
        >
          creative expertise
        </motion.h3>
      </div>

      {/* Quote */}
      <div className="lg:sticky lg:top-[180px] z-[1] flex justify-center py-8 bg-white-98">
        <p className="text-h4 max-w-[850px] px-6 md:px-10">
          &ldquo;Design is not just what it looks like and feels like. Design is
          how it works.&rdquo;
        </p>
      </div>

      {/* Service Cards - Sticky Stacking */}
      <div className="relative">
        {services.map((service, index) => {
          const isLast = index === services.length - 1;
          return (
            <div
              key={service.number}
              className={isLast ? "relative z-[2]" : "lg:sticky lg:top-[420px] z-[2]"}
            >
              <ServiceCard
                {...service}
                isLast={isLast}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
