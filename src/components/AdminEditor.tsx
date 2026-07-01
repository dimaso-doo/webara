"use client";

import { Bot, Save, Send, Sparkles } from "lucide-react";
import { useState } from "react";
import type { FaqItem, PackageItem, SiteContent, TextItem } from "@/lib/types";

type ChatMessage = {
  role: "assistant" | "user";
  text: string;
};

const adminSections = [
  { id: "home", label: "Home", path: "/" },
  { id: "about", label: "About", path: "/about" },
  { id: "services", label: "Services", path: "/services" },
  { id: "process", label: "Process", path: "/process" },
  { id: "packages", label: "Packages", path: "/packages" },
  { id: "faq", label: "FAQ", path: "/faq" },
  { id: "contact", label: "Contact", path: "/contact" }
];

const quickPrompts = [
  "Make the hero copy more sales-focused",
  "Change about bio to Sandra leads Webara with a calm, practical approach to AI-powered websites for growing businesses.",
  "Change address to Stanislava Majorosa 47, 21000 Novi Sad, Serbia",
  "Add service: AI chatbot - A chatbot that answers visitors' most common questions.",
  "Add FAQ: Do you offer SEO? Answer: Yes, every website includes a basic SEO structure.",
  "Change CTA title to Ready for a website that works for you?"
];

export function AdminEditor({ initialContent }: { initialContent: SiteContent }) {
  const [content, setContent] = useState(initialContent);
  const [status, setStatus] = useState("");
  const [saving, setSaving] = useState(false);
  const [aiInput, setAiInput] = useState("");
  const [activeSection, setActiveSection] = useState(adminSections[0]);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Hi, I am Webara AI. Tell me what you want to change on the website."
    }
  ]);

  async function save() {
    setSaving(true);
    setStatus("");

    const response = await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content)
    });

    setSaving(false);
    setStatus(response.ok ? "Saved." : "Not saved. Please check your login.");
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/admin?login=1";
  }

  function runAiInstruction(instruction: string) {
    const cleanInstruction = instruction.trim();

    if (!cleanInstruction) {
      return;
    }

    const result = applyAiInstruction(content, cleanInstruction, activeSection.id);
    setContent(result.content);
    setMessages((current) => [
      ...current,
      { role: "user", text: cleanInstruction },
      { role: "assistant", text: result.message }
    ]);
    setAiInput("");
  }

  function submitAiInstruction(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    runAiInstruction(aiInput);
  }

  return (
    <main className="admin-shell">
      <div className="admin-topbar">
        <div>
          <span className="section-kicker">Webara admin</span>
          <h1>AI chat</h1>
        </div>
        <div className="admin-actions">
          <a className="secondary-button" href="/" target="_blank">
            Open website
          </a>
          <button className="secondary-button" onClick={logout} type="button">
            Log out
          </button>
          <button className="primary-button" disabled={saving} onClick={save} type="button">
            <Save size={17} />
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <div className="admin-studio">
        <section className="admin-panel ai-panel">
          <div className="ai-panel-heading">
            <div className="ai-orb">
              <Bot size={24} />
            </div>
            <div>
              <span className="section-kicker">{activeSection.label} context</span>
              <h2>Webara AI chat</h2>
            </div>
          </div>

          {status ? <p className="save-status">{status}</p> : null}

          <div className="section-switcher" aria-label="Admin section context">
            {adminSections.map((section) => (
              <button
                aria-pressed={activeSection.id === section.id}
                key={section.id}
                onClick={() => setActiveSection(section)}
                type="button"
              >
                {section.label}
              </button>
            ))}
          </div>

          <div className="chat-window">
            {messages.map((message, index) => (
              <div className={`chat-message ${message.role}`} key={`${message.role}-${index}`}>
                {message.text}
              </div>
            ))}
          </div>

          <div className="quick-prompts">
            {quickPrompts.map((prompt) => (
              <button key={prompt} onClick={() => runAiInstruction(prompt)} type="button">
                <Sparkles size={15} />
                {prompt}
              </button>
            ))}
          </div>

          <form className="ai-input-row" onSubmit={submitAiInstruction}>
            <input
              aria-label="AI instruction"
              placeholder={`Ask AI to change ${activeSection.label.toLowerCase()}...`}
              value={aiInput}
              onChange={(event) => setAiInput(event.target.value)}
            />
            <button className="primary-button" type="submit">
              <Send size={17} />
              Apply
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

function applyAiInstruction(content: SiteContent, instruction: string, section = "home") {
  const lower = normalize(instruction);
  const next: SiteContent = structuredClone(content);

  if (
    lower.includes("hero") &&
    (lower.includes("sales") ||
      lower.includes("sales-focused") ||
      lower.includes("professional"))
  ) {
    next.hero.title = "A website that turns your business into more inquiries";
    next.hero.subtitle =
      "Webara uses AI to speed up production, while human design and strategy make your offer clear, build trust, and guide visitors toward contact.";
    next.hero.primaryCta = "Book a free consultation";
    return {
      content: next,
      message: `I made the hero section more sales-focused while you were editing ${section}. Click Save when ready.`
    };
  }

  if (lower.includes("add service")) {
    const parsed = parseTitleDescription(instruction, "add service");
    next.services = [...next.services, parsed];
    return {
      content: next,
      message: `I added a new service: ${parsed.title}.`
    };
  }

  if (
    lower.includes("add process") ||
    lower.includes("add step")
  ) {
    const parsed = parseTitleDescription(
      instruction,
      lower.includes("add process") ? "add process" : "add step"
    );
    next.process = [...next.process, parsed];
    return {
      content: next,
      message: `I added a new process step: ${parsed.title}.`
    };
  }

  if (lower.includes("add faq") || lower.includes("add question")) {
    const parsed = parseFaq(instruction);
    next.faq = [...next.faq, parsed];
    return {
      content: next,
      message: `I added an FAQ question: ${parsed.question}`
    };
  }

  if (lower.includes("add package")) {
    const parsed = parsePackage(instruction);
    next.packages = [...next.packages, parsed];
    return {
      content: next,
      message: `I added a package: ${parsed.name}.`
    };
  }

  const email = readValue(instruction, ["change email to", "set email to"]);
  if (email) {
    next.brand.email = email;
    return { content: next, message: `I changed the email to ${email}.` };
  }

  const phone = readValue(instruction, ["change phone to", "set phone to"]);
  if (phone) {
    next.brand.phone = phone;
    return { content: next, message: `I changed the phone number to ${phone}.` };
  }

  const legalName = readValue(instruction, ["change legal name to", "set legal name to", "change company name to"]);
  if (legalName) {
    next.brand.legalName = legalName;
    return { content: next, message: `I changed the legal name to ${legalName}.` };
  }

  const address = readValue(instruction, ["change address to", "set address to"]);
  if (address) {
    next.brand.address = address;
    return { content: next, message: `I changed the address to ${address}.` };
  }

  const aboutTitle = readValue(instruction, ["change about title to", "about title to"]);
  if (aboutTitle) {
    next.about.title = aboutTitle;
    return { content: next, message: "I changed the About section title." };
  }

  const aboutBio = readValue(instruction, ["change about bio to", "about bio to", "change about description to"]);
  if (aboutBio) {
    next.about.description = aboutBio;
    return { content: next, message: "I changed the About section bio." };
  }

  const ownerRole = readValue(instruction, ["change owner role to", "owner role to"]);
  if (ownerRole) {
    next.about.role = ownerRole;
    return { content: next, message: "I changed the owner role." };
  }

  const ctaTitle = readValue(instruction, ["change cta title to", "cta title to"]);
  if (ctaTitle) {
    next.cta.title = ctaTitle;
    return { content: next, message: "I changed the final CTA title." };
  }

  const ctaDescription = readValue(instruction, ["change cta description to", "cta description to"]);
  if (ctaDescription) {
    next.cta.description = ctaDescription;
    return { content: next, message: "I changed the final CTA description." };
  }

  const ctaButton = readValue(instruction, ["change cta button to", "cta button to"]);
  if (ctaButton) {
    next.cta.button = ctaButton;
    return { content: next, message: "I changed the CTA button text." };
  }

  const heroTitle = readValue(instruction, ["change hero title to", "hero title to", "change title to"]);
  if (heroTitle) {
    next.hero.title = heroTitle;
    return { content: next, message: "I changed the hero title." };
  }

  const heroSubtitle = readValue(instruction, [
    "change hero subtitle to",
    "hero subtitle to",
    "change subtitle to"
  ]);
  if (heroSubtitle) {
    next.hero.subtitle = heroSubtitle;
    return { content: next, message: "I changed the hero subtitle." };
  }

  const primaryCta = readValue(instruction, ["change primary button to", "primary button to"]);
  if (primaryCta) {
    next.hero.primaryCta = primaryCta;
    return { content: next, message: "I changed the primary hero button." };
  }

  return {
    content,
    message:
      "I am not sure what to change. Try this format: Change hero title to..., Add service: title - description, Add FAQ: question? Answer: text, or Change email to..."
  };
}

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function readValue(instruction: string, markers: string[]) {
  const lower = normalize(instruction);

  for (const marker of markers) {
    const index = lower.indexOf(marker);
    if (index >= 0) {
      return instruction.slice(index + marker.length).replace(/^[:\-\s]+/, "").trim();
    }
  }

  return "";
}

function parseTitleDescription(instruction: string, marker: string): TextItem {
  const raw = readValue(instruction, [marker]);
  const [title, ...descriptionParts] = raw.split(/\s+-\s+|:\s+/);
  const description = descriptionParts.join(" - ").trim();

  return {
    title: title?.trim() || "New item",
    description: description || "You can refine this description with another AI instruction."
  };
}

function parseFaq(instruction: string): FaqItem {
  const raw = readValue(instruction, ["add faq", "add question"]);
  const [questionPart, answerPart] = raw.split(/answer\s*:/i);
  const question = questionPart.replace(/[:\s]+$/, "").trim();

  return {
    question: question || "New question?",
    answer: answerPart?.trim() || "You can refine the answer with another AI instruction."
  };
}

function parsePackage(instruction: string): PackageItem {
  const raw = readValue(instruction, ["add package"]);
  const [namePart, restPart] = raw.split(/\s+-\s+/);
  const [pricePart, descriptionPart] = (restPart || "").split(/\s*;\s*/);

  return {
    name: namePart?.replace(/^[:\s]+/, "").trim() || "New package",
    price: pricePart?.trim() || "custom quote",
    description: descriptionPart?.trim() || "You can refine this package description with another AI instruction.",
    features: ["You can refine package features with another AI instruction"]
  };
}
