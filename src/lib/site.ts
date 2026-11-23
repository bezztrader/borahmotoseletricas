export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const WA_NUMBER = "5521980497952";
/** WhatsApp deep link with a prefilled message. */
export const wa = (text: string) => `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

export const WHATSAPP_URL =
  "https://wa.me/5521980497952?text=Ol%C3%A1!%20Vim%20pelo%20site%20e%20quero%20agendar%20um%20test%20ride";
export const PHONE_DISPLAY = "(21) 98049-7952";
export const PHONE_TEL = "+5521980497952";
export const INSTAGRAM_URL = "https://www.instagram.com/boraheletricajpa/";
export const INSTAGRAM_HANDLE = "@boraheletricajpa";
export const MAPS_EMBED_URL =
  "https://www.google.com/maps?q=Estrada+dos+Tr%C3%AAs+Rios,+670+-+Freguesia,+Jacarepagu%C3%A1,+Rio+de+Janeiro&output=embed";
export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Estrada+dos+Tr%C3%AAs+Rios+670+Freguesia+Jacarepagu%C3%A1+Rio+de+Janeiro";

export const ADDRESS = {
  street: "Estrada dos Três Rios, 670",
  district: "Freguesia, Jacarepaguá",
  city: "Rio de Janeiro",
  region: "RJ",
};

export const HOURS = [
  { label: "Segunda a sábado", time: "10h às 19h" },
  { label: "Domingo", time: "Fechado" },
];

export interface Model {
  id: string;
  name: string;
  tag: string;
  /** 0–1, only drives the power meter graphic */
  power: number;
  specs: { label: string; value: string }[];
  /** drop a real photo in public/images/modelos/ and set its path here */
  photo?: string;
}

/**
 * Models the store advertises. Specs marked [preencher] are placeholders for
 * the owner; add more entries to grow the carousel. No prices on this site.
 */
export const MODELS: Model[] = [
  {
    id: "x13",
    name: "X13",
    tag: "A queridinha da loja",
    power: 1,
    specs: [
      { label: "Motor", value: "1000W" },
      { label: "Autonomia", value: "[preencher]" },
      { label: "Velocidade", value: "[preencher]" },
    ],
  },
  {
    id: "t-max",
    name: "T Max",
    tag: "[preencher destaque]",
    power: 0.8,
    specs: [
      { label: "Motor", value: "[preencher]" },
      { label: "Autonomia", value: "[preencher]" },
      { label: "Velocidade", value: "[preencher]" },
    ],
  },
  {
    id: "borah-max",
    name: "Borah Max",
    tag: "[preencher destaque]",
    power: 0.9,
    specs: [
      { label: "Motor", value: "[preencher]" },
      { label: "Autonomia", value: "[preencher]" },
      { label: "Velocidade", value: "[preencher]" },
    ],
  },
];

export const SERVICES = [
  { name: "Venda", text: "Motos, scooters e bikes elétricas pra testar antes de levar." },
  { name: "Manutenção e assistência técnica", text: "Oficina na própria loja. Sem mandar sua moto pra longe." },
  { name: "Suporte pós-venda", text: "Comprou, continua com a gente. Dúvida, revisão, ajuste." },
  { name: "Blindagem de pneu", text: "Em parceria com a Blin Max. Furou, continua rodando." },
];
