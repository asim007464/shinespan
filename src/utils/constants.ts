export const COMPANY = {
  name: "Shine & Span Cleaning Services Ltd",
  shortName: "Shine & Span",
  email: "cleaning@shinespan.co.uk",
  phone: "07384 647705",
  phoneHref: "tel:+447384647705",
  region: "United Kingdom",
  addressLine: "Serving homes & businesses across the UK",
  hours: "Mon–Sat: 7:00–19:00 · Sun: 9:00–16:00",
  tagline: "Premium cleaning tailored for UK homes, offices & rentals.",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/booking", label: "Book" },
  { href: "/contact", label: "Contact" },
] as const;

export const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://facebook.com", icon: "facebook" as const },
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" as const },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" as const },
];

/** Curated Unsplash images — cleaning / interiors */
export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=2400&q=80",
  trusted: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=1600&q=80",
  serviceHouse:
    "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80",
  serviceDeep:
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1200&q=80",
  serviceOffice:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
  serviceAirbnb:
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
  serviceTenancy:
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
  serviceCarpet:
    "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=1200&q=80",
  serviceWindow:
    "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80",
  serviceMove:
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  whyChoose:
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
  before:
    "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=1400&q=80",
  after:
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80",
  team1:
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  team2:
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
  team3:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
  aboutHero:
    "https://images.unsplash.com/photo-1556912173-46f337c7fd42?auto=format&fit=crop&w=2000&q=80",
  ctaBanner:
    "https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=2000&q=80",
} as const;

export const SERVICES_LIST = [
  {
    slug: "house-cleaning",
    title: "House Cleaning",
    description:
      "Weekly or fortnightly upkeep — kitchens, bathrooms, living spaces — consistently spotless.",
    image: IMAGES.serviceHouse,
  },
  {
    slug: "deep-cleaning",
    title: "Deep Cleaning",
    description:
      "Top-to-bottom refresh for accumulated grime, appliances, and detail areas ready for guests.",
    image: IMAGES.serviceDeep,
  },
  {
    slug: "office-cleaning",
    title: "Office Cleaning",
    description:
      "Quiet, reliable crews after hours — desks, communal areas, and hygiene-focused washrooms.",
    image: IMAGES.serviceOffice,
  },
  {
    slug: "airbnb-cleaning",
    title: "Airbnb Cleaning",
    description:
      "Turnovers aligned with check-ins — linen-ready finishes and inventory-aware resets.",
    image: IMAGES.serviceAirbnb,
  },
  {
    slug: "end-of-tenancy",
    title: "End of Tenancy Cleaning",
    description:
      "Inventory-ready standards — ovens, appliances, and fixtures checked against landlord lists.",
    image: IMAGES.serviceTenancy,
  },
  {
    slug: "carpet-cleaning",
    title: "Carpet Cleaning",
    description:
      "Hot-water extraction and stain treatment for high-traffic rugs and fitted carpets.",
    image: IMAGES.serviceCarpet,
  },
  {
    slug: "window-cleaning",
    title: "Window Cleaning",
    description:
      "Streak-free interior & exterior glass — frames and sills wiped for lasting clarity.",
    image: IMAGES.serviceWindow,
  },
  {
    slug: "move-in-out",
    title: "Move In / Move Out Cleaning",
    description:
      "Blank-slate handovers — cupboards cleared, surfaces sanitised, ready for keys or boxes.",
    image: IMAGES.serviceMove,
  },
] as const;

export const FAQ_ITEMS = [
  {
    q: "Are you insured and DBS-checked?",
    a: "Yes — full public liability insurance and vetted team members for peace of mind.",
  },
  {
    q: "Do you bring equipment and products?",
    a: "We arrive fully equipped with professional-grade tools and eco-conscious supplies.",
  },
  {
    q: "Which areas do you cover?",
    a: "We serve residential and commercial clients across the UK — confirm postcode at booking.",
  },
  {
    q: "Can I reschedule?",
    a: "Absolutely — contact us or reply to your confirmation at least 24 hours ahead.",
  },
] as const;
