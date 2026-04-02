"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { DbStat } from "@/lib/supabase/types";

export default function StatsPage() {
  const [items, setItems] = useState<DbStat[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    const { data } = await supabase
      .from("stats")
      .select("*")
      .order("sort_order");
    if (data) setItems(data);
    setLoading(false);
  };

  const save = async (item: DbStat) => {
    await supabase
      .from("stats")
      .update({
        icon: item.icon,
        label: item.label,
        start_val: item.start_val,
        end_val: item.end_val,
        suffix: item.suffix,
        breakdown: item.breakdown,
      })
      .eq("id", item.id);
    await fetch("/api/revalidate", { method: "POST" });
    setEditing(null);
  };

  const addItem = async () => {
    const { data } = await supabase
      .from("stats")
      .insert({
        icon: "projects",
        label: "NEW STAT",
        start_val: 0,
        end_val: 10,
        suffix: "+",
        breakdown: [],
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
    await supabase.from("stats").delete().eq("id", id);
    setItems(items.filter((i) => i.id !== id));
    await fetch("/api/revalidate", { method: "POST" });
  };

  const updateField = (id: string, field: string, value: unknown) => {
    setItems(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };

  if (loading) return <div className="text-[#666] text-sm">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Stats</h1>
          <p className="text-[#666] text-sm">Manage animated statistics.</p>
        </div>
        <button onClick={addItem} className="px-5 py-2.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors">
          Add Stat
        </button>
      </div>

      <div className="space-y-3 max-w-2xl">
        {items.map((item) => (
          <div key={item.id} className="bg-[#111] border border-[#222] rounded-lg">
            {editing === item.id ? (
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#999] text-xs mb-1">Label</label>
                    <input
                      value={item.label}
                      onChange={(e) => updateField(item.id, "label", e.target.value)}
                      className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#222] rounded text-white text-sm focus:outline-none focus:border-[#444]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#999] text-xs mb-1">Icon (awards/projects/satisfaction/clients)</label>
                    <input
                      value={item.icon}
                      onChange={(e) => updateField(item.id, "icon", e.target.value)}
                      className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#222] rounded text-white text-sm focus:outline-none focus:border-[#444]"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[#999] text-xs mb-1">Start</label>
                    <input
                      type="number"
                      value={item.start_val}
                      onChange={(e) => updateField(item.id, "start_val", Number(e.target.value))}
                      className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#222] rounded text-white text-sm focus:outline-none focus:border-[#444]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#999] text-xs mb-1">End</label>
                    <input
                      type="number"
                      value={item.end_val}
                      onChange={(e) => updateField(item.id, "end_val", Number(e.target.value))}
                      className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#222] rounded text-white text-sm focus:outline-none focus:border-[#444]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#999] text-xs mb-1">Suffix</label>
                    <input
                      value={item.suffix}
                      onChange={(e) => updateField(item.id, "suffix", e.target.value)}
                      className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#222] rounded text-white text-sm focus:outline-none focus:border-[#444]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[#999] text-xs mb-1">
                    Breakdown (JSON: {`[{"count": 3, "label": "React"}]`})
                  </label>
                  <textarea
                    value={JSON.stringify(item.breakdown, null, 2)}
                    onChange={(e) => {
                      try {
                        updateField(item.id, "breakdown", JSON.parse(e.target.value));
                      } catch {
                        // invalid JSON, ignore
                      }
                    }}
                    rows={4}
                    className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#222] rounded text-white text-sm font-mono focus:outline-none focus:border-[#444] resize-none"
                  />
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
                <div className="flex items-center gap-4">
                  <span className="text-white text-sm">{item.label}</span>
                  <span className="text-[#666] text-sm">{item.end_val}{item.suffix}</span>
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
