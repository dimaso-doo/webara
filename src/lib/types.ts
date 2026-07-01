export type TextItem = {
  title: string;
  description: string;
};

export type PackageItem = {
  name: string;
  price: string;
  description: string;
  features: string[];
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type SiteContent = {
  brand: {
    name: string;
    legalName: string;
    tagline: string;
    email: string;
    phone: string;
    address: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  stats: {
    value: string;
    label: string;
  }[];
  about: {
    kicker: string;
    title: string;
    name: string;
    role: string;
    description: string;
    ownerNote: string;
    signature: string;
    image: string;
  };
  services: TextItem[];
  process: TextItem[];
  packages: PackageItem[];
  faq: FaqItem[];
  cta: {
    title: string;
    description: string;
    button: string;
  };
};
