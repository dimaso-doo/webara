import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import { navLinks } from "@/lib/nav";
import { SiteNav } from "./SiteNav";
import type { SiteContent } from "@/lib/types";

export function SiteHeader({ content }: { content: SiteContent }) {
  return (
    <header className="site-header">
      <a className="brand-mark" href="/" aria-label="Webara home">
        <Image
          src="/assets/webara-logo.svg"
          alt={content.brand.name}
          width={144}
          height={72}
          priority
          className="site-logo"
        />
      </a>
      <SiteNav />
      <a className="header-cta" href={`mailto:${content.brand.email}`}>
        <Mail size={17} />
        Contact
      </a>
    </header>
  );
}

export function SiteFooter({ content }: { content: SiteContent }) {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-brand">
          <a className="brand-mark footer-logo" href="/" aria-label="Webara home">
            <Image
              src="/assets/webara-logo.svg"
              alt={content.brand.name}
              width={154}
              height={77}
              className="site-logo"
            />
          </a>
          <p>{content.brand.tagline}</p>
          <a className="footer-cta" href="/contact">
            Start a project
            <ArrowRight size={17} />
          </a>
        </div>

        <div className="footer-column">
          <span className="footer-label">Explore</span>
          {navLinks.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </div>

        <div className="footer-column footer-contact">
          <span className="footer-label">Contact</span>
          <a href={`mailto:${content.brand.email}`}>
            <Mail size={17} />
            {content.brand.email}
          </a>
          <a href={`tel:${content.brand.phone.replace(/\s/g, "")}`}>
            <Phone size={17} />
            {content.brand.phone}
          </a>
          <span>
            <MapPin size={17} />
            {content.brand.address}
          </span>
        </div>
      </div>

      <div className="footer-bottom">
        <span>Copyright © {new Date().getFullYear()} Webara. All rights reserved.</span>
        <div className="footer-legal">
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms">Terms</a>
        </div>
      </div>
    </footer>
  );
}

export function PageHero({
  kicker,
  title,
  description,
  image
}: {
  kicker: string;
  title: string;
  description: string;
  image: string;
}) {
  return (
    <section className="page-hero">
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        className="page-hero-image"
      />
      <div className="page-hero-overlay" />
      <div className="page-hero-content">
        <span className="section-kicker">{kicker}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  );
}
