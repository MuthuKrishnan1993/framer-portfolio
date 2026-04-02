"use client";

import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

const navItems = [
  { label: "Feature Flags", href: "/admin" },
  { label: "Site Config", href: "/admin/site-config" },
  { label: "Services", href: "/admin/services" },
  { label: "Projects", href: "/admin/projects" },
  { label: "Testimonials", href: "/admin/testimonials" },
  { label: "Stats", href: "/admin/stats" },
  { label: "Links", href: "/admin/links" },
];

export default function AdminShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#111] border-r border-[#222] flex flex-col shrink-0">
        <div className="p-6 border-b border-[#222]">
          <Link href="/" className="text-white font-bold text-lg">
            Portfolio CMS
          </Link>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`px-4 py-2.5 rounded-lg text-sm transition-colors ${
                pathname === item.href
                  ? "bg-white text-black font-medium"
                  : "text-[#999] hover:text-white hover:bg-[#1a1a1a]"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-[#222]">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2.5 text-sm text-[#999] hover:text-white hover:bg-[#1a1a1a] rounded-lg transition-colors text-left"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
