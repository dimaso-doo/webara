import { ContactSection, PackagesSection } from "@/components/MarketingSections";
import { PageHero, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { getSiteContent } from "@/lib/content";

export default async function PackagesPage() {
  const content = await getSiteContent();

  return (
    <main>
      <SiteHeader content={content} />
      <PageHero
        kicker="Packages"
        title="Packages for different growth stages"
        description="Choose a starting point based on how much structure, content, and ongoing support your business needs."
        image="/assets/optimized/page-headers/packages.jpg"
      />
      <PackagesSection content={content} />
      <ContactSection content={content} />
      <SiteFooter content={content} />
    </main>
  );
}
