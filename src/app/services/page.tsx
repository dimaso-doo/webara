import { ContactSection, ServicesSection } from "@/components/MarketingSections";
import { PageHero, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { getSiteContent } from "@/lib/content";

export default async function ServicesPage() {
  const content = await getSiteContent();

  return (
    <main>
      <SiteHeader content={content} />
      <PageHero
        kicker="Services"
        title="AI-assisted website services"
        description="Focused website design, copy, landing pages, and improvements for businesses that need a better online presence."
        image="/assets/page-headers/services.png"
      />
      <ServicesSection content={content} />
      <ContactSection content={content} />
      <SiteFooter content={content} />
    </main>
  );
}
