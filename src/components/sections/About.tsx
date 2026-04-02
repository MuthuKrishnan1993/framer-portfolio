"use client";

import {
  motion,
  useInView,
  useScroll,
  useTransform,
  MotionValue,
} from "framer-motion";
import { useRef } from "react";
import type { Bio, SocialLink, SiteConfig } from "@/lib/content";
import LiveClock from "@/components/ui/LiveClock";
import SocialIcon from "@/components/ui/SocialIcon";

interface AboutProps {
  bio: Bio;
  socialLinks: SocialLink[];
  siteConfig: SiteConfig;
}

// Split into 6 segments for progressive scroll reveal
const wordSegments = [
  "As a Senior Frontend Developer",
  "with 6+ years of experience building web",
  "and mobile applications, I have had the opportunity",
  "to work with leading tech companies and innovative startups,",
  "crafting pixel-perfect, performant interfaces",
  "that power modern digital products.",
];

// Build flat word list with segment indices
const allWords: { word: string; segmentIndex: number }[] = [];
wordSegments.forEach((segment, segIdx) => {
  segment.split(" ").forEach((word) => {
    allWords.push({ word, segmentIndex: segIdx });
  });
});

function WordSpan({
  word,
  segmentIndex,
  totalSegments,
  progress,
}: {
  word: string;
  segmentIndex: number;
  totalSegments: number;
  progress: MotionValue<number>;
}) {
  // Each segment lights up at its scroll threshold
  const start = segmentIndex / totalSegments;
  const end = (segmentIndex + 0.7) / totalSegments;
  const opacity = useTransform(progress, [start, end], [0.15, 1]);

  return (
    <motion.span style={{ opacity }} className="transition-opacity duration-300">
      {word}{" "}
    </motion.span>
  );
}

function ScrollRevealIntro() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end 0.5"],
  });

  return (
    <div ref={wrapperRef}>
      {/* Sticky text container — matches Framer: sticky top-200px (desktop), top-100px (mobile) */}
      <div className="sticky top-[100px] lg:top-[200px] z-[1]">
        <h2 className="text-h3 text-white-100">
          {allWords.map((item, i) => (
            <WordSpan
              key={i}
              word={item.word}
              segmentIndex={item.segmentIndex}
              totalSegments={wordSegments.length}
              progress={scrollYProgress}
            />
          ))}
        </h2>
      </div>

      {/* Invisible scroll spacers — match Framer's 2Section–6Section
          Responsive gaps: smaller on mobile to reduce scroll distance */}
      <div className="flex flex-col gap-16 lg:gap-[140px] pointer-events-none" aria-hidden="true">
        <div className="h-[20px] lg:h-[30px]" />
        <div className="h-[20px] lg:h-[30px]" />
        <div className="h-[20px] lg:h-[30px]" />
        <div className="h-[20px] lg:h-[30px]" />
        <div className="h-[40px] lg:h-[100px]" />
      </div>
    </div>
  );
}

export default function About({ bio, socialLinks, siteConfig }: AboutProps) {
  const profileRef = useRef(null);
  const isInView = useInView(profileRef, { once: true, margin: "-100px" });

  return (
    <section id="about" className="bg-black-100 text-white-100">
      {/* Matches Framer About: maxWidth 1200px, padding 60px 40px 200px 40px, gap 140px */}
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 pt-[60px] pb-[100px] lg:pb-[200px] flex flex-col gap-16 lg:gap-[140px]">
        {/* Scroll-triggered text reveal */}
        <ScrollRevealIntro />

        {/* Profile Section — matches Framer: horizontal, gap 60px, pt 100px, z-index 3 */}
        <motion.div
          ref={profileRef}
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-[3] flex flex-col lg:flex-row gap-[60px] pt-[100px]"
        >
          {/* PhotoContainer — borderRadius 4px, overflow hidden */}
          <div className="shrink-0 rounded overflow-hidden">
            {/* Photo — 400px wide, borderRadius 8px */}
            <div className="relative w-full lg:w-[400px] rounded-lg overflow-visible">
              <div
                className="w-full aspect-[3/4] bg-cover bg-center rounded-lg"
                style={{ backgroundImage: "url(/images/profile.jpg)" }}
              />
              {/* Stickers — absolute, bottom 171.5px, centerX 53% */}
              <div className="absolute bottom-[171px] left-[53%] -translate-x-1/2 z-[1] flex flex-col items-start gap-1">
                {/* Signature — 172x72 */}
                <div className="w-[172px] h-auto flex items-center justify-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/signature.svg"
                    alt="Muthu Krishnan signature"
                    className="w-[171px] h-[72px] opacity-80"
                  />
                </div>
                {/* Award — Mono 14, 175px wide */}
                <p className="text-mono-14 text-white-100 w-[175px]">
                  {bio.award}
                </p>
              </div>
            </div>
          </div>

          {/* Profile inner — gap 32px, padding-top 20px */}
          <div className="flex flex-col gap-8 pt-5">
            {/* Bio — two paragraphs, gap 32px, Heading 9 */}
            <div className="flex flex-col gap-8">
              <p className="text-h9 text-white-100">{bio.intro}</p>
              <p className="text-h9 text-white-100">{bio.current}</p>
            </div>

            {/* Location — border-bottom 1px solid black-80, gap 8px, pb 32px */}
            <div className="flex flex-col gap-2 border-b border-black-80 pb-8">
              {/* Currently Based — gap 12px */}
              <div className="flex items-center gap-3">
                <span className="text-h9 text-white-100">
                  {siteConfig.location}
                </span>
                {/* Flag — 30x20px, borderRadius 4px */}
                <div className="w-[30px] h-[20px] rounded overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/flag-uk.png"
                    alt="India flag"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* TimeZone — gap 2px, align end */}
              <div className="flex items-end gap-0.5 text-white-100">
                <div className="pb-[3px]">
                  <LiveClock />
                </div>
                <span className="text-mono-24 text-white-100">(IST)</span>
              </div>
            </div>

            {/* Social — gap 32px */}
            <div className="flex flex-col gap-8">
              {/* Links — gap 24px */}
              <div className="flex items-center gap-6">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-6 h-6 text-white-100 hover:text-black-30 transition-colors"
                  >
                    <SocialIcon name={social.icon} />
                  </a>
                ))}
              </div>

              {/* Resume Download — Btn-Navigation component style */}
              <a
                href={siteConfig.resumeLink}
                className="text-mono-16 text-black-30 hover:text-white-100 transition-colors relative inline-block w-fit group"
              >
                RESUM&Eacute;
                <span className="absolute -bottom-1 left-0 w-full h-px bg-black-30 group-hover:bg-white-100 transition-colors" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
