import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { createCheckoutSession } from "@/lib/checkout.functions";

export const Route = createFileRoute("/")({
  component: Landing,
});


function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground grain-bg">
      <Nav />
      <Hero />
      <Marquee />
      <WhatsInside />
      <Preview />
      <ForWho />
      <Testimonials />
      <Pricing />
      <FAQ />
      <Footer />
    </div>
  );
}

function CheckoutButton({
  tier,
  children,
  className,
}: {
  tier: "starter" | "complete";
  children: React.ReactNode;
  className?: string;
}) {
  const checkout = useServerFn(createCheckoutSession);
  const mutation = useMutation({
    mutationFn: async () => {
      const { url } = await checkout({ data: { tier } });
      return url;
    },
    onSuccess: (url) => {
      window.location.href = url;
    },
  });

  return (
    <button
      onClick={() => mutation.mutate()}
      disabled={mutation.isPending}
      className={className}
    >
      {mutation.isPending ? "Loading..." : children}
    </button>
  );
}

function Nav() {

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-md bg-ink text-paper font-serif text-lg leading-none">
            c
          </div>
          <span className="font-serif text-xl">Cortex OS</span>
        </a>
        <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
          <a href="#inside" className="hover:text-foreground">What's inside</a>
          <a href="#preview" className="hover:text-foreground">Preview</a>
          <a href="#pricing" className="hover:text-foreground">Pricing</a>
          <a href="#faq" className="hover:text-foreground">FAQ</a>
        </nav>
        <CheckoutButton
          tier="starter"
          className="rounded-full bg-ink px-4 py-2 text-sm text-paper transition hover:opacity-90"
        >
          Get the template
        </CheckoutButton>
      </div>
    </header>
  );
}


function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-20 md:grid-cols-12 md:py-28">
        <div className="md:col-span-7">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-ember" />
            96 prompts · instant PDF delivery
          </div>
          <h1 className="text-balance font-serif text-5xl leading-[1.02] tracking-tight md:text-7xl">
            Your AI second brain,{" "}
            <span className="italic text-ember">finally</span> organized.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Cortex OS is a curated prompt engine for people who think a lot. 96
            production-ready AI prompts across productivity, writing, strategy,
            decisions, research, marketing, coding, and growth — copy, paste, and get results.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <CheckoutButton
              tier="starter"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition hover:opacity-90"
            >
              Buy for $49
              <span className="transition group-hover:translate-x-0.5">→</span>
            </CheckoutButton>

            <a href="#preview" className="text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground">
              See what's inside
            </a>
          </div>
          <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex -space-x-2">
              {["#c98a5b", "#4a6741", "#3b6fa0", "#8b6f5e"].map((c, i) => (
                <div
                  key={i}
                  className="h-7 w-7 rounded-full border-2 border-background"
                  style={{ background: c }}
                />
              ))}
            </div>
            <span>Loved by 4,200+ founders, writers, and researchers</span>
          </div>
        </div>

        <div className="md:col-span-5">
          <PromptPackMock />
        </div>
      </div>
    </section>
  );
}

function PromptPackMock() {
  const prompts = [
    "Summarize the key ideas in [text] as if explaining them to a smart 12-year-old.",
    "Turn this meeting transcript into a one-page brief with decisions, owners, and next steps.",
    "I want to build a habit around [behavior]. Design a 21-day starting plan.",
    "Write a landing page outline for [product] with headline, pain points, and CTA.",
    "Review this code snippet for bugs, performance, and readability issues.",
    "Run a 'regret minimization' exercise for choosing between [A] and [B].",
  ];

  return (
    <div className="relative">
      <div className="absolute -inset-4 rounded-3xl bg-ember/10 blur-2xl" aria-hidden />
      <div className="relative rounded-2xl border border-border bg-card p-5 shadow-[0_30px_60px_-30px_rgba(20,15,10,0.35)]">
        <div className="mb-4 flex items-center gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-muted" />
          <div className="h-2.5 w-2.5 rounded-full bg-muted" />
          <div className="h-2.5 w-2.5 rounded-full bg-muted" />
        </div>
        <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
          <span className="inline-block rounded bg-ember/10 px-1.5 py-0.5 text-ember">PDF</span>
          <span>Cortex OS Prompt Engine</span>
        </div>
        <div className="font-serif text-2xl">96 AI prompts</div>
        <div className="mb-5 text-xs text-muted-foreground">8 categories · instant copy-paste</div>

        <div className="space-y-2">
          {prompts.map((p, i) => (
            <div
              key={i}
              className="rounded-lg border border-border bg-background p-2.5 text-[11px] leading-relaxed text-foreground/90 transition hover:border-ember/30"
            >
              <span className="mr-2 inline-flex h-4 w-4 items-center justify-center rounded-full bg-ember/10 text-[9px] font-medium text-ember">
                {i + 1}
              </span>
              {p}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Marquee() {
  const logos = ["Stripe", "Notion", "Vercel", "Linear", "Figma", "Substack", "Framer", "Arc"];
  return (
    <section className="border-y border-border/60 bg-secondary/40 py-6">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-4 text-center text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Used by thinkers at
        </div>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 opacity-70">
          {logos.map((l) => (
            <span key={l} className="font-serif text-xl italic">
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatsInside() {
  const items = [
    {
      title: "Productivity Engine",
      body: "12 prompts for planning, focus blocks, time-boxing, and turning chaotic weeks into clear daily action.",
      tag: "01",
    },
    {
      title: "Writing & Communication",
      body: "12 prompts to draft faster, edit sharper, rewrite in any voice, and turn rough notes into polished prose.",
      tag: "02",
    },
    {
      title: "Strategy & Research",
      body: "12 prompts for market research, summarization, competitor analysis, and extracting signal from noise.",
      tag: "03",
    },
    {
      title: "Decision Making",
      body: "12 prompts for high-stakes choices, regret minimization, cheap tests, and avoiding cognitive traps.",
      tag: "04",
    },
    {
      title: "Marketing & Sales",
      body: "12 prompts for landing pages, email sequences, lead magnets, objection handling, and launch planning.",
      tag: "05",
    },
    {
      title: "Coding & Development",
      body: "12 prompts for code review, scoping, debugging, schema design, and writing runbooks that ship faster.",
      tag: "06",
    },
    {
      title: "Business Growth",
      body: "12 prompts for revenue ideas, partnerships, financial modeling, pricing, and founder prioritization.",
      tag: "07",
    },
    {
      title: "Personal Growth",
      body: "12 prompts for habit design, setbacks, boundaries, gratitude, and building a life that compounds.",
      tag: "08",
    },
  ];

  return (
    <section id="inside" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-14 max-w-2xl">
        <div className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          What's inside
        </div>
        <h2 className="text-balance font-serif text-4xl md:text-5xl">
          Six modules. One calm system.
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => (
          <div key={it.tag} className="group relative bg-background p-8 transition hover:bg-card">
            <div className="mb-8 font-mono text-xs text-muted-foreground">{it.tag}</div>
            <div className="font-serif text-2xl">{it.title}</div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{it.body}</p>
            <div className="mt-6 text-sm text-ember opacity-0 transition group-hover:opacity-100">
              Explore →
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Preview() {
  return (
    <section id="preview" className="border-t border-border bg-secondary/40 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
          <div>
            <div className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
              A closer look
            </div>
            <h2 className="text-balance font-serif text-4xl md:text-5xl">
              Built the way you actually think.
            </h2>
            <p className="mt-5 text-muted-foreground">
              Cortex OS isn't a template dump. Every database is wired together
              — a task on a project shows up on your daily; a highlight from
              your reading appears in the related project notes; a habit lapse
              nudges your weekly review.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "12 linked databases with clean relations",
                "Custom views for daily, weekly, quarterly",
                "Works on Notion Free — no upgrade required",
                "Fully editable — bring your own workflow",
              ].map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className="mt-1.5 h-1 w-4 flex-none bg-ember" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-border bg-background p-6 shadow-[0_30px_60px_-30px_rgba(20,15,10,0.25)]">
            <div className="mb-4 flex items-center justify-between border-b border-border pb-3 text-xs text-muted-foreground">
              <span>📁  Projects / Ship v4.2</span>
              <span>Updated 2h ago</span>
            </div>
            <div className="font-serif text-2xl">Ship Cortex OS v4.2</div>
            <div className="mt-1 flex flex-wrap gap-1.5 text-[10px]">
              <span className="rounded-full bg-ember/15 px-2 py-0.5 text-ember">In progress</span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground">Q4</span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-muted-foreground">Product</span>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              {[
                { label: "Tasks", value: "12/18" },
                { label: "Notes", value: "27" },
                { label: "Days left", value: "6" },
              ].map((s) => (
                <div key={s.label} className="rounded-lg border border-border p-3">
                  <div className="font-serif text-xl">{s.value}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-2 text-sm">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">
                Linked notes
              </div>
              {[
                "AI-ready templates — research",
                "Pricing test — $39 vs $49",
                "Onboarding video — script v2",
              ].map((n) => (
                <div
                  key={n}
                  className="flex items-center justify-between rounded-md border border-transparent px-2 py-1.5 transition hover:border-border hover:bg-card"
                >
                  <span>📝  {n}</span>
                  <span className="text-xs text-muted-foreground">→</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ForWho() {
  const rows = [
    { who: "Founders", why: "Ship without losing the plot across five simultaneous priorities." },
    { who: "Writers", why: "Capture, connect, and resurface ideas so nothing good disappears." },
    { who: "Researchers", why: "A literature review that doesn't collapse into 400 untitled tabs." },
    { who: "Consultants", why: "Client-ready project pages, meeting notes, and deliverables in one place." },
  ];
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Who it's for
          </div>
          <h2 className="text-balance font-serif text-4xl md:text-5xl">
            Made for people whose job is thinking.
          </h2>
        </div>
        <div className="md:col-span-8">
          <div className="divide-y divide-border border-y border-border">
            {rows.map((r) => (
              <div key={r.who} className="grid grid-cols-12 gap-6 py-6">
                <div className="col-span-4 font-serif text-2xl italic md:col-span-3">{r.who}</div>
                <div className="col-span-8 text-muted-foreground md:col-span-9">{r.why}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const quotes = [
    {
      q: "I've bought maybe fifteen Notion templates. This is the only one still on my sidebar six months later.",
      a: "Maya R.",
      role: "Founder, Loop Studio",
    },
    {
      q: "The weekly review alone is worth it. I finally stopped losing ideas between apps.",
      a: "Jonas W.",
      role: "PhD candidate, ETH Zürich",
    },
    {
      q: "It looks like something Kinfolk would ship. Rare for a productivity tool.",
      a: "Priya S.",
      role: "Design director",
    },
  ];
  return (
    <section className="border-y border-border bg-ink py-24 text-paper">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-14 max-w-2xl">
          <div className="mb-3 text-xs uppercase tracking-[0.2em] text-paper/60">
            What people say
          </div>
          <h2 className="font-serif text-4xl md:text-5xl">
            Quiet praise from noisy people.
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {quotes.map((q) => (
            <figure key={q.a} className="flex flex-col justify-between border-t border-paper/20 pt-6">
              <blockquote className="font-serif text-2xl leading-snug italic text-paper/90">
                "{q.q}"
              </blockquote>
              <figcaption className="mt-8 text-sm">
                <div>{q.a}</div>
                <div className="text-paper/60">{q.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const tiers = [
    {
      name: "Cortex OS",
      tier: "starter" as const,
      price: "$49",
      note: "one-time · lifetime updates",
      features: [
        "Full 12-database template",
        "Notion Free compatible",
        "Lifetime updates",
        "Setup guide + 20-min walkthrough",
        "Email support",
      ],
      cta: "Buy Cortex OS",
      featured: true,
    },
    {
      name: "Cortex OS + Coach",
      tier: "complete" as const,
      price: "$149",
      note: "one-time · everything below",
      features: [
        "Everything in Cortex OS",
        "60-min 1:1 setup call with the founder",
        "Personal workflow audit",
        "Priority support for 12 months",
        "Bonus: The Weekly Review workbook",
      ],
      cta: "Get it with coaching",
    },
  ];
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mb-14 max-w-2xl">
        <div className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Pricing
        </div>
        <h2 className="text-balance font-serif text-4xl md:text-5xl">
          Pay once. Use it for years.
        </h2>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={`rounded-2xl border p-8 ${
              t.featured ? "border-ink bg-ink text-paper" : "border-border bg-card"
            }`}
          >
            <div className="flex items-baseline justify-between">
              <div className="font-serif text-2xl">{t.name}</div>
              {t.featured && (
                <span className="rounded-full bg-ember px-3 py-1 text-xs text-paper">
                  Most popular
                </span>
              )}
            </div>
            <div className="mt-6 flex items-baseline gap-2">
              <div className="font-serif text-5xl">{t.price}</div>
              <div className={t.featured ? "text-paper/60 text-sm" : "text-muted-foreground text-sm"}>
                {t.note}
              </div>
            </div>
            <ul className="mt-8 space-y-3 text-sm">
              {t.features.map((f) => (
                <li key={f} className="flex items-start gap-3">
                  <span className={`mt-1.5 h-1 w-4 flex-none ${t.featured ? "bg-ember" : "bg-ember"}`} />
                  <span className={t.featured ? "text-paper/90" : ""}>{f}</span>
                </li>
              ))}
            </ul>
            <CheckoutButton
              tier={t.tier}
              className={`mt-10 w-full rounded-full px-6 py-3 text-sm font-medium transition ${
                t.featured
                  ? "bg-paper text-ink hover:opacity-90"
                  : "bg-ink text-paper hover:opacity-90"
              }`}
            >
              {t.cta}
            </CheckoutButton>
            <p className={`mt-4 text-center text-xs ${t.featured ? "text-paper/60" : "text-muted-foreground"}`}>
              30-day no-questions refund
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}


function FAQ() {
  const qs = [
    {
      q: "Do I need a paid Notion account?",
      a: "No. Cortex OS runs on the free Notion plan for individuals. Team features are optional.",
    },
    {
      q: "Is it a one-time purchase?",
      a: "Yes. $49 once, and you get every update for as long as the product exists.",
    },
    {
      q: "Can I customize it?",
      a: "Please do. Every database, view, and template is fully editable. Cortex OS is a starting point, not a cage.",
    },
    {
      q: "What if it's not for me?",
      a: "Email us within 30 days for a full refund. No forms, no friction.",
    },
    {
      q: "Do you offer team licenses?",
      a: "Yes — teams of 5+ get a discounted bundle and a shared setup call. Reply to your receipt to arrange.",
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="border-t border-border bg-secondary/40 py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-6 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            FAQ
          </div>
          <h2 className="font-serif text-4xl md:text-5xl">Questions, answered.</h2>
        </div>
        <div className="md:col-span-8">
          <div className="divide-y divide-border border-y border-border">
            {qs.map((item, i) => (
              <div key={item.q} className="py-5">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="flex w-full items-center justify-between gap-6 text-left"
                >
                  <span className="font-serif text-xl">{item.q}</span>
                  <span className="font-serif text-2xl text-ember">
                    {open === i ? "–" : "+"}
                  </span>
                </button>
                {open === i && (
                  <p className="mt-3 max-w-2xl text-muted-foreground">{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-6">
            <div className="flex items-center gap-2">
              <div className="grid h-7 w-7 place-items-center rounded-md bg-ink text-paper font-serif text-lg leading-none">
                c
              </div>
              <span className="font-serif text-xl">Cortex OS</span>
            </div>
            <p className="mt-4 max-w-md font-serif text-3xl italic leading-tight">
              A calm place for a busy mind.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:col-span-6 md:grid-cols-3">
            <FooterCol title="Product" items={["What's inside", "Preview", "Pricing", "Changelog"]} />
            <FooterCol title="Company" items={["About", "Journal", "Affiliates", "Contact"]} />
            <FooterCol title="Legal" items={["Terms", "Privacy", "Refunds", "License"]} />
          </div>
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <div>© {new Date().getFullYear()} Cortex OS. Made carefully in Lisbon.</div>
          <div>Not affiliated with Notion Labs, Inc.</div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <div className="mb-3 text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {title}
      </div>
      <ul className="space-y-2 text-sm">
        {items.map((i) => (
          <li key={i}>
            <a href="#" className="hover:text-ember">
              {i}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
