import { getSiteContent } from "@/lib/content";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";

export default async function NotFound() {
  const content = await getSiteContent();

  return (
    <main>
      <SiteHeader content={content} />
      <section className="not-found-page">
        <span className="section-kicker">404</span>
        <h1>This page slipped out of the workflow.</h1>
        <p>The page you are looking for does not exist or may have moved.</p>
        <div className="hero-actions">
          <a className="primary-button" href="/">
            Back to home
          </a>
          <a className="secondary-button" href="/contact">
            Contact Webara
          </a>
        </div>
      </section>
      <SiteFooter content={content} />
    </main>
  );
}
