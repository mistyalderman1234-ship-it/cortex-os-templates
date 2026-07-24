import { createFileRoute } from "@tanstack/react-router";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";

export const Route = createFileRoute("/api/public/stripe/webhook")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const stripe = getStripe();
        const payload = await request.text();
        const signature = request.headers.get("stripe-signature") ?? "";

        let event: Stripe.Event;
        try {
          event = stripe.webhooks.constructEvent(
            payload,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!,
          );
        } catch (err) {
          const message = err instanceof Error ? err.message : "Invalid signature";
          console.error("Stripe webhook verification failed:", message);
          return new Response(`Webhook verification failed: ${message}`, { status: 400 });
        }

        if (event.type === "checkout.session.completed") {
          const session = event.data.object as Stripe.Checkout.Session;
          await fulfillOrder(session);
        }

        return new Response(JSON.stringify({ received: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});

async function fulfillOrder(session: Stripe.Checkout.Session) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const lineItems = await getStripe().checkout.sessions.listLineItems(session.id, { limit: 1 });
  const item = lineItems.data[0];

  const existing = await supabaseAdmin
    .from("orders")
    .select("id")
    .eq("stripe_session_id", session.id)
    .maybeSingle();

  if (existing.error) {
    console.error("Error checking existing order:", existing.error);
    throw new Error("Database error checking existing order");
  }

  if (!existing.data) {
    const insert = await supabaseAdmin.from("orders").insert({
      email: session.customer_details?.email ?? "",
      stripe_session_id: session.id,
      stripe_payment_intent_id: session.payment_intent as string | null,
      stripe_product_id: item?.price?.product as string | null,
      stripe_price_id: item?.price?.id ?? null,
      product_name: item?.description ?? null,
      amount_total: session.amount_total,
      currency: session.currency,
      status: "paid",
      customer_email_sent: false,
    });

    if (insert.error) {
      console.error("Error inserting order:", insert.error);
      throw new Error("Database error recording order");
    }
  }

  try {
    const signedUrl = await createSignedDownloadUrl();
    await sendPurchaseEmail(session.customer_details?.email ?? "", signedUrl);
    await supabaseAdmin.from("orders").update({ customer_email_sent: true }).eq("stripe_session_id", session.id);
  } catch (err) {
    console.error("Failed to send purchase email:", err);
  }
}

async function createSignedDownloadUrl() {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

  const { data, error } = await supabaseAdmin.storage
    .from("deliverables")
    .createSignedUrl("cortex-os-prompt-engine.pdf", 60 * 60 * 24 * 7); // 7 days

  if (error || !data?.signedUrl) {
    throw new Error("Failed to generate signed download URL: " + (error?.message ?? "unknown"));
  }

  return data.signedUrl;
}

async function sendPurchaseEmail(_email: string, _signedUrl: string) {
  // TODO: send purchase email via Lovable Emails once sender domain is configured.
  // Email will include the signed download link for the Prompt Engine PDF.
}
