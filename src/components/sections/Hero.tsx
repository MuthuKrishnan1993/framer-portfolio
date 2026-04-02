"use client";

import PaintReveal from "@/components/ui/PaintReveal";
import type { SiteConfig } from "@/lib/content";

export default function Hero({ siteConfig }: { siteConfig: SiteConfig }) {
  return (
    <section className="relative h-screen w-full bg-black-100 overflow-visible">
      {/* Paint Reveal Background */}
      <div className="absolute inset-0">
        <PaintReveal
          baseImage="/images/hero-helmet.png"
          revealImage="/images/hero-casual.png"
          brushTexture="/images/brush-texture.svg"
          brushSize={150}
          fadeDuration={0.5}
          maxStamps={50}
          showIndicator={true}
          indicatorText="Paint Mode &bull; Double tap to exit"
          indicatorColor="rgba(0, 0, 0, 0.7)"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black-100/40 pointer-events-none" />
      </div>

      <div className="relative z-[3] flex h-full flex-col justify-between px-0 py-[30px] pb-[10px] pointer-events-none">
        {/* First Name - MUTHU */}
        <div className="sticky top-[40px] z-[3] overflow-hidden pl-[30px] md:pl-10">
          <h1 className="text-h1 text-white-100">{siteConfig.firstName}</h1>
        </div>

        {/* Middle Section */}
        <div className="z-[3] flex items-center justify-between px-10">
          {/* Left - Year + Portfolio Label */}
          <div className="flex flex-col items-start gap-10">
            <span className="text-mono-24 text-white-100">
              {siteConfig.year}
            </span>
            <div className="flex flex-col items-center gap-4">
              <div className="h-[100px] w-px bg-white-100" />
              <div className="relative h-[137px] w-6">
                <span className="text-mono-18 text-white-100 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-90 whitespace-nowrap">
                  ./ portfolio
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="sticky top-[40px] z-[3] flex w-full flex-col items-end gap-4 px-6 md:flex-row md:items-start md:justify-end md:px-10">
          {/* Tagline */}
          <div className="flex max-w-[410px] flex-col gap-2.5 pt-[30px] md:mr-auto lg:mr-0">
            <p className="text-mono-24 text-white-100">{siteConfig.tagline}</p>
            <div className="flex items-center justify-center">
              <svg
                width="32"
                height="35"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Last Name - KRISHNAN */}
          <div className="overflow-hidden">
            <h1 className="text-h1 text-white-100 text-right">
              {siteConfig.lastName}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
}
