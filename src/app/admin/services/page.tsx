"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { DbService } from "@/lib/supabase/types";

export default function ServicesPage() {
  const [services, setServices] = useState<DbService[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = async () => {
    const { data } = await supabase
      .from("services")
      .select("*")
      .order("sort_order");
    if (data) setServices(data);
    setLoading(false);
  };

  const save = async (service: DbService) => {
    await supabase
      .from("services")
      .update({
        number: service.number,
        title: service.title,
        description: service.description,
        features: service.features,
      })
      .eq("id", service.id);
    await fetch("/api/revalidate", { method: "POST" });
    setEditing(null);
  };

  const addService = async () => {
    const num = String(services.length + 1).padStart(2, "0");
    const { data } = await supabase
      .from("services")
      .insert({
        number: num,
        title: "New Service",
        description: "Description here",
        features: ["Feature 1"],
        sort_order: services.length,
      })
      .select()
      .single();
    if (data) {
      setServices([...services, data]);
      setEditing(data.id);
    }
  };

  const deleteService = async (id: string) => {
    await supabase.from("services").delete().eq("id", id);
    setServices(services.filter((s) => s.id !== id));
    await fetch("/api/revalidate", { method: "POST" });
  };

  const updateField = (id: string, field: keyof DbService, value: unknown) => {
    setServices(
      services.map((s) => (s.id === id ? { ...s, [field]: value } : s))
    );
  };

  if (loading) return <div className="text-[#666] text-sm">Loading...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Services</h1>
          <p className="text-[#666] text-sm">Manage your service offerings.</p>
        </div>
        <button
          onClick={addService}
          className="px-5 py-2.5 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
        >
          Add Service
        </button>
      </div>

      <div className="space-y-3 max-w-2xl">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-[#111] border border-[#222] rounded-lg"
          >
            {editing === service.id ? (
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-[60px_1fr] gap-3">
                  <div>
                    <label className="block text-[#999] text-xs mb-1">No.</label>
                    <input
                      value={service.number}
                      onChange={(e) => updateField(service.id, "number", e.target.value)}
                      className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#222] rounded text-white text-sm focus:outline-none focus:border-[#444]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#999] text-xs mb-1">Title</label>
                    <input
                      value={service.title}
                      onChange={(e) => updateField(service.id, "title", e.target.value)}
                      className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#222] rounded text-white text-sm focus:outline-none focus:border-[#444]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[#999] text-xs mb-1">Description</label>
                  <textarea
                    value={service.description}
                    onChange={(e) => updateField(service.id, "description", e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#222] rounded text-white text-sm focus:outline-none focus:border-[#444] resize-none"
                  />
                </div>
                <div>
                  <label className="block text-[#999] text-xs mb-1">
                    Features (comma-separated)
                  </label>
                  <input
                    value={service.features.join(", ")}
                    onChange={(e) =>
                      updateField(
                        service.id,
                        "features",
                        e.target.value.split(",").map((f) => f.trim()).filter(Boolean)
                      )
                    }
                    className="w-full px-3 py-2 bg-[#0a0a0a] border border-[#222] rounded text-white text-sm focus:outline-none focus:border-[#444]"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => save(service)}
                    className="px-4 py-2 bg-white text-black text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditing(null)}
                    className="px-4 py-2 text-[#999] text-sm hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => deleteService(service.id)}
                    className="px-4 py-2 text-red-400 text-sm hover:text-red-300 transition-colors ml-auto"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setEditing(service.id)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#1a1a1a] transition-colors rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <span className="text-[#666] text-sm font-mono">
                    {service.number}
                  </span>
                  <span className="text-white text-sm">{service.title}</span>
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
