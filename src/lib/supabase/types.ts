export interface DbSiteConfig {
  id: string;
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
  updated_at: string;
}

export interface DbBio {
  id: string;
  intro: string;
  current: string;
  award: string;
  updated_at: string;
}

export interface DbService {
  id: string;
  number: string;
  title: string;
  description: string;
  features: string[];
  sort_order: number;
}

export interface DbStat {
  id: string;
  icon: string;
  label: string;
  start_val: number;
  end_val: number;
  suffix: string;
  breakdown: { count: number; label: string }[];
  sort_order: number;
}

export interface DbTestimonial {
  id: string;
  quote: string;
  name: string;
  title: string;
  sort_order: number;
}

export interface DbProject {
  id: string;
  title: string;
  client: string;
  description: string | null;
  subtitle: string | null;
  slug: string;
  image: string;
  is_featured: boolean;
  sort_order: number;
}

export interface DbSocialLink {
  id: string;
  name: string;
  url: string;
  icon: string;
  sort_order: number;
}

export interface DbNavLink {
  id: string;
  label: string;
  href: string;
  sort_order: number;
}

export interface DbFeatureFlag {
  id: string;
  section: string;
  enabled: boolean;
  updated_at: string;
}

export interface DbBrandLogo {
  id: string;
  name: string;
  src: string;
  sort_order: number;
}
