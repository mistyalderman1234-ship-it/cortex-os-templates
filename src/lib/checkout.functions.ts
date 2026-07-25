import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getStripe } from "./stripe";

const PRICE_IDS = {
  starter: "price_1Tvt0DB7isxouPuKsuxmogKU",
  complete: "price_1Tvt0TB7isxouPuKE2weQGSb",
} as const;

const checkoutSchema = z.object({
  tier: z.enum(["starter", "complete"]),
});

function getCheckoutOrigin(): string {
  // Priority order for determining the origin
  if (process.env.APP_ORIGIN) {
    return process.env.APP_ORIGIN;
  }
  if (process.env.VITE_APP_URL) {
    return process.env.VITE_APP_URL;
  }
  // Vercel automatically provides VERCEL_URL in production
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  // Development and testing fallback
  return "https://cortex-os-templates.vercel.app";
}

export const createCheckoutSession = createServerFn({ method: "POST" })
  .validator((data) => checkoutSchema.parse(data))
  .handler(async ({ data }) => {
    const stripe = getStripe();
    const priceId = PRICE_IDS[data.tier];

    const origin = getCheckoutOrigin();

    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: priceId, quantity: 1 }],
      mode: "payment",
      success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/payment-canceled`,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      tax_id_collection: { enabled: true },
    });

    if (!session.url) {
      throw new Error("Failed to create checkout session");
    }

    return { url: session.url };
  });
