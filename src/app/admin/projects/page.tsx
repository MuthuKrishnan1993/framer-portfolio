"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { DbProject } from "@/lib/supabase/types";

export default function ProjectsPage() {
  const [items, setItems] = useState<DbProject[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    const { data } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order");
    if (data) setItems(data);
    setLoading(false);
  };

  const save = async (item: DbProject) => {
    await supabase
      .from("projects")
      .update({
        title: item.title,
        client: item.client,
        description: item.description,
        subtitle: item.subtitle,
        slug: item.slug,
        image: item.image,
        is_featured: item.is_featured,
      })
      .eq("id", item.id);
    await fetch("/api/revalidate", { method: "POST" });
    setEditing(null);
  };

  const addItem = async () => {
    const slug = `project-${items.length + 1}`;
    const { data } = await supabase
      .from("projects")
      .insert({
        title: "New Project",
        client: "Client Name",
        description: "Project description",
        subtitle: null,
        slug,
        image: "/images/projects/placeholder.jpg",
        is_featured: false,
        sort_order: items.length,
      })
      .select()
      .single();
    if (data) {
      setItems([...items, data]);
      setEditing(data.id);
    }
  };

  const deleteItem = async (id: string) => {
    await supabase.from("projects").delete().eq("id", id);
    setItems(items.filter((i) => i.id !== id));
    await fetch("/api/revalidate", { method: "POST" });
  };

  const updateField = (id: string, field: keyof DbProject, value: unknown) => {
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };

  if (loading) return <div className="text-[#666] text-sm">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Projects</h1>
          <p className="text-[#666] text-sm">Manage portfolio projects. One project can be marked as featured.</p>
        </div>
        <button
          onClick={addItem}
          className="px-5 py-2.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
        >
          Add Project
        </button>
      </div>

      <div className="space-y-3 max-w-2xl">
        {items.map((item) => (
          <div key={item.id} className="bg-[#111] border border-[#222] rounded-lg">
            {editing === item.id ? (
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#999] text-xs mb-1">Title</label>
                    <input
                      value={item.title}
                      onChange={(e) => updateField(item.id, "title", e.target.value)}
                      className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#222] rounded text-white text-sm focus:outline-none focus:border-[#444]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#999] text-xs mb-1">Client</label>
                    <input
                      value={item.client}
                      onChange={(e) => updateField(item.id, "client", e.target.value)}
                      className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#222] rounded text-white text-sm focus:outline-none focus:border-[#444]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[#999] text-xs mb-1">Description</label>
                  <textarea
                    value={item.description || ""}
                    onChange={(e) => updateField(item.id, "description", e.target.value)}
                    rows={2}
                    className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#222] rounded text-white text-sm focus:outline-none focus:border-[#444] resize-none"
                  />
                </div>
                <div>
                  <label className="block text-[#999] text-xs mb-1">Subtitle (for featured)</label>
                  <input
                    value={item.subtitle || ""}
                    onChange={(e) => updateField(item.id, "subtitle", e.target.value)}
                    className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#222] rounded text-white text-sm focus:outline-none focus:border-[#444]"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#999] text-xs mb-1">Slug</label>
                    <input
                      value={item.slug}
                      onChange={(e) => updateField(item.id, "slug", e.target.value)}
                      className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#222] rounded text-white text-sm focus:outline-none focus:border-[#444]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#999] text-xs mb-1">Image Path</label>
                    <input
                      value={item.image}
                      onChange={(e) => updateField(item.id, "image", e.target.value)}
                      className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#222] rounded text-white text-sm focus:outline-none focus:border-[#444]"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 text-sm text-[#999] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={item.is_featured}
                      onChange={(e) => updateField(item.id, "is_featured", e.target.checked)}
                      className="rounded"
                    />
                    Featured Project
                  </label>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => save(item)} className="px-4 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">Save</button>
                  <button onClick={() => setEditing(null)} className="px-4 py-2 text-[#999] text-sm hover:text-white transition-colors">Cancel</button>
                  <button onClick={() => deleteItem(item.id)} className="px-4 py-2 text-red-400 text-sm hover:text-red-300 transition-colors ml-auto">Delete</button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setEditing(item.id)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#1a1a1a] transition-colors rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="text-white text-sm">{item.title}</span>
                  {item.is_featured && (
                    <span className="text-[10px] px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full">Featured</span>
                  )}
                </div>
                <span className="text-[#444] text-xs">Edit</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
