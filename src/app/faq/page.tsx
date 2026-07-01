import { ContactSection, FaqSection } from "@/components/MarketingSections";
import { PageHero, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { getSiteContent } from "@/lib/content";

export default async function FaqPage() {
  const content = await getSiteContent();

  return (
    <main>
      <SiteHeader content={content} />
      <PageHero
        kicker="FAQ"
        title="Common questions before we start"
        description="Quick answers about timelines, AI involvement, content updates, domain setup, and hosting support."
        image="/assets/optimized/page-headers/faq.jpg"
      />
      <FaqSection content={content} />
      <ContactSection content={content} />
      <SiteFooter content={content} />
    </main>
  );
}
