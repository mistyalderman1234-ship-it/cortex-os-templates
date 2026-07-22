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

export const createCheckoutSession = createServerFn({ method: "POST" })
  .validator((data) => checkoutSchema.parse(data))
  .handler(async ({ data }) => {
    const stripe = getStripe();
    const priceId = PRICE_IDS[data.tier];

    const origin = process.env.APP_ORIGIN ?? "https://cortex-os-templates.lovable.app";

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
