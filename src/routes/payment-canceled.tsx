import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/payment-canceled")({
  component: PaymentCanceled,
  head: () => ({
    title: "Payment canceled — Cortex OS",
    meta: [
      { name: "description", content: "Your Cortex OS purchase was canceled. You can try again anytime." },
      { property: "og:title", content: "Payment canceled — Cortex OS" },
      { property: "og:description", content: "Your Cortex OS purchase was canceled. You can try again anytime." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function PaymentCanceled() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <div className="mx-auto max-w-md">
        <h1 className="font-serif text-4xl">Payment canceled</h1>
        <p className="mt-4 text-muted-foreground">
          No worries — you weren’t charged. You can come back and grab Cortex OS
          whenever you’re ready.
        </p>
        <Link
          to="/"
          search={{}} 
          className="mt-8 inline-flex items-center rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition hover:opacity-90"
        >
          Back to homepage
        </Link>
      </div>
    </main>
  );
}
