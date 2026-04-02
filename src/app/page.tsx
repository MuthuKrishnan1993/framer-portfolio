import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import BookACall from "@/components/sections/BookACall";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import {
  getSiteConfig,
  getBio,
  getSocialLinks,
  getNavLinks,
  getServices,
  getStats,
  getTestimonials,
  getProjects,
  getBrandLogos,
  getFeatureFlags,
} from "@/lib/content";

export const revalidate = 60;

export default async function Home() {
  const [
    siteConfig,
    bio,
    socialLinks,
    navLinks,
    services,
    stats,
    testimonials,
    projectsData,
    brandLogos,
    flags,
  ] = await Promise.all([
    getSiteConfig(),
    getBio(),
    getSocialLinks(),
    getNavLinks(),
    getServices(),
    getStats(),
    getTestimonials(),
    getProjects(),
    getBrandLogos(),
    getFeatureFlags(),
  ]);

  return (
    <>
      <Navigation navLinks={navLinks} socialLinks={socialLinks} siteConfig={siteConfig} />
      <div className="relative z-[2]">
        {flags.hero && <Hero siteConfig={siteConfig} />}
        {flags.about && (
          <About bio={bio} socialLinks={socialLinks} siteConfig={siteConfig} />
        )}
        {flags.projects && (
          <Projects
            featuredProject={projectsData.featured}
            selectedProjects={projectsData.selected}
            brandLogos={brandLogos}
          />
        )}
        {flags.services && <Services services={services} />}
        {flags.stats && <Stats stats={stats} />}
        {flags.testimonials && <Testimonials testimonials={testimonials} />}
        {flags.book_a_call && <BookACall siteConfig={siteConfig} />}
        {/* Placeholder to create scroll space for fixed footer reveal */}
        <div className="h-[60vh]" />
      </div>
      {flags.footer && (
        <Footer socialLinks={socialLinks} siteConfig={siteConfig} />
      )}
    </>
  );
}
