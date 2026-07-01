import { ContactSection, ProcessSection } from "@/components/MarketingSections";
import { PageHero, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { getSiteContent } from "@/lib/content";

export default async function ProcessPage() {
  const content = await getSiteContent();

  return (
    <main>
      <SiteHeader content={content} />
      <PageHero
        kicker="Process"
        title="A clear path from idea to launch"
        description="A simple workflow that keeps strategy, AI speed, design, build quality, and support connected."
        image="/assets/page-headers/process.png"
      />
      <ProcessSection content={content} />
      <ContactSection content={content} />
      <SiteFooter content={content} />
    </main>
  );
}
