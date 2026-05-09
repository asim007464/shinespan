export type BookingPayload = {
  service: string;
  propertyType: string;
  rooms: string;
  scheduledAt: string;
  address: string;
  instructions: string;
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
