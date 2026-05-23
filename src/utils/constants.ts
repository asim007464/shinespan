export const COMPANY = {
  name: "Shine & Span Cleaning Services Ltd",
  shortName: "Shine & Span",
  email: "cleaning@shinespan.co.uk",
  /** Opens default mail app — recipient prefilled; user adds message and taps Send */
  emailHref: "mailto:cleaning@shinespan.co.uk?subject=Cleaning%20service%20enquiry",
  phone: "07384 647705",
  phoneHref: "tel:+447384647705",
  whatsapp: "447384647705",
  whatsappMessage: "Hi, I want to book a cleaning service. Please assist me.",
  whatsappHref:
    "https://wa.me/447384647705?text=" +
    encodeURIComponent("Hi, I want to book a cleaning service. Please assist me."),
  region: "United Kingdom",
  addressLine: "Serving homes & businesses across the UK",
  hours: "Mon–Sat: 7:00–19:00 · Sun: 9:00–16:00",
  tagline: "Premium cleaning tailored for UK homes, offices & rentals.",
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
  { href: "/login", label: "Client Login" },
] as const;

export const SOCIAL_LINKS = [
  { label: "Facebook", href: "https://facebook.com", icon: "facebook" as const },
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" as const },
  { label: "Twitter / X", href: "https://twitter.com", icon: "twitter" as const },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" as const },
] as const;

/** Curated Unsplash images — cleaning / interiors */
export const IMAGES = {
  hero: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2400&q=85",
  heroSecondary:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85",
  trusted: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=1600&q=80",
  serviceHouse:
    "https://images.unsplash.com/photo-1584622781865-329ad147bb76?auto=format&fit=crop&w=1200&q=80",
  serviceDeep:
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80",
  serviceOffice:
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
  serviceAirbnb:
    "https://images.unsplash.com/photo-1596394516093-6629db9ada28?auto=format&fit=crop&w=1200&q=80",
  serviceTenancy:
    "https://images.unsplash.com/photo-1484154218962-a197022257cc?auto=format&fit=crop&w=1200&q=80",
  serviceCarpet:
    "https://images.unsplash.com/photo-1600166898405-da2576033f8a?auto=format&fit=crop&w=1200&q=80",
  serviceWindow:
    "https://images.unsplash.com/photo-1513694203232-6a0f6c21dd47?auto=format&fit=crop&w=1200&q=80",
  serviceMove:
    "https://images.unsplash.com/photo-1605276374104-deb2bcf0468f?auto=format&fit=crop&w=1200&q=80",
  whyChoose:
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
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
  ctaBanner:
    "https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&w=2000&q=80",
} as const;

export type ServiceItem = {
  readonly slug: string;
  readonly title: string;
  readonly description: string;
  readonly seoDescription: string;
  readonly details: readonly string[];
  readonly image: string;
};

export const SERVICES_LIST: readonly ServiceItem[] = [
  {
    slug: "house-cleaning",
    title: "House Cleaning",
    description:
      "Reliable home cleaning services for kitchens, bathrooms, and living spaces — consistently fresh.",
    seoDescription:
      "Our home cleaning services keep UK households spotless with professional cleaners on a schedule that suits you — ideal for busy families and working professionals.",
    details: [
      "Kitchen and bathroom sanitisation",
      "Dusting, vacuuming, and floor care",
      "Flexible weekly or fortnightly visits",
    ],
    image: IMAGES.serviceHouse,
  },
  {
    slug: "deep-cleaning",
    title: "Deep Cleaning",
    description:
      "Intensive deep cleaning services for appliances, detail areas, and a full property refresh.",
    seoDescription:
      "Book deep cleaning services when you need a top-to-bottom reset — our professional cleaners tackle built-up grime so your home feels newly refreshed.",
    details: [
      "Inside appliances and hard-to-reach areas",
      "Degreasing and detailed scrubbing",
      "Perfect before guests or seasonal resets",
    ],
    image: IMAGES.serviceDeep,
  },
  {
    slug: "office-cleaning",
    title: "Office Cleaning",
    description:
      "Discreet office cleaning after hours — desks, communal areas, and hygiene-focused washrooms.",
    seoDescription:
      "Office cleaning for UK workplaces: reliable crews, minimal disruption, and standards your team and clients will notice from day one.",
    details: [
      "Desks, meeting rooms, and reception areas",
      "Washroom restocking and sanitisation",
      "Out-of-hours or early-morning slots",
    ],
    image: IMAGES.serviceOffice,
  },
  {
    slug: "airbnb-cleaning",
    title: "Airbnb Cleaning",
    description:
      "Guest-ready turnovers aligned with check-ins — crisp linens and inventory-aware resets.",
    seoDescription:
      "Short-let and Airbnb cleaning with turnaround times built around your calendar — professional cleaners who protect your reviews and listing photos.",
    details: [
      "Linen change and staging",
      "Supply checks and quick damage reports",
      "Same-day turnover options where available",
    ],
    image: IMAGES.serviceAirbnb,
  },
  {
    slug: "end-of-tenancy",
    title: "End of Tenancy Cleaning",
    description:
      "Inventory-ready end of tenancy cleans — ovens, fixtures, and landlord checklist standards.",
    seoDescription:
      "End of tenancy cleaning designed to meet agent and landlord expectations across the UK — deposit-friendly finishes from experienced professional cleaners.",
    details: [
      "Oven, hob, and appliance detailing",
      "Bathrooms and fixtures descaled",
      "Checklist-aligned room-by-room scope",
    ],
    image: IMAGES.serviceTenancy,
  },
  {
    slug: "carpet-cleaning",
    title: "Carpet Cleaning",
    description:
      "Hot-water extraction and stain treatment for rugs, stairs, and fitted carpets.",
    seoDescription:
      "Professional carpet cleaning to lift stains and revive fibres — add to home cleaning services or book as a standalone treatment.",
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
      "Streak-free interior and exterior glass — frames and sills wiped for lasting clarity.",
    seoDescription:
      "Window cleaning for homes and commercial fronts — safe access methods and a finish that lets natural light back in.",
    details: [
      "Interior and exterior panes where accessible",
      "Frames, sills, and ledges wiped down",
      "Regular or one-off schedules",
    ],
    image: IMAGES.serviceWindow,
  },
  {
    slug: "move-in-out",
    title: "Move In / Move Out Cleaning",
    description:
      "Blank-slate handovers — cupboards cleared, surfaces sanitised, ready for keys or boxes.",
    seoDescription:
      "Move in / move out cleaning for stress-free handovers — combines deep cleaning services with empty-property focus for buyers, sellers, and tenants.",
    details: [
      "Inside cupboards and wardrobes",
      "Full property sanitisation",
      "Ideal paired with end of tenancy standards",
    ],
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
