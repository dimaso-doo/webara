import { ContactSection } from "@/components/MarketingSections";
import { ContactForm } from "@/components/ContactForm";
import { PageHero, SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { getSiteContent } from "@/lib/content";
import { Building2, Mail, MapPin, Phone } from "lucide-react";

export default async function ContactPage() {
  const content = await getSiteContent();

  return (
    <main>
      <SiteHeader content={content} />
      <PageHero
        kicker="Contact"
        title="Start a website conversation"
        description="Send Webara a short note about your business, goals, and what the website needs to achieve."
        image="/assets/optimized/page-headers/contact.jpg"
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
          <span className="section-kicker">Contact details</span>
          <h2>Webara information</h2>
          <p>
            Reach out by email, phone, or use the address below if you need company
            and location details.
          </p>
          <div className="contact-info-grid">
            <article>
              <Building2 size={20} />
              <div>
                <span>Company</span>
                <strong>{content.brand.legalName}</strong>
              </div>
            </article>
            <article>
              <Mail size={20} />
              <div>
                <span>Email</span>
                <a href={`mailto:${content.brand.email}`}>{content.brand.email}</a>
              </div>
            </article>
            <article>
              <Phone size={20} />
              <div>
                <span>Phone</span>
                <a href={`tel:${content.brand.phone.replace(/\s/g, "")}`}>
                  {content.brand.phone}
                </a>
              </div>
            </article>
            <article>
              <MapPin size={20} />
              <div>
                <span>Address</span>
                <strong>{content.brand.address}</strong>
              </div>
            </article>
          </div>
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
