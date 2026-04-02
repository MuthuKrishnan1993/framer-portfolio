import { createClient } from "@/lib/supabase/server";
import * as staticData from "./data";

// ─── Types matching data.ts shapes ────────────────────────────

export type SiteConfig = typeof staticData.siteConfig;
export type Bio = typeof staticData.bio;
export type Service = (typeof staticData.services)[number];
export type Stat = (typeof staticData.stats)[number];
export type Testimonial = (typeof staticData.testimonials)[number];
export type SocialLink = (typeof staticData.socialLinks)[number];
export type NavLink = (typeof staticData.navLinks)[number];
export type FeaturedProject = typeof staticData.featuredProject;
export type SelectedProject = (typeof staticData.selectedProjects)[number];
export type BrandLogo = (typeof staticData.brandLogos)[number];

export type FeatureFlags = Record<string, boolean>;

// ─── Fetch helpers ────────────────────────────────────────────

export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_config")
      .select("*")
      .single();
    if (error || !data) throw error;
    return {
      name: data.name,
      firstName: data.first_name,
      lastName: data.last_name,
      tagline: data.tagline,
      year: data.year,
      location: data.location,
      timezone: data.timezone,
      email: data.email,
      phone: data.phone,
      calLink: data.cal_link,
      resumeLink: data.resume_link,
      availableDate: data.available_date,
      address: data.address,
    };
  } catch {
    return staticData.siteConfig;
  }
}

export async function getBio(): Promise<Bio> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("bio")
      .select("*")
      .single();
    if (error || !data) throw error;
    return {
      intro: data.intro,
      current: data.current_text,
      award: data.award,
    };
  } catch {
    return staticData.bio;
  }
}

export async function getSocialLinks(): Promise<SocialLink[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("social_links")
      .select("*")
      .order("sort_order");
    if (error || !data?.length) throw error;
    return data.map((d) => ({
      name: d.name,
      url: d.url,
      icon: d.icon,
    })) as SocialLink[];
  } catch {
    return [...staticData.socialLinks];
  }
}

export async function getNavLinks(): Promise<NavLink[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("nav_links")
      .select("*")
      .order("sort_order");
    if (error || !data?.length) throw error;
    return data.map((d) => ({ label: d.label, href: d.href }));
  } catch {
    return [...staticData.navLinks];
  }
}

export async function getServices(): Promise<Service[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .order("sort_order");
    if (error || !data?.length) throw error;
    return data.map((d) => ({
      number: d.number,
      title: d.title,
      description: d.description,
      features: d.features,
    }));
  } catch {
    return [...staticData.services];
  }
}

export async function getStats(): Promise<Stat[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("stats")
      .select("*")
      .order("sort_order");
    if (error || !data?.length) throw error;
    return data.map((d) => ({
      icon: d.icon,
      label: d.label,
      start: d.start_val,
      end: d.end_val,
      suffix: d.suffix,
      breakdown: d.breakdown as { count: number; label: string }[],
    }));
  } catch {
    return [...staticData.stats];
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .order("sort_order");
    if (error || !data?.length) throw error;
    return data.map((d) => ({
      quote: d.quote,
      name: d.name,
      title: d.title,
    }));
  } catch {
    return [...staticData.testimonials];
  }
}

export async function getProjects(): Promise<{
  featured: FeaturedProject;
  selected: SelectedProject[];
}> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("sort_order");
    if (error || !data?.length) throw error;

    const featuredRow = data.find((d) => d.is_featured);
    const selectedRows = data.filter((d) => !d.is_featured);

    const featured: FeaturedProject = featuredRow
      ? {
          title: featuredRow.title,
          client: featuredRow.client,
          subtitle: featuredRow.subtitle || "",
          slug: featuredRow.slug,
          image: featuredRow.image,
        }
      : staticData.featuredProject;

    const selected: SelectedProject[] = selectedRows.map((d) => ({
      title: d.title,
      client: d.client,
      description: d.description || "",
      slug: d.slug,
      image: d.image,
    }));

    return { featured, selected };
  } catch {
    return {
      featured: staticData.featuredProject,
      selected: [...staticData.selectedProjects],
    };
  }
}

export async function getBrandLogos(): Promise<BrandLogo[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("brand_logos")
      .select("*")
      .order("sort_order");
    if (error || !data?.length) throw error;
    return data.map((d) => ({ name: d.name, src: d.src }));
  } catch {
    return [...staticData.brandLogos];
  }
}

export async function getFeatureFlags(): Promise<FeatureFlags> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("feature_flags")
      .select("*");
    if (error || !data?.length) throw error;
    const flags: FeatureFlags = {};
    data.forEach((d) => {
      flags[d.section] = d.enabled;
    });
    return flags;
  } catch {
    // All sections enabled by default
    return {
      hero: true,
      about: true,
      projects: true,
      services: true,
      stats: true,
      testimonials: true,
      book_a_call: true,
      footer: true,
    };
  }
}
