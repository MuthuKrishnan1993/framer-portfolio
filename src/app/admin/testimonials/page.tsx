"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { DbTestimonial } from "@/lib/supabase/types";

export default function TestimonialsPage() {
  const [items, setItems] = useState<DbTestimonial[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    const { data } = await supabase
      .from("testimonials")
      .select("*")
      .order("sort_order");
    if (data) setItems(data);
    setLoading(false);
  };

  const save = async (item: DbTestimonial) => {
    await supabase
      .from("testimonials")
      .update({ quote: item.quote, name: item.name, title: item.title })
      .eq("id", item.id);
    await fetch("/api/revalidate", { method: "POST" });
    setEditing(null);
  };

  const addItem = async () => {
    const { data } = await supabase
      .from("testimonials")
      .insert({
        quote: "New testimonial quote",
        name: "Client Name",
        title: "Title, Company",
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
    await supabase.from("testimonials").delete().eq("id", id);
    setItems(items.filter((i) => i.id !== id));
    await fetch("/api/revalidate", { method: "POST" });
  };

  const updateField = (id: string, field: keyof DbTestimonial, value: string) => {
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };

  if (loading) return <div className="text-[#666] text-sm">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Testimonials</h1>
          <p className="text-[#666] text-sm">Manage client testimonials.</p>
        </div>
        <button
          onClick={addItem}
          className="px-5 py-2.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
        >
          Add Testimonial
        </button>
      </div>

      <div className="space-y-3 max-w-2xl">
        {items.map((item) => (
          <div key={item.id} className="bg-[#111] border border-[#222] rounded-lg">
            {editing === item.id ? (
              <div className="p-5 space-y-4">
                <div>
                  <label className="block text-[#999] text-xs mb-1">Quote</label>
                  <textarea
                    value={item.quote}
                    onChange={(e) => updateField(item.id, "quote", e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#222] rounded text-white text-sm focus:outline-none focus:border-[#444] resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#999] text-xs mb-1">Name</label>
                    <input
                      value={item.name}
                      onChange={(e) => updateField(item.id, "name", e.target.value)}
                      className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#222] rounded text-white text-sm focus:outline-none focus:border-[#444]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#999] text-xs mb-1">Title</label>
                    <input
                      value={item.title}
                      onChange={(e) => updateField(item.id, "title", e.target.value)}
                      className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#222] rounded text-white text-sm focus:outline-none focus:border-[#444]"
                    />
                  </div>
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
                <div>
                  <span className="text-white text-sm">{item.name}</span>
                  <span className="text-[#666] text-sm ml-3">{item.title}</span>
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
