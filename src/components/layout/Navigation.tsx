"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { NavLink, SocialLink, SiteConfig } from "@/lib/content";
import Link from "next/link";

interface NavigationProps {
  navLinks: NavLink[];
  socialLinks: SocialLink[];
  siteConfig: SiteConfig;
}

export default function Navigation({ navLinks, socialLinks, siteConfig }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Nav */}
      <motion.nav
        initial={{ opacity: 0.1, y: -75 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.44, 0, 0.56, 1] }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-6 mix-blend-difference">
        {/* Left - Logo */}
        <Link href="/" className="text-mono-14 text-white-100 tracking-wider">
          {siteConfig.firstName} {siteConfig.lastName}
        </Link>

        {/* Center - Nav Links (desktop only) */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-mono-14 text-white-100 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-white-100 transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Right - Social + Burger */}
        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-4">
            {socialLinks.slice(0, 4).map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-mono-14 text-white-100"
              >
                {social.name.slice(0, 2).toUpperCase()}
              </a>
            ))}
          </div>

          {/* Burger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-6 bg-white-100"
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="block h-0.5 w-6 bg-white-100"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="block h-0.5 w-6 bg-white-100"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black-100 flex flex-col items-start justify-center px-10 gap-6"
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-menu text-white-100"
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <div className="flex gap-6 mt-8">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-mono-14 text-black-30 hover:text-white-100 transition-colors"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
