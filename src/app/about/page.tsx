import { AboutSection } from "@/components/MarketingSections";
import { PageHero, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { getSiteContent } from "@/lib/content";

export default async function AboutPage() {
  const content = await getSiteContent();

  return (
    <main>
      <SiteHeader content={content} />
      <PageHero
        kicker="About"
        title="Where AI speed meets human judgment"
        description="Webara is led by Sandra Lukic with a practical eye for strategy, design, and the small decisions that make AI-built websites feel genuinely useful."
        image="/assets/optimized/page-headers/about.jpg"
      />
      <AboutSection content={content} />
      <SiteFooter content={content} />
    </main>
  );
}
