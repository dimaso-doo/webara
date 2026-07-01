import { LegalPage } from "@/components/LegalPage";
import { getSiteContent } from "@/lib/content";

export default async function PrivacyPolicyPage() {
  const content = await getSiteContent();

  return (
    <LegalPage
      content={content}
      title="Privacy Policy"
      description="This page explains how Webara handles information submitted through the website."
      sections={[
        {
          title: "Information we collect",
          body: "When you contact Webara, we may collect your name, email address, phone number, and the message you submit through the contact form."
        },
        {
          title: "How we use information",
          body: "We use submitted information only to respond to your inquiry, discuss potential website work, and provide relevant follow-up."
        },
        {
          title: "Storage and protection",
          body: "Contact form submissions are stored for business communication purposes. We do not sell personal information or share it with unrelated third parties."
        },
        {
          title: "Contact",
          body: `For privacy questions, contact ${content.brand.legalName} at ${content.brand.email}.`
        }
      ]}
    />
  );
}
