import Image from "next/image";
import {
  ArrowRight,
  Bot,
  Check,
  ChevronRight,
  CircleDollarSign,
  Cpu,
  LayoutTemplate,
  Mail,
  MapPin,
  Network,
  Phone
} from "lucide-react";
import type { SiteContent } from "@/lib/types";

export function IntroBand() {
  return (
    <section className="section intro-band">
      <div className="ai-trace ai-trace-one" aria-hidden="true" />
      <div className="ai-trace ai-trace-two" aria-hidden="true" />
      <div>
        <span className="section-kicker">Why Webara</span>
        <h2>AI speeds things up, but a good website still needs a clear message.</h2>
      </div>
      <p>
        That is why Webara does not deliver just a generated page. We refine the
        structure, copy, design, mobile experience, and details that matter when a
        visitor decides whether to send an inquiry.
      </p>
    </section>
  );
}

export function AboutSection({ content }: { content: SiteContent }) {
  return (
    <section className="section about-section" id="about">
      <div className="about-photo">
        <div className="portrait-signal" aria-hidden="true">
          <Cpu size={18} />
          <span>AI-assisted strategy</span>
        </div>
        <Image
          src={content.about.image}
          alt={`${content.about.name}, ${content.about.role} of Webara`}
          fill
          sizes="(max-width: 900px) 100vw, 38vw"
        />
      </div>
      <div className="about-copy">
        <span className="section-kicker">{content.about.kicker}</span>
        <h2>{content.about.title}</h2>
        <div className="owner-line">
          <strong>{content.about.name}</strong>
          <span>{content.about.role}</span>
        </div>
        <p>{content.about.description}</p>
        <div className="owner-note">
          <span>Owner's note</span>
          <p>{content.about.ownerNote}</p>
          <strong>{content.about.signature}</strong>
        </div>
      </div>
    </section>
  );
}

export function ServicesSection({ content }: { content: SiteContent }) {
  return (
    <section className="section" id="services">
      <div className="section-heading">
        <span className="section-kicker">Services</span>
        <h2>What we can build</h2>
      </div>
      <div className="card-grid">
        {content.services.map((service, index) => (
          <article className="feature-card" key={service.title}>
            <div className="icon-box">
              {index % 2 === 0 ? <LayoutTemplate size={22} /> : <Bot size={22} />}
            </div>
            <div className="card-signal" aria-hidden="true">
              <Network size={15} />
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ProcessSection({ content }: { content: SiteContent }) {
  return (
    <section className="section process-section" id="process">
      <div className="section-heading">
        <span className="section-kicker">Process</span>
        <h2>From idea to launched website</h2>
      </div>
      <div className="process-list">
        {content.process.map((step, index) => (
          <article className="process-item" key={step.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </div>
            <ChevronRight size={18} />
          </article>
        ))}
      </div>
    </section>
  );
}

export function PackagesSection({ content }: { content: SiteContent }) {
  return (
    <section className="section" id="packages">
      <div className="section-heading">
        <span className="section-kicker">Packages</span>
        <h2>Clear packages for different growth stages</h2>
      </div>
      <div className="pricing-grid">
        {content.packages.map((plan) => (
          <article className="price-card" key={plan.name}>
            <div className="price-top">
              <CircleDollarSign size={24} />
              <h3>{plan.name}</h3>
            </div>
            <strong>{plan.price}</strong>
            <p>{plan.description}</p>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>
                  <Check size={17} />
                  {feature}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}

export function FaqSection({ content }: { content: SiteContent }) {
  return (
    <section className="section faq-section" id="faq">
      <div className="section-heading">
        <span className="section-kicker">Questions</span>
        <h2>What clients usually ask</h2>
      </div>
      <div className="faq-list">
        {content.faq.map((item) => (
          <details key={item.question}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function ContactSection({ content }: { content: SiteContent }) {
  return (
    <section className="final-cta lazy-bg" id="contact">
      <div>
        <span className="section-kicker">Contact</span>
        <h2>{content.cta.title}</h2>
        <p>{content.cta.description}</p>
      </div>
      <div className="contact-panel">
        <strong>{content.brand.legalName}</strong>
        <a href={`mailto:${content.brand.email}`}>
          <Mail size={18} />
          {content.brand.email}
        </a>
        <a href={`tel:${content.brand.phone.replace(/\s/g, "")}`}>
          <Phone size={18} />
          {content.brand.phone}
        </a>
        <span>
          <MapPin size={18} />
          {content.brand.address}
        </span>
        <a className="primary-button" href={`mailto:${content.brand.email}`}>
          {content.cta.button}
          <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}
