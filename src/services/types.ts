export type BookingPayload = {
  service: string;
  serviceType: string;
  roomCount: string;
  bathroomCount?: string;
  additionalServices: string[];
  additionalServicesNotes?: string;
  scheduledAt: string;
  preferredDate: string;
  preferredTime: string;
  address: string;
  message: string;
  jobNotes?: string;
  attachmentNames?: string[];
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  source: "shine-span-web";
  createdAt: string;
};

export type BookingApiResponse = {
  ok: boolean;
  reference?: string;
  message?: string;
  forwarded?: boolean;
};

export type ChatInquiryPayload = {
  id: string;
  cleaningType?: string;
  budget?: string;
  date?: string;
  location?: string;
  messages: { role: "user" | "assistant"; text: string; at: string }[];
  createdAt: string;
};

export type Review = {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  date: string;
  published?: boolean;
};
