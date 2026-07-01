import { ContactSection } from "@/components/MarketingSections";
import { ContactForm } from "@/components/ContactForm";
import { PageHero, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { getSiteContent } from "@/lib/content";

export default async function ContactPage() {
  const content = await getSiteContent();

  return (
    <main>
      <SiteHeader content={content} />
      <PageHero
        kicker="Contact"
        title="Start a website conversation"
        description="Send Webara a short note about your business, goals, and what the website needs to achieve."
        image="/assets/page-headers/contact.png"
      />
      <section className="section contact-page-grid">
        <div className="contact-form-panel">
          <span className="section-kicker">Message</span>
          <h2>Tell us what you want to build</h2>
          <p>
            Share a few details and Webara will suggest the best structure, package,
            and next step for your website.
          </p>
          <ContactForm />
        </div>
        <div className="map-panel">
          <span className="section-kicker">Location</span>
          <h2>{content.brand.legalName}</h2>
          <p>{content.brand.address}</p>
          <iframe
            title="Webara location map"
            src={`https://www.google.com/maps?q=${encodeURIComponent(content.brand.address)}&output=embed`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>
      <ContactSection content={content} />
      <SiteFooter content={content} />
    </main>
  );
}
