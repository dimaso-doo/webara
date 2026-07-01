import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import type { SiteContent } from "@/lib/types";

type LegalSection = {
  title: string;
  body: string;
};

export function LegalPage({
  content,
  title,
  description,
  sections
}: {
  content: SiteContent;
  title: string;
  description: string;
  sections: LegalSection[];
}) {
  return (
    <main>
      <SiteHeader content={content} />
      <section className="legal-hero">
        <span className="section-kicker">Legal</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </section>
      <section className="legal-content">
        {sections.map((section) => (
          <article key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </article>
        ))}
      </section>
      <SiteFooter content={content} />
    </main>
  );
}
