"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { DbSocialLink, DbNavLink } from "@/lib/supabase/types";

export default function LinksPage() {
  const [socialLinks, setSocialLinks] = useState<DbSocialLink[]>([]);
  const [navLinks, setNavLinks] = useState<DbNavLink[]>([]);
  const [editingSocial, setEditingSocial] = useState<string | null>(null);
  const [editingNav, setEditingNav] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    const [{ data: social }, { data: nav }] = await Promise.all([
      supabase.from("social_links").select("*").order("sort_order"),
      supabase.from("nav_links").select("*").order("sort_order"),
    ]);
    if (social) setSocialLinks(social);
    if (nav) setNavLinks(nav);
    setLoading(false);
  };

  const saveSocial = async (item: DbSocialLink) => {
    await supabase
      .from("social_links")
      .update({ name: item.name, url: item.url, icon: item.icon })
      .eq("id", item.id);
    await fetch("/api/revalidate", { method: "POST" });
    setEditingSocial(null);
  };

  const addSocial = async () => {
    const { data } = await supabase
      .from("social_links")
      .insert({ name: "New Link", url: "https://", icon: "x", sort_order: socialLinks.length })
      .select()
      .single();
    if (data) {
      setSocialLinks([...socialLinks, data]);
      setEditingSocial(data.id);
    }
  };

  const deleteSocial = async (id: string) => {
    await supabase.from("social_links").delete().eq("id", id);
    setSocialLinks(socialLinks.filter((i) => i.id !== id));
    await fetch("/api/revalidate", { method: "POST" });
  };

  const saveNav = async (item: DbNavLink) => {
    await supabase
      .from("nav_links")
      .update({ label: item.label, href: item.href })
      .eq("id", item.id);
    await fetch("/api/revalidate", { method: "POST" });
    setEditingNav(null);
  };

  const addNav = async () => {
    const { data } = await supabase
      .from("nav_links")
      .insert({ label: "New", href: "/new", sort_order: navLinks.length })
      .select()
      .single();
    if (data) {
      setNavLinks([...navLinks, data]);
      setEditingNav(data.id);
    }
  };

  const deleteNav = async (id: string) => {
    await supabase.from("nav_links").delete().eq("id", id);
    setNavLinks(navLinks.filter((i) => i.id !== id));
    await fetch("/api/revalidate", { method: "POST" });
  };

  const updateSocial = (id: string, field: keyof DbSocialLink, value: string) => {
    setSocialLinks(socialLinks.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };

  const updateNav = (id: string, field: keyof DbNavLink, value: string) => {
    setNavLinks(navLinks.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };

  if (loading) return <div className="text-[#666] text-sm">Loading...</div>;

  return (
    <div className="max-w-2xl space-y-12">
      {/* Social Links */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Social Links</h1>
            <p className="text-[#666] text-sm">Manage social media links.</p>
          </div>
          <button onClick={addSocial} className="px-5 py-2.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">Add</button>
        </div>
        <div className="space-y-3">
          {socialLinks.map((item) => (
            <div key={item.id} className="bg-[#111] border border-[#222] rounded-lg">
              {editingSocial === item.id ? (
                <div className="p-5 space-y-3">
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[#999] text-xs mb-1">Name</label>
                      <input value={item.name} onChange={(e) => updateSocial(item.id, "name", e.target.value)} className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#222] rounded text-white text-sm focus:outline-none focus:border-[#444]" />
                    </div>
                    <div>
                      <label className="block text-[#999] text-xs mb-1">Icon</label>
                      <input value={item.icon} onChange={(e) => updateSocial(item.id, "icon", e.target.value)} className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#222] rounded text-white text-sm focus:outline-none focus:border-[#444]" />
                    </div>
                    <div>
                      <label className="block text-[#999] text-xs mb-1">URL</label>
                      <input value={item.url} onChange={(e) => updateSocial(item.id, "url", e.target.value)} className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#222] rounded text-white text-sm focus:outline-none focus:border-[#444]" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => saveSocial(item)} className="px-4 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">Save</button>
                    <button onClick={() => setEditingSocial(null)} className="px-4 py-2 text-[#999] text-sm hover:text-white transition-colors">Cancel</button>
                    <button onClick={() => deleteSocial(item.id)} className="px-4 py-2 text-red-400 text-sm hover:text-red-300 transition-colors ml-auto">Delete</button>
                  </div>
                </div>
              ) : (
                <button onClick={() => setEditingSocial(item.id)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#1a1a1a] transition-colors rounded-lg">
                  <span className="text-white text-sm">{item.name}</span>
                  <span className="text-[#444] text-xs">Edit</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Nav Links */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Navigation Links</h2>
            <p className="text-[#666] text-sm">Manage navigation menu items.</p>
          </div>
          <button onClick={addNav} className="px-5 py-2.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">Add</button>
        </div>
        <div className="space-y-3">
          {navLinks.map((item) => (
            <div key={item.id} className="bg-[#111] border border-[#222] rounded-lg">
              {editingNav === item.id ? (
                <div className="p-5 space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[#999] text-xs mb-1">Label</label>
                      <input value={item.label} onChange={(e) => updateNav(item.id, "label", e.target.value)} className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#222] rounded text-white text-sm focus:outline-none focus:border-[#444]" />
                    </div>
                    <div>
                      <label className="block text-[#999] text-xs mb-1">Href</label>
                      <input value={item.href} onChange={(e) => updateNav(item.id, "href", e.target.value)} className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#222] rounded text-white text-sm focus:outline-none focus:border-[#444]" />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => saveNav(item)} className="px-4 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">Save</button>
                    <button onClick={() => setEditingNav(null)} className="px-4 py-2 text-[#999] text-sm hover:text-white transition-colors">Cancel</button>
                    <button onClick={() => deleteNav(item.id)} className="px-4 py-2 text-red-400 text-sm hover:text-red-300 transition-colors ml-auto">Delete</button>
                  </div>
                </div>
              ) : (
                <button onClick={() => setEditingNav(item.id)} className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#1a1a1a] transition-colors rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-white text-sm">{item.label}</span>
                    <span className="text-[#666] text-sm">{item.href}</span>
                  </div>
                  <span className="text-[#444] text-xs">Edit</span>
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
