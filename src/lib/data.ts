export const siteConfig = {
  name: "Muthu Krishnan",
  firstName: "MUTHU",
  lastName: "KRISHNAN",
  tagline: "Crafting Seamless Digital Experiences for Modern Brands",
  year: "2K25",
  location: "Based and work in Bengaluru",
  timezone: "Asia/Kolkata",
  email: "hello@muthukrishnan.dev",
  phone: "+91 98765 43210",
  calLink: "https://cal.com",
  resumeLink: "#",
  availableDate: "4th August 2026",
  address: "Bengaluru, Karnataka, India",
};

export const socialLinks = [
  { name: "X", url: "https://www.x.com", icon: "x" },
  { name: "Instagram", url: "https://www.instagram.com", icon: "instagram" },
  { name: "YouTube", url: "https://www.youtube.com", icon: "youtube" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/muthu-krishnan-b2020075/", icon: "linkedin" },
  { name: "Facebook", url: "https://www.facebook.com", icon: "facebook" },
  { name: "TikTok", url: "https://www.tiktok.com", icon: "tiktok" },
] as const;

export const navLinks = [
  { label: "Work", href: "/works" },
  { label: "About", href: "#about" },
  { label: "Thoughts", href: "/thoughts" },
];

export const bio = {
  intro:
    "With over 6 years of experience in frontend development, I began my career building web and mobile applications at boutique studios, quickly establishing a reputation for pixel-perfect, performant interfaces. My journey led me to senior roles at leading technology companies, where I drove impactful digital transformations.",
  current:
    "Currently, I continue to push the boundaries of modern web development, specialising in React, Next.js, and design systems — delivering scalable, user-centric digital products for forward-thinking brands.",
  award: "Senior FRONTEND DEVELOPER & UI Engineer",
};

export const services = [
  {
    number: "01",
    title: "Web Development",
    description:
      "Building high-performance, responsive web applications using modern frameworks like React, Next.js, and TypeScript. From complex SPAs to server-rendered sites, I deliver production-ready code that scales.",
    features: [
      "React & Next.js",
      "TypeScript",
      "Performance Optimization",
      "Server-Side Rendering",
    ],
  },
  {
    number: "02",
    title: "UI/UX Design",
    description:
      "Translating design visions into pixel-perfect interfaces. I bridge the gap between design and development, ensuring seamless handoffs and faithful implementation of every design detail.",
    features: [
      "Design Systems",
      "Responsive Design",
      "Figma to Code",
      "Interaction Design",
    ],
  },
  {
    number: "03",
    title: "SaaS Development",
    description:
      "Building scalable SaaS frontends with robust architecture, state management, and seamless API integrations. From dashboards to complex workflows, I create interfaces that power business-critical applications.",
    features: [
      "Dashboard Development",
      "API Integration",
      "State Management",
      "Real-time Features",
    ],
  },
  {
    number: "04",
    title: "Mobile Development",
    description:
      "Crafting cross-platform mobile experiences using React Native and modern mobile frameworks. Delivering native-quality apps with shared codebases for faster time-to-market.",
    features: [
      "React Native",
      "Cross-Platform Apps",
      "App Store Deployment",
      "Mobile-First Design",
    ],
  },
  {
    number: "05",
    title: "WordPress & CMS",
    description:
      "Custom WordPress themes and headless CMS implementations that give clients full control over their content. From blogs to enterprise sites, I build content-driven experiences that are easy to manage.",
    features: [
      "Custom Themes",
      "Headless CMS",
      "Content Architecture",
      "SEO Optimization",
    ],
  },
];

export const stats = [
  {
    icon: "awards",
    label: "YEARS OF Experience",
    start: 0,
    end: 6,
    suffix: "+",
    breakdown: [
      { count: 3, label: "React / Next.js" },
      { count: 2, label: "React Native" },
      { count: 6, label: "JavaScript / TypeScript" },
      { count: 4, label: "UI/UX Implementation" },
    ],
  },
  {
    icon: "projects",
    label: "PROJECTS DELIVERED",
    start: 0,
    end: 50,
    suffix: "+",
    breakdown: [
      { count: 25, label: "Web Applications" },
      { count: 12, label: "Mobile Apps" },
      { count: 8, label: "SaaS Platforms" },
      { count: 5, label: "WordPress Sites" },
    ],
  },
  {
    icon: "satisfaction",
    label: "Client Satisfaction Rate",
    start: 0,
    end: 99,
    suffix: "%",
    breakdown: [],
  },
  {
    icon: "clients",
    label: "HAPPY CLIENTS SERVED",
    start: 0,
    end: 30,
    suffix: "+",
    breakdown: [],
  },
];

export const testimonials = [
  {
    quote:
      "Muthu transformed our web platform with his expertise in React and Next.js. His attention to detail and performance-first approach exceeded all expectations.",
    name: "Rahul Sharma",
    title: "CTO, TechVentures",
  },
  {
    quote:
      "Working with Muthu was a game-changer. His deep understanding of frontend architecture and design systems perfectly captured our product vision.",
    name: "Priya Nair",
    title: "Product Manager, InnovateLabs",
  },
  {
    quote:
      "Muthu's exceptional frontend skills elevated our SaaS dashboard to a new level. His seamless execution and innovative approach made all the difference.",
    name: "Arun Patel",
    title: "Founder, CloudStack",
  },
  {
    quote:
      "His ability to translate complex designs into flawless, responsive interfaces is remarkable. Muthu consistently delivers beyond expectations.",
    name: "Deepa Menon",
    title: "Design Lead, PixelCraft",
  },
  {
    quote:
      "Muthu brought fresh energy to our mobile app project. His React Native expertise and collaborative approach made the entire process smooth and efficient.",
    name: "Karthik Rajan",
    title: "Engineering Manager, AppForge",
  },
  {
    quote:
      "From concept to deployment, Muthu's technical depth and creative problem-solving elevated our digital product. A true frontend specialist.",
    name: "Sneha Gupta",
    title: "VP Engineering, DataFlow",
  },
];

export const featuredProject = {
  title: "The Photographer",
  client: "Oliver Hayes",
  subtitle: "A Blend of Elegance and Storytelling",
  slug: "project-1",
  image: "/images/projects/the-photographer.jpg",
};

export const selectedProjects = [
  {
    title: "Stellar Odyssey",
    client: "Nebula Production",
    description:
      "From Concept to Creation – Breathing Life into Cinematic 3D Characters",
    slug: "project-2",
    image: "/images/projects/stellar-odyssey.jpg",
  },
  {
    title: "Last Journey to Mars",
    client: "Cryo Studios",
    description:
      "Vision to Reality – Unveiling the Final Human Visit to Martian Lands",
    slug: "project-3",
    image: "/images/projects/last-journey-to-mars.jpg",
  },
  {
    title: "Supra Home",
    client: "EcoGrid Technologies",
    description: "Smart Solar Energy Management Mobile App",
    slug: "project-4",
    image: "/images/projects/supra-home.png",
  },
  {
    title: "Blanc 4",
    client: "Blanc4 UK",
    description: "Redefine. Reposition. Revitalize.",
    slug: "project-5",
    image: "/images/projects/blanc-4.jpg",
  },
];

export const heroImages = [
  "/images/hero/slide-1.jpg",
  "/images/hero/slide-2.jpg",
  "/images/hero/slide-3.jpg",
  "/images/hero/slide-4.jpg",
];

export const brandLogos = [
  { name: "Logo 1", src: "/logos/logo-1.svg" },
  { name: "Logo 2", src: "/logos/logo-2.svg" },
  { name: "Logo 3", src: "/logos/logo-3.svg" },
  { name: "Logo 4", src: "/logos/logo-4.svg" },
  { name: "Logo 5", src: "/logos/logo-5.svg" },
  { name: "Logo 6", src: "/logos/logo-6.svg" },
  { name: "Logo 7", src: "/logos/logo-7.svg" },
  { name: "Logo 8", src: "/logos/logo-8.svg" },
  { name: "Logo 9", src: "/logos/logo-9.svg" },
  { name: "Logo 10", src: "/logos/logo-10.svg" },
];
