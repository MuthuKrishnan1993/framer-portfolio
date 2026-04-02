"use client";

import Link from "next/link";
import type { SocialLink, SiteConfig } from "@/lib/content";
import LiveClock from "@/components/ui/LiveClock";

interface FooterProps {
  socialLinks: SocialLink[];
  siteConfig: SiteConfig;
}

export default function Footer({ socialLinks, siteConfig }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-0 bg-white-100 text-black-90">
      <div className="mx-auto max-w-[1200px] px-5 md:px-5 pt-10">
        {/* Large Logo Name */}
        <div className="overflow-hidden pb-6 px-2">
          <h2 className="text-h1 text-black-90 leading-none">{siteConfig.firstName} {siteConfig.lastName}</h2>
        </div>

        {/* Contact Details Row */}
        <div className="flex flex-col md:flex-row justify-between gap-10 py-6 px-5">
          {/* Email & Phone */}
          <div className="flex flex-col gap-2">
            <CopyButton text={siteConfig.email} label={siteConfig.email} successLabel="Email copied!" />
            <CopyButton text={siteConfig.phone} label={siteConfig.phone} successLabel="Mobile copied!" />
          </div>

          {/* Time */}
          <div className="flex flex-col gap-0">
            <span className="text-body-16 text-black-70">My current time</span>
            <div className="flex items-end gap-2.5">
              <div className="text-black-70">
                <LiveClock />
              </div>
              <span className="text-body-18 text-black-70">Bengaluru (IST)</span>
            </div>
          </div>

          {/* Address & Social */}
          <div className="flex flex-col md:flex-row gap-10 md:gap-24">
            <div className="max-w-[190px]">
              <span className="text-body-16 text-black-70">{siteConfig.address}</span>
            </div>

            <div className="flex flex-col items-end gap-0.5">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-body-18 text-black-70 hover:text-black-100 transition-colors relative group"
                >
                  {social.name}
                  <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-black-70 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-t border-black-10 bg-white-98 px-5 py-6 pb-[60px] -mx-5">
          <span className="text-body-14 text-black-70">
            Copyright &copy; {new Date().getFullYear()} {siteConfig.name}
          </span>
          <div className="flex items-center gap-6">
            <Link
              href="/privacy-policy"
              className="text-body-16 text-black-70 hover:text-black-100 transition-colors relative group"
            >
              Privacy Policy
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-black-70 transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href="/terms-and-conditions"
              className="text-body-16 text-black-70 hover:text-black-100 transition-colors relative group"
            >
              Terms & Conditions
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-black-70 transition-all duration-300 group-hover:w-full" />
            </Link>
            <Link
              href="/imprint"
              className="text-body-16 text-black-70 hover:text-black-100 transition-colors relative group"
            >
              Imprint
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-black-70 transition-all duration-300 group-hover:w-full" />
            </Link>
            <button
              onClick={scrollToTop}
              className="text-body-14 text-black-70 hover:text-black-100 transition-colors flex items-center gap-1"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

function CopyButton({ text, label, successLabel }: { text: string; label: string; successLabel: string }) {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      const el = document.getElementById(`copy-${text}`);
      if (el) {
        el.textContent = successLabel;
        setTimeout(() => {
          el.textContent = label;
        }, 2000);
      }
    } catch {
      // fallback: do nothing
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="text-h9 text-black-90 hover:text-black-60 transition-colors text-left relative group"
    >
      <span id={`copy-${text}`}>{label}</span>
    </button>
  );
}
