-- ═══════════════════════════════════════════════════════════════
-- Seed data — matches src/lib/data.ts
-- ═══════════════════════════════════════════════════════════════

-- Site Config
INSERT INTO site_config (name, first_name, last_name, tagline, year, location, timezone, email, phone, cal_link, resume_link, available_date, address)
VALUES (
  'Muthu Krishnan', 'MUTHU', 'KRISHNAN',
  'Crafting Seamless Digital Experiences for Modern Brands',
  '2K25', 'Based and work in Bengaluru', 'Asia/Kolkata',
  'hello@muthukrishnan.dev', '+91 98765 43210',
  'https://cal.com', '#', '4th August 2026',
  'Bengaluru, Karnataka, India'
);

-- Bio
INSERT INTO bio (intro, current_text, award)
VALUES (
  'With over 6 years of experience in frontend development, I began my career building web and mobile applications at boutique studios, quickly establishing a reputation for pixel-perfect, performant interfaces. My journey led me to senior roles at leading technology companies, where I drove impactful digital transformations.',
  'Currently, I continue to push the boundaries of modern web development, specialising in React, Next.js, and design systems — delivering scalable, user-centric digital products for forward-thinking brands.',
  'Senior FRONTEND DEVELOPER & UI Engineer'
);

-- Social Links
INSERT INTO social_links (name, url, icon, sort_order) VALUES
  ('X', 'https://www.x.com', 'x', 0),
  ('Instagram', 'https://www.instagram.com', 'instagram', 1),
  ('YouTube', 'https://www.youtube.com', 'youtube', 2),
  ('LinkedIn', 'https://www.linkedin.com/in/muthu-krishnan-b2020075/', 'linkedin', 3),
  ('Facebook', 'https://www.facebook.com', 'facebook', 4),
  ('TikTok', 'https://www.tiktok.com', 'tiktok', 5);

-- Nav Links
INSERT INTO nav_links (label, href, sort_order) VALUES
  ('Work', '/works', 0),
  ('About', '#about', 1),
  ('Thoughts', '/thoughts', 2);

-- Services
INSERT INTO services (number, title, description, features, sort_order) VALUES
  ('01', 'Web Development', 'Building high-performance, responsive web applications using modern frameworks like React, Next.js, and TypeScript. From complex SPAs to server-rendered sites, I deliver production-ready code that scales.', ARRAY['React & Next.js', 'TypeScript', 'Performance Optimization', 'Server-Side Rendering'], 0),
  ('02', 'UI/UX Design', 'Translating design visions into pixel-perfect interfaces. I bridge the gap between design and development, ensuring seamless handoffs and faithful implementation of every design detail.', ARRAY['Design Systems', 'Responsive Design', 'Figma to Code', 'Interaction Design'], 1),
  ('03', 'SaaS Development', 'Building scalable SaaS frontends with robust architecture, state management, and seamless API integrations. From dashboards to complex workflows, I create interfaces that power business-critical applications.', ARRAY['Dashboard Development', 'API Integration', 'State Management', 'Real-time Features'], 2),
  ('04', 'Mobile Development', 'Crafting cross-platform mobile experiences using React Native and modern mobile frameworks. Delivering native-quality apps with shared codebases for faster time-to-market.', ARRAY['React Native', 'Cross-Platform Apps', 'App Store Deployment', 'Mobile-First Design'], 3),
  ('05', 'WordPress & CMS', 'Custom WordPress themes and headless CMS implementations that give clients full control over their content. From blogs to enterprise sites, I build content-driven experiences that are easy to manage.', ARRAY['Custom Themes', 'Headless CMS', 'Content Architecture', 'SEO Optimization'], 4);

-- Stats
INSERT INTO stats (icon, label, start_val, end_val, suffix, breakdown, sort_order) VALUES
  ('awards', 'YEARS OF Experience', 0, 6, '+', '[{"count":3,"label":"React / Next.js"},{"count":2,"label":"React Native"},{"count":6,"label":"JavaScript / TypeScript"},{"count":4,"label":"UI/UX Implementation"}]'::jsonb, 0),
  ('projects', 'PROJECTS DELIVERED', 0, 50, '+', '[{"count":25,"label":"Web Applications"},{"count":12,"label":"Mobile Apps"},{"count":8,"label":"SaaS Platforms"},{"count":5,"label":"WordPress Sites"}]'::jsonb, 1),
  ('satisfaction', 'Client Satisfaction Rate', 0, 99, '%', '[]'::jsonb, 2),
  ('clients', 'HAPPY CLIENTS SERVED', 0, 30, '+', '[]'::jsonb, 3);

-- Testimonials
INSERT INTO testimonials (quote, name, title, sort_order) VALUES
  ('Muthu transformed our web platform with his expertise in React and Next.js. His attention to detail and performance-first approach exceeded all expectations.', 'Rahul Sharma', 'CTO, TechVentures', 0),
  ('Working with Muthu was a game-changer. His deep understanding of frontend architecture and design systems perfectly captured our product vision.', 'Priya Nair', 'Product Manager, InnovateLabs', 1),
  ('Muthu''s exceptional frontend skills elevated our SaaS dashboard to a new level. His seamless execution and innovative approach made all the difference.', 'Arun Patel', 'Founder, CloudStack', 2),
  ('His ability to translate complex designs into flawless, responsive interfaces is remarkable. Muthu consistently delivers beyond expectations.', 'Deepa Menon', 'Design Lead, PixelCraft', 3),
  ('Muthu brought fresh energy to our mobile app project. His React Native expertise and collaborative approach made the entire process smooth and efficient.', 'Karthik Rajan', 'Engineering Manager, AppForge', 4),
  ('From concept to deployment, Muthu''s technical depth and creative problem-solving elevated our digital product. A true frontend specialist.', 'Sneha Gupta', 'VP Engineering, DataFlow', 5);

-- Projects
INSERT INTO projects (title, client, description, subtitle, slug, image, is_featured, sort_order) VALUES
  ('The Photographer', 'Oliver Hayes', NULL, 'A Blend of Elegance and Storytelling', 'project-1', '/images/projects/the-photographer.jpg', true, 0),
  ('Stellar Odyssey', 'Nebula Production', 'From Concept to Creation – Breathing Life into Cinematic 3D Characters', NULL, 'project-2', '/images/projects/stellar-odyssey.jpg', false, 1),
  ('Last Journey to Mars', 'Cryo Studios', 'Vision to Reality – Unveiling the Final Human Visit to Martian Lands', NULL, 'project-3', '/images/projects/last-journey-to-mars.jpg', false, 2),
  ('Supra Home', 'EcoGrid Technologies', 'Smart Solar Energy Management Mobile App', NULL, 'project-4', '/images/projects/supra-home.png', false, 3),
  ('Blanc 4', 'Blanc4 UK', 'Redefine. Reposition. Revitalize.', NULL, 'project-5', '/images/projects/blanc-4.jpg', false, 4);

-- Brand Logos
INSERT INTO brand_logos (name, src, sort_order) VALUES
  ('Logo 1', '/logos/logo-1.svg', 0),
  ('Logo 2', '/logos/logo-2.svg', 1),
  ('Logo 3', '/logos/logo-3.svg', 2),
  ('Logo 4', '/logos/logo-4.svg', 3),
  ('Logo 5', '/logos/logo-5.svg', 4),
  ('Logo 6', '/logos/logo-6.svg', 5),
  ('Logo 7', '/logos/logo-7.svg', 6),
  ('Logo 8', '/logos/logo-8.svg', 7),
  ('Logo 9', '/logos/logo-9.svg', 8),
  ('Logo 10', '/logos/logo-10.svg', 9);

-- Feature Flags (all enabled by default)
INSERT INTO feature_flags (section, enabled) VALUES
  ('hero', true),
  ('about', true),
  ('projects', true),
  ('services', true),
  ('stats', true),
  ('testimonials', true),
  ('book_a_call', true),
  ('footer', true);
