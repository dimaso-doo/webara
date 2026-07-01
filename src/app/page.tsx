import { ArrowRight, Sparkles } from "lucide-react";
import { getSiteContent } from "@/lib/content";
import { FloatingHeroMedia } from "@/components/FloatingHeroMedia";
import { ContactSection, IntroBand } from "@/components/MarketingSections";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

const pageLinks = [
  {
    href: "/about",
    title: "About",
    description: "Meet Sandra Lukic and the ownership behind Webara."
  },
  {
    href: "/services",
    title: "Services",
    description: "Explore AI website design, landing pages, copy, and maintenance."
  },
  {
    href: "/process",
    title: "Process",
    description: "See how Webara moves from idea to launch."
  },
  {
    href: "/packages",
    title: "Packages",
    description: "Compare clear starting points for different business needs."
  },
  {
    href: "/faq",
    title: "FAQ",
    description: "Read common answers before starting a website project."
  },
  {
    href: "/contact",
    title: "Contact",
    description: "Get the company details and send an inquiry."
  }
];

export default async function Home() {
  const content = await getSiteContent();

  return (
    <main>
      <SiteHeader content={content} />

      <section className="hero-section" id="top">
        <div className="hero-copy">
          <div className="eyebrow">
            <Sparkles size={16} />
            {content.hero.eyebrow}
          </div>
          <h1>{content.hero.title}</h1>
          <p>{content.hero.subtitle}</p>
          <div className="hero-actions">
            <a className="primary-button" href="/contact">
              {content.hero.primaryCta}
              <ArrowRight size={18} />
            </a>
            <a className="secondary-button" href="/packages">
              {content.hero.secondaryCta}
            </a>
          </div>
          <div className="stats-row">
            {content.stats.map((stat) => (
              <div className="stat" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
        <FloatingHeroMedia />
      </section>

      <IntroBand />

      <section className="section page-link-section">
        <div className="section-heading">
          <span className="section-kicker">Explore Webara</span>
          <h2>Everything now has its own page.</h2>
        </div>
        <div className="page-link-grid">
          {pageLinks.map((link) => (
            <a className="page-link-card" href={link.href} key={link.href}>
              <h3>{link.title}</h3>
              <p>{link.description}</p>
              <span>
                Open page
                <ArrowRight size={17} />
              </span>
            </a>
          ))}
        </div>
      </section>

      <ContactSection content={content} />
      <SiteFooter content={content} />
    </main>
  );
}
