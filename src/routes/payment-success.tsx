import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/payment-success")({
  component: PaymentSuccess,
  head: () => ({
    title: "Payment confirmed — Cortex OS Prompt Engine",
    meta: [
      { name: "description", content: "Your Cortex OS Prompt Engine purchase is confirmed. Check your email for the PDF download link." },
      { property: "og:title", content: "Payment confirmed — Cortex OS Prompt Engine" },
      { property: "og:description", content: "Your Cortex OS Prompt Engine purchase is confirmed. Check your email for the PDF download link." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function PaymentSuccess() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="mx-auto max-w-md">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-ember/15">
          <span className="text-2xl text-ember">✓</span>
        </div>
        <h1 className="font-serif text-4xl">Welcome to Cortex OS</h1>
        <p className="mt-4 text-muted-foreground">
          Your payment is confirmed. You’ll receive an email with your Notion
          template link within a few minutes.
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          If you don’t see it, check your spam or promotions folder.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex items-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition hover:opacity-90"
        >
          Back to homepage
        </Link>
      </div>
    </main>
  );
}
