export const COMPANY = {
  name: "Opal Shine Cleaning Services Ltd",
  shortName: "Opal Shine Cleaning Services Ltd",
  email: "cleaning@opalshine.co.uk",
  /** @deprecated Prefer getStandardMailtoHref() or EmailContactLink, kept for metadata */
  emailHref:
    "mailto:cleaning@opalshine.co.uk?subject=Cleaning%20service%20enquiry&body=Hello%0A%0A",
  phone: "07722 127681",
  phoneHref: "tel:+447722127681",
  whatsapp: "447722127681",
  whatsappMessage: "Hi, I want to book a cleaning service. Please assist me.",
  whatsappHref:
    "https://wa.me/447722127681?text=" +
    encodeURIComponent("Hi, I want to book a cleaning service. Please assist me."),
  region: "London",
  addressLine: "Serving homes & businesses across London",
  hours: "8am to 8pm · 7 days a week",
  tagline: "Premium cleaning tailored for London homes, offices & apartments.",
  icoRegistrationNumber: "ZC088627",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;

export const FOOTER_QUICK_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/booking", label: "Book Now" },
  { href: "/contact", label: "Contact" },
] as const;

export const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/share/1UnMSMQz23/?mibextid=wwXIfr",
    icon: "facebook" as const,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/shine_span_cleaning_services?utm_source=qr",
    icon: "instagram" as const,
  },
  {
    label: "WhatsApp",
    href: COMPANY.whatsappHref,
    icon: "whatsapp" as const,
  },
] as const;

/** Curated Unsplash images, cleaning / interiors */
export const IMAGES = {
  logo: "/044136e1-d1df-4180-a74b-71ad19838484.png",
  hero: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2400&q=85",
  heroBackground: "/04530c7a-df8c-4c31-85ae-3f96a006c696.png",
  heroSecondary:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
  trusted: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=1600&q=80",
  serviceHouse: "/services/housecleaning.png",
  serviceDeep: "/9bfc1080-0f05-4281-a9d8-483b9bafc918.png",
  serviceOffice: "/92bb565e-f3e0-42dc-9ad2-8650fec99af6.png",
  serviceAirbnb: "/services/airbnb-cleaning.jpg",
  serviceTenancy: "/moveinout.webp",
  serviceCarpet: "/carpetcleaning.png",
  serviceWindow: "/windowcleaning.png",
  serviceMedical: "/gpimageremovecloth.png",
  serviceDental: "/gpcleaning.png",
  dentalPracticePromo: "/gpcleaning.png",
  /** Couple carrying moving boxes into a home */
  whyChoose: "/911b1872-f2c9-4d2b-a12f-06ed5946d368.png",
  beforeAfterBefore: "/dirtyroom.png",
  beforeAfterAfter: "/cleanroom.png",
  team1:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  team2:
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
  team3:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
  aboutHero:
    "https://images.unsplash.com/photo-1556912173-46f337c7fd42?auto=format&fit=crop&w=2000&q=80",
  /** Support worker with headset speaking with a customer */
  ctaBanner: "/contact-cta-banner.jpg",
} as const;

export type ServiceFocusArea = {
  readonly title: string;
  readonly description: string;
};

export type ServiceTrustBadge = {
  readonly title: string;
  readonly description?: string;
};

export type ServiceFeaturedTheme = "medical" | "dental";

export type ServiceFeaturedContent = {
  readonly theme: ServiceFeaturedTheme;
  readonly badgeLabel: string;
  readonly bookLabel: string;
  readonly imageAlt: string;
  readonly tagline: string;
  readonly subtitle?: string;
  readonly values: readonly string[];
  readonly headline: string;
  readonly intro: string;
  readonly focusAreas: readonly ServiceFocusArea[];
  readonly servingTitle?: string;
  readonly servingItems?: readonly string[];
  readonly trustBadges?: readonly ServiceTrustBadge[];
  readonly promoImage?: string;
};

export type ServiceItem = {
  readonly slug: string;
  readonly title: string;
  /** Shorter label for service cards (optional) */
  readonly cardTitle?: string;
  readonly cardSubtitle?: string;
  /** Label for booking dropdown only (optional) */
  readonly selectLabel?: string;
  readonly description: string;
  readonly seoDescription: string;
  readonly details: readonly string[];
  readonly image: string;
  readonly featured?: ServiceFeaturedContent;
};

export const SERVICES_LIST: readonly ServiceItem[] = [
  {
    slug: "gp-surgery-medical-cleaning",
    title: "GP Surgery & Other Medical Services",
    description:
      "Trusted cleaning and disinfecting for GP surgeries and medical spaces. Professional, reliable, hygienic.",
    seoDescription:
      "Delivering exceptional cleaning and disinfecting standards for healthcare environments across London, reception, consulting rooms, waiting areas, and washrooms.",
    details: [
      "Consulting room cleaning and disinfecting",
      "Reception and waiting area cleaning and disinfecting",
      "Washroom disinfecting and high-touch surface cleaning",
      "Out-of-hours visits to limit disruption",
    ],
    image: IMAGES.serviceMedical,
  },
  {
    slug: "dental-practice-cleaning",
    title: "Dental Practices",
    description:
      "Specialist cleaning for dental practices. Reliable, discreet, hygienic, and professional.",
    seoDescription:
      "High-standard cleaning tailored for dental practices across London, surgery rooms, reception, sterilisation areas, and patient facilities with fully vetted, DBS-checked cleaners.",
    details: [
      "Surgery room cleaning and disinfecting",
      "Reception and waiting area cleaning",
      "Disinfection of contaminated zones",
      "Patient washrooms and staff facilities",
      "Evening and weekend visits to avoid clinic downtime",
    ],
    image: IMAGES.serviceDental,
    featured: {
      theme: "dental",
      badgeLabel: "Dental cleaning",
      bookLabel: "Book dental practice cleaning",
      imageAlt: "Opal Shine Cleaning Services Ltd specialist cleaning for dental practices",
      tagline: "Reliable · Discreet · Hygienic · Professional",
      values: ["Reliable", "Discreet", "Hygienic", "Professional"],
      headline: "Specialist Cleaning for Dental Practices",
      intro: "High-standard cleaning tailored for dental practices you can trust.",
      focusAreas: [
        {
          title: "Surgery room cleaning & disinfecting",
          description:
            "Dental chairs, lights, surfaces, and equipment touchpoints cleaned to clinical standards.",
        },
        {
          title: "Reception & waiting area cleaning",
          description:
            "Patient-facing areas kept spotless, seating, counters, and shared touchpoints sanitised.",
        },
        {
          title: "Sterilisation & decontamination zones",
          description:
            "Decontamination areas, washrooms, and high-touch surfaces disinfected throughout.",
        },
      ],
      trustBadges: [
        { title: "Professionally trained" },
        { title: "Fully vetted" },
        { title: "DBS checked" },
        { title: "Fully insured" },
      ],
      servingTitle: "Serving dental practices",
      servingItems: [
        "General dental practices",
        "Orthodontic clinics",
        "Hygienist suites",
        "Cosmetic dentistry",
        "Multi-chair surgeries",
        "Other dental premises",
      ],
      promoImage: IMAGES.dentalPracticePromo,
    },
  },
  {
    slug: "regular-cleaning",
    title: "Regular Cleaning",
    selectLabel: "Regular Cleaning (residential / commercial)",
    description:
      "Reliable regular cleaning for kitchens, bathrooms, and living spaces, consistently fresh.",
    seoDescription:
      "Our regular cleaning services keep London households spotless with professional cleaners on a schedule that suits you, ideal for busy families and working professionals.",
    details: [
      "Kitchen and bathroom sanitisation",
      "Dusting, vacuuming, and floor care",
      "Flexible visits",
    ],
    image: IMAGES.serviceHouse,
  },
  {
    slug: "deep-cleaning",
    title: "Deep Cleaning",
    selectLabel: "Deep Cleaning (residential / commercial)",
    description:
      "Intensive deep cleaning services for appliances, detail areas, and a full property refresh.",
    seoDescription:
      "Book deep cleaning services when you need a top-to-bottom reset, our professional cleaners tackle built-up grime so your home feels newly refreshed.",
    details: [
      "Inside appliances and hard-to-reach areas",
      "Degreasing and detailed scrubbing",
      "Bathroom and kitchen hard areas, tiles, grout, and built-up grime",
      "Perfect before guests or seasonal resets",
    ],
    image: IMAGES.serviceDeep,
  },
  {
    slug: "end-of-tenancy",
    title: "End of Tenancy Cleaning (Move In / Move Out Cleaning)",
    cardTitle: "End of Tenancy Cleaning",
    cardSubtitle: "Move in / move out",
    description:
      "Professional end of tenancy cleaning to leave your property spotless, fresh, and ready for inspection.",
    seoDescription:
      "Professional end of tenancy and move in / move out cleaning across London for tenants, landlords, and letting agents, deep-cleaned, sanitised, and ready for inspection.",
    details: [
      "Every room deep-cleaned, sanitised, and ready for final inspection",
      "Reliable service for tenants, landlords, and letting agents",
      "Kitchens and bathrooms clean, fresh, and move-in ready",
    ],
    image: IMAGES.serviceTenancy,
  },
  {
    slug: "airbnb-cleaning",
    title: "Airbnb Cleaning",
    description:
      "Guest-ready turnovers aligned with check-ins, crisp linens and inventory-aware resets.",
    seoDescription:
      "Short-let and Airbnb cleaning with turnaround times built around your calendar, professional cleaners who protect your reviews and listing photos.",
    details: [
      "Kitchen cleaning, worktops, appliances, and floors",
      "Bathroom cleaning, sanitised fixtures and surfaces",
      "Bedrooms and living rooms, dusted, vacuumed, and guest-ready",
      "Linen change and staging",
      "Same-day turnover options where available",
    ],
    image: IMAGES.serviceAirbnb,
  },
  {
    slug: "office-cleaning",
    title: "Office Cleaning",
    description:
      "Discreet office cleaning when your workplace is quiet, desks, communal areas, and hygiene-focused washrooms.",
    seoDescription:
      "Office cleaning for London workplaces: reliable cleaners, minimal disruption, and standards your team and clients will notice from day one.",
    details: [
      "Desks, meeting rooms, and reception areas",
      "Washroom restocking and sanitisation",
      "Flexible slots, 8am to 8pm",
    ],
    image: IMAGES.serviceOffice,
  },
  {
    slug: "carpet-cleaning",
    title: "Carpet Cleaning",
    description:
      "Hot-water extraction and stain treatment for rugs, stairs, and fitted carpets.",
    seoDescription:
      "Professional carpet cleaning to lift stains and revive fibres, add to home cleaning services or book as a standalone treatment.",
    details: [
      "Stain assessment and pre-treatment",
      "Deep extraction for fitted carpets",
      "Faster drying with professional equipment",
    ],
    image: IMAGES.serviceCarpet,
  },
  {
    slug: "window-cleaning",
    title: "Window Cleaning",
    description:
      "Streak-free interior and exterior glass, frames and sills wiped for lasting clarity.",
    seoDescription:
      "Window cleaning for homes and commercial fronts, safe access methods and a finish that lets natural light back in.",
    details: [
      "Interior and exterior panes where accessible",
      "Frames, sills, and ledges wiped down",
      "Regular or one-off schedules",
    ],
    image: IMAGES.serviceWindow,
  },
] as const;

export type FooterServiceLink = {
  readonly label: string;
  readonly href: string;
};

export const FOOTER_SERVICE_LINKS: readonly FooterServiceLink[] = SERVICES_LIST.flatMap((s) => {
  if (s.slug === "regular-cleaning" || s.slug === "deep-cleaning") return [];

  const link: FooterServiceLink = {
    label: s.title,
    href: `/booking?service=${encodeURIComponent(s.title)}`,
  };

  if (s.slug === "dental-practice-cleaning") {
    return [
      link,
      { label: "Domestic Cleaning", href: "/services?category=domestic" },
      { label: "Commercial Cleaning", href: "/services?category=commercial" },
    ];
  }

  return [link];
});

export const FAQ_ITEMS = [
  {
    q: "Are you insured and DBS-checked?",
    a: "Yes, full public liability insurance and vetted team members for peace of mind.",
  },
  {
    q: "Do you bring equipment and products?",
    a: "Unless you have your own cleaning liquids, hoover, mop and bucket, we can provide them for an additional cost.",
  },
  {
    q: "Which areas do you cover?",
    a: "We serve residential and commercial clients across London, confirm your postcode at booking.",
  },
  {
    q: "Can I reschedule?",
    a: "Absolutely, contact us or reply to your confirmation at least 24 hours ahead.",
  },
] as const;
