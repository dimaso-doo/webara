import { LegalPage } from "@/components/LegalPage";
import { getSiteContent } from "@/lib/content";

export default async function TermsPage() {
  const content = await getSiteContent();

  return (
    <LegalPage
      content={content}
      title="Terms"
      description="These terms describe the basic conditions for using the Webara website."
      sections={[
        {
          title: "Website information",
          body: "The content on this website is provided for general information about Webara services and does not represent a binding offer unless confirmed in writing."
        },
        {
          title: "Project inquiries",
          body: "Submitting a form or sending an email does not create a contract. Project scope, timeline, pricing, and responsibilities are agreed separately."
        },
        {
          title: "Intellectual property",
          body: "The Webara name, website design, text, visuals, and assets are protected and may not be copied or reused without permission."
        },
        {
          title: "Contact",
          body: `For questions about these terms, contact ${content.brand.legalName} at ${content.brand.email}.`
        }
      ]}
    />
  );
}
