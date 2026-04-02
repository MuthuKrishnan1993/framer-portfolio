"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

const sections = [
  { key: "hero", label: "Hero Section" },
  { key: "about", label: "About Section" },
  { key: "projects", label: "Projects Section" },
  { key: "services", label: "Services Section" },
  { key: "stats", label: "Stats Section" },
  { key: "testimonials", label: "Testimonials Section" },
  { key: "book_a_call", label: "Book a Call Section" },
  { key: "footer", label: "Footer" },
];

export default function AdminDashboard() {
  const [flags, setFlags] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    loadFlags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadFlags = async () => {
    const { data } = await supabase
      .from("feature_flags")
      .select("*");
    if (data) {
      const map: Record<string, boolean> = {};
      data.forEach((d) => (map[d.section] = d.enabled));
      setFlags(map);
    }
    setLoading(false);
  };

  const toggleFlag = async (section: string) => {
    const newValue = !flags[section];
    setFlags((prev) => ({ ...prev, [section]: newValue }));

    await supabase
      .from("feature_flags")
      .update({ enabled: newValue, updated_at: new Date().toISOString() })
      .eq("section", section);

    // Revalidate the homepage
    await fetch("/api/revalidate", { method: "POST" });
  };

  if (loading) {
    return (
      <div className="text-[#666] text-sm">Loading...</div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-2">Feature Flags</h1>
      <p className="text-[#666] text-sm mb-8">
        Toggle sections on or off on the homepage.
      </p>

      <div className="grid gap-3 max-w-lg">
        {sections.map(({ key, label }) => (
          <div
            key={key}
            className="flex items-center justify-between px-5 py-4 bg-[#111] border border-[#222] rounded-lg"
          >
            <span className="text-white text-sm">{label}</span>
            <button
              onClick={() => toggleFlag(key)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                flags[key] ? "bg-green-500" : "bg-[#333]"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${
                  flags[key] ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
