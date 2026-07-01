"use client";

import { useEffect } from "react";

const revealSelector = [
  ".hero-copy",
  ".hero-media",
  ".section-heading",
  ".intro-band > div",
  ".intro-band > p",
  ".about-photo",
  ".about-copy",
  ".page-link-card",
  ".feature-card",
  ".process-item",
  ".price-card",
  ".faq-list details",
  ".contact-panel",
  ".contact-form-panel",
  ".map-panel",
  ".final-cta > div",
  ".footer-main > *"
].join(",");

export function ScrollReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(revealSelector));

    elements.forEach((element, index) => {
      element.classList.add("reveal");
      element.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 70}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.14 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return null;
}
