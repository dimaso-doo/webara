"use client";

import { Send } from "lucide-react";
import { useState } from "react";

type FormState = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        message: formData.get("message")
      })
    });

    if (!response.ok) {
      setState("error");
      return;
    }

    form.reset();
    setState("sent");
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <div className="field-grid">
        <label>
          Name
          <input name="name" placeholder="Your name" required />
        </label>
        <label>
          Email
          <input name="email" placeholder="you@example.com" required type="email" />
        </label>
      </div>
      <label>
        Phone
        <input name="phone" placeholder="Phone number" />
      </label>
      <label>
        Message
        <textarea
          name="message"
          placeholder="Tell us what kind of website you need."
          required
          rows={6}
        />
      </label>
      <button className="primary-button" disabled={state === "sending"} type="submit">
        <Send size={17} />
        {state === "sending" ? "Sending..." : "Send message"}
      </button>
      {state === "sent" ? <p className="form-success">Message received. We will get back to you soon.</p> : null}
      {state === "error" ? <p className="form-error">Something went wrong. Please email us directly.</p> : null}
    </form>
  );
}
