"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import type { FeaturedProject, SelectedProject, BrandLogo } from "@/lib/content";
import MarqueeTicker from "@/components/ui/MarqueeTicker";
import Link from "next/link";
import Image from "next/image";

interface ProjectsProps {
  featuredProject: FeaturedProject;
  selectedProjects: SelectedProject[];
  brandLogos: BrandLogo[];
}

function ProjectListItem({
  project,
  index,
}: {
  project: SelectedProject;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/works/${project.slug}`}
      className="block w-full border-t border-black-10 relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Mobile layout — always visible */}
      <div className="lg:hidden flex flex-col gap-4 px-6 py-8">
        <div className="flex items-baseline gap-4">
          <span className="text-mono-14 text-black-30">0{index + 1}</span>
          <h4 className="text-h7 text-black-90">{project.title}</h4>
        </div>
        <span className="text-mono-14 text-black-40 uppercase">
          {project.client}
        </span>
        <p className="text-body-16 text-black-60">{project.description}</p>
        <div className="w-full aspect-[16/9] rounded overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            width={390}
            height={220}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Desktop layout — title row with hover reveal */}
      <div className="hidden lg:flex relative items-center justify-between h-[300px] px-10">
        {/* Left: Number + Title */}
        <div className="flex items-baseline gap-6">
          <span className="text-mono-16 text-black-30">
            0{index + 1}
          </span>
          <h4 className="text-h4 text-black-90">{project.title}</h4>
        </div>

        {/* Right: Arrow */}
        <motion.div
          animate={{ x: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0.4 }}
          transition={{ duration: 0.3 }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-black-60"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.div>
      </div>

      {/* Hover Preview — slides in from right (desktop only) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="hidden lg:flex absolute inset-0 items-center bg-white-100 px-10"
          >
            {/* Left Panel: Client, Title, Description */}
            <div className="flex-1 flex flex-col justify-center gap-3 pr-8">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="text-mono-14 text-black-40 uppercase"
              >
                {project.client}
              </motion.span>
              <motion.h4
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="text-h5 text-black-90"
              >
                {project.title}
              </motion.h4>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                className="text-body-16 text-black-60 max-w-[400px]"
              >
                {project.description}
              </motion.p>
            </div>

            {/* Right Panel: Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="shrink-0 w-[350px] h-[200px] rounded overflow-hidden"
            >
              <Image
                src={project.image}
                alt={project.title}
                width={350}
                height={200}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Link>
  );
}

export default function Projects({ featuredProject, selectedProjects, brandLogos }: ProjectsProps) {
  const quoteRef = useRef(null);
  const quoteInView = useInView(quoteRef, { once: true, margin: "-100px" });

  return (
    <section className="bg-white-100 overflow-visible pt-[200px]">
      {/* Featured Project */}
      <div className="sticky top-[60px] z-[1] overflow-hidden bg-white-100">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <h3 className="text-mono-16 text-black-40 uppercase pb-10">
            Featured Project
          </h3>
        </div>

        {/* Featured Project Card — full image with text overlay */}
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
          <Link
            href={`/works/${featuredProject.slug}`}
            className="block relative w-full aspect-[3/2] rounded-lg overflow-hidden group"
          >
            <Image
              src={featuredProject.image}
              alt={featuredProject.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black-100/60 via-black-100/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <p className="text-mono-14 text-white-100/80 uppercase mb-2">
                {featuredProject.client}
              </p>
              <h4 className="text-h3 text-white-100">
                {featuredProject.title}
              </h4>
              <p className="text-body-16 text-white-100/70 mt-2">
                {featuredProject.subtitle}
              </p>
            </div>
          </Link>
        </div>
      </div>

      {/* Brands */}
      <div className="relative z-[2] bg-white-100 pt-[120px] px-6 md:px-10">
        <motion.div
          ref={quoteRef}
          initial={{ opacity: 0, y: 40 }}
          animate={quoteInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="flex justify-center pb-[60px]"
        >
          <p className="text-h4 max-w-[920px]">
            I&apos;ve had the privilege of collaborating with renowned brands,
            bringing innovative ideas to life and creating impactful designs.
          </p>
        </motion.div>

        {/* Logo Ticker */}
        <div className="max-w-[1200px] mx-auto">
          <MarqueeTicker speed={25} gap={75}>
            {brandLogos.map((logo) => (
              <div
                key={logo.name}
                className="flex items-center justify-center h-[46px] w-[200px] shrink-0 opacity-30"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={200}
                  height={46}
                  className="w-full h-full object-contain"
                />
              </div>
            ))}
          </MarqueeTicker>
        </div>
      </div>

      {/* Selected Projects */}
      <div className="relative z-[2] bg-white-100 pt-[200px]">
        <div className="mx-auto max-w-[1200px] px-6 md:px-10 pb-10">
          <h3 className="text-mono-16 text-black-40 uppercase">
            Selected Projects
          </h3>
        </div>

        <div className="mx-auto max-w-[1200px]">
          {selectedProjects.map((project, i) => (
            <ProjectListItem key={project.slug} project={project} index={i} />
          ))}
          {/* Bottom border for last item */}
          <div className="border-t border-black-10" />
        </div>

        {/* View All Button */}
        <div className="flex items-center justify-center gap-4 py-[100px]">
          <Link
            href="/works"
            className="text-mono-16 text-black-70 hover:text-black-100 transition-colors relative group"
          >
            EXPLORE ALL PROJECTS
            <span className="absolute -bottom-1 left-0 w-full h-px bg-black-70 group-hover:bg-black-100 transition-colors" />
          </Link>
          <svg
            width="24"
            height="27"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgb(179,179,179)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
