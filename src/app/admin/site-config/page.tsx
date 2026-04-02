"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface FormData {
  // Site Config
  name: string;
  first_name: string;
  last_name: string;
  tagline: string;
  year: string;
  location: string;
  timezone: string;
  email: string;
  phone: string;
  cal_link: string;
  resume_link: string;
  available_date: string;
  address: string;
  // Bio
  intro: string;
  current_text: string;
  award: string;
}

const siteFields: { key: keyof FormData; label: string; multiline?: boolean }[] = [
  { key: "name", label: "Full Name" },
  { key: "first_name", label: "First Name (uppercase)" },
  { key: "last_name", label: "Last Name (uppercase)" },
  { key: "tagline", label: "Tagline", multiline: true },
  { key: "year", label: "Year Label" },
  { key: "location", label: "Location" },
  { key: "timezone", label: "Timezone" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone" },
  { key: "cal_link", label: "Calendar Link" },
  { key: "resume_link", label: "Resume Link" },
  { key: "available_date", label: "Available Date" },
  { key: "address", label: "Address" },
];

const bioFields: { key: keyof FormData; label: string; multiline?: boolean }[] = [
  { key: "intro", label: "Bio Intro", multiline: true },
  { key: "current_text", label: "Bio Current", multiline: true },
  { key: "award", label: "Award / Title" },
];

export default function SiteConfigPage() {
  const [form, setForm] = useState<FormData | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    const [{ data: sc }, { data: bio }] = await Promise.all([
      supabase.from("site_config").select("*").single(),
      supabase.from("bio").select("*").single(),
    ]);
    if (sc && bio) {
      setForm({
        name: sc.name,
        first_name: sc.first_name,
        last_name: sc.last_name,
        tagline: sc.tagline,
        year: sc.year,
        location: sc.location,
        timezone: sc.timezone,
        email: sc.email,
        phone: sc.phone,
        cal_link: sc.cal_link,
        resume_link: sc.resume_link,
        available_date: sc.available_date,
        address: sc.address,
        intro: bio.intro,
        current_text: bio.current_text,
        award: bio.award,
      });
    }
  };

  const handleSave = async () => {
    if (!form) return;
    setSaving(true);
    setSaved(false);

    await Promise.all([
      supabase
        .from("site_config")
        .update({
          name: form.name,
          first_name: form.first_name,
          last_name: form.last_name,
          tagline: form.tagline,
          year: form.year,
          location: form.location,
          timezone: form.timezone,
          email: form.email,
          phone: form.phone,
          cal_link: form.cal_link,
          resume_link: form.resume_link,
          available_date: form.available_date,
          address: form.address,
          updated_at: new Date().toISOString(),
        })
        .not("id", "is", null),
      supabase
        .from("bio")
        .update({
          intro: form.intro,
          current_text: form.current_text,
          award: form.award,
          updated_at: new Date().toISOString(),
        })
        .not("id", "is", null),
    ]);

    await fetch("/api/revalidate", { method: "POST" });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const update = (key: keyof FormData, value: string) => {
    setForm((prev) => (prev ? { ...prev, [key]: value } : null));
  };

  if (!form) {
    return <div className="text-[#666] text-sm">Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Site Config & Bio</h1>
          <p className="text-[#666] text-sm">Edit your personal information and bio text.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          {saving ? "Saving..." : saved ? "Saved!" : "Save Changes"}
        </button>
      </div>

      <div className="max-w-2xl space-y-10">
        <Section title="Site Config" fields={siteFields} form={form} update={update} />
        <Section title="Bio" fields={bioFields} form={form} update={update} />
      </div>
    </div>
  );
}

function Section({
  title,
  fields,
  form,
  update,
}: {
  title: string;
  fields: { key: keyof FormData; label: string; multiline?: boolean }[];
  form: FormData;
  update: (key: keyof FormData, value: string) => void;
}) {
  return (
    <div>
      <h2 className="text-lg font-semibold text-white mb-4">{title}</h2>
      <div className="space-y-4">
        {fields.map(({ key, label, multiline }) => (
          <div key={key}>
            <label className="block text-[#999] text-xs mb-1.5">{label}</label>
            {multiline ? (
              <textarea
                value={form[key]}
                onChange={(e) => update(key, e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-[#111] border border-[#222] rounded-lg text-white text-sm focus:outline-none focus:border-[#444] resize-none"
              />
            ) : (
              <input
                type="text"
                value={form[key]}
                onChange={(e) => update(key, e.target.value)}
                className="w-full px-4 py-3 bg-[#111] border border-[#222] rounded-lg text-white text-sm focus:outline-none focus:border-[#444]"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
