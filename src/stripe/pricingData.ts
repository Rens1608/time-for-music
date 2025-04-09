import { Price } from "@/types/price";

export const pricingData: Price[] = [
  {
    id: "price_1NQk5TLtGdPVhGLecVfQ7mn0",
    unit_amount: 100 * 9.99,
    nickname: "Basic",
    offers: [
      "Generate cards with song titles, artists, release years, and scannable QR codes",
      "Maximum of 200 cards",
      "Access to our intuitive app",
      "Export a neatly formatted PDF for easy printing or sharing",
    ],
    button_text: "Buy now",
    is_enabled: true,
  },
  {
    id: "price_1NQk5TLtGdPVhGLecVfQ7mn0",
    unit_amount: 100 * 14.99,
    nickname: "Custom",
    offers: [
      "Everything in the Basic Package",
      "Add personalized backgrounds to your generated cards for a unique touch",
      "Ideal for events, parties, or personalized gifts",
    ],
    button_text: "Buy now",
    is_enabled: false,
  },
];
