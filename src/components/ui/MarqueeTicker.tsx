"use client";

import { ReactNode } from "react";

interface MarqueeTickerProps {
  children: ReactNode;
  speed?: number;
  gap?: number;
  className?: string;
}

export default function MarqueeTicker({
  children,
  speed = 30,
  gap = 48,
  className = "",
}: MarqueeTickerProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="animate-marquee flex w-max"
        style={
          {
            "--marquee-duration": `${speed}s`,
            gap: `${gap}px`,
          } as React.CSSProperties
        }
      >
        {/* Duplicate children for seamless loop */}
        <div className="flex shrink-0" style={{ gap: `${gap}px` }}>
          {children}
        </div>
        <div className="flex shrink-0" style={{ gap: `${gap}px` }}>
          {children}
        </div>
      </div>
    </div>
  );
}
