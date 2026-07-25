import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getStripe } from "./stripe";

const PRICE_IDS = {
  starter: "price_1Tvt0DB7isxouPuKsuxmogKU",
  complete: "price_1Tvt0TB7isxouPuKE2weQGSb",
} as const;

const checkoutSchema = z.object({
  tier: z.enum(["starter", "complete"]),
  email: z.string().email().optional(),
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

/**
 * Validates checkout request data
 */
function validateCheckoutRequest(
  tier: string,
  email?: string
): { tier: "starter" | "complete"; email?: string } {
  try {
    return checkoutSchema.parse({ tier, email });
  } catch (error) {
    throw new Error("Invalid checkout parameters");
  }
}

/**
 * Creates a Stripe checkout session
 */
export const createCheckoutSession = createServerFn({ method: "POST" })
  .validator((data) => checkoutSchema.parse(data))
  .handler(async ({ data }) => {
    try {
      const stripe = getStripe();
      const priceId = PRICE_IDS[data.tier];

      if (!priceId) {
        throw new Error(`Invalid tier: ${data.tier}`);
      }

      const origin = getCheckoutOrigin();

      const sessionData: Parameters<typeof stripe.checkout.sessions.create>[0] = {
        line_items: [{ price: priceId, quantity: 1 }],
        mode: "payment",
        success_url: `${origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/payment-canceled`,
        allow_promotion_codes: true,
        billing_address_collection: "auto",
        tax_id_collection: { enabled: true },
      };

      // Add email if provided for pre-filling
      if (data.email) {
        sessionData.customer_email = data.email;
      }

      const session = await stripe.checkout.sessions.create(sessionData);

      if (!session.url) {
        throw new Error("Failed to generate checkout URL");
      }

      return {
        url: session.url,
        sessionId: session.id,
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to create checkout session";
      console.error("Checkout error:", message);
      throw new Error(message);
    }
  });

/**
 * Retrieves checkout session details
 */
export const getCheckoutSession = createServerFn({ method: "GET" })
  .validator((data: unknown) => {
    if (typeof data !== "string") {
      throw new Error("Session ID must be a string");
    }
    return data;
  })
  .handler(async ({ data: sessionId }) => {
    try {
      const stripe = getStripe();
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      return {
        id: session.id,
        status: session.status,
        payment_status: session.payment_status,
        customer_email: session.customer_details?.email,
        amount_total: session.amount_total,
        currency: session.currency,
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to retrieve session";
      console.error("Session retrieval error:", message);
      throw new Error(message);
    }
  });

/**
 * Cancels a checkout session (for user-initiated cancellations)
 */
export const cancelCheckoutSession = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    if (typeof data !== "string") {
      throw new Error("Session ID must be a string");
    }
    return data;
  })
  .handler(async ({ data: sessionId }) => {
    try {
      const stripe = getStripe();
      const session = await stripe.checkout.sessions.expire(sessionId);

      return {
        success: true,
        sessionId: session.id,
      };
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to cancel session";
      console.error("Session cancellation error:", message);
      throw new Error(message);
    }
  });
