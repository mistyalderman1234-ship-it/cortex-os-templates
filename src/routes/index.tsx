import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { createCheckoutSession } from "@/lib/checkout.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Cortex OS Prompt Engine — 96 AI Prompts for People Who Think" },
      { name: "description", content: "Cortex OS Prompt Engine is a curated PDF of 96 production-ready AI prompts across productivity, writing, strategy, marketing, coding, and decisions. Buy once, use forever." },
      { property: "og:title", content: "Cortex OS Prompt Engine — 96 AI Prompts for People Who Think" },
      { property: "og:description", content: "A curated PDF of 96 production-ready AI prompts. Copy, paste, and get results with any LLM." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
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
          Eight categories. One prompt away.
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
              Prompts you can use today.
            </h2>
            <p className="mt-5 text-muted-foreground">
              Cortex OS isn't a course you have to finish. It's a tool you open
              when you're stuck — copy a prompt, fill in the blanks, and get a
              useful result in seconds. No setup, no learning curve, no AI
              expertise required.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "96 prompts across 8 high-leverage work categories",
                "Every prompt has a clear fill-in-the-blank format",
                "Works with ChatGPT, Claude, Gemini, and any LLM",
                "Delivered as a clean PDF — keep it forever",
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
              <span>📄  Cortex OS Prompt Engine</span>
              <span>96 prompts</span>
            </div>

            <div className="space-y-3">
              {[
                {
                  cat: "Productivity",
                  prompt: "Plan my week around [top 3 priorities]. Build a realistic schedule with focus blocks, buffer time, and one thing to defer.",
                },
                {
                  cat: "Marketing",
                  prompt: "Write a landing page outline for [product]. Include headline, subhead, 3 pain points, 3 benefits, social proof, CTA, and risk reversal.",
                },
                {
                  cat: "Decisions",
                  prompt: "I'm stuck between [A] and [B]. Ask 5 questions that reveal my true priorities, then recommend a path.",
                },
              ].map((p, i) => (
                <div key={i} className="rounded-lg border border-border p-3">
                  <div className="mb-1.5 text-[10px] uppercase tracking-wider text-ember">
                    {p.cat}
                  </div>
                  <div className="text-sm leading-relaxed text-foreground/90">{p.prompt}</div>
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
    { who: "Founders", why: "Move faster on strategy, sales copy, and investor updates without hiring another writer." },
    { who: "Writers", why: "Draft clearer articles, newsletters, and proposals by starting with the right prompt." },
    { who: "Researchers", why: "Summarize papers, compare options, and synthesize findings without 400 untitled tabs." },
    { who: "Consultants", why: "Turn client calls into action items, briefs, and deliverables in minutes." },
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
      q: "I used to stare at a blank chat box. Now I open the Prompt Engine, copy one, and have a useful answer in 30 seconds.",
      a: "Maya R.",
      role: "Founder, Loop Studio",
    },
    {
      q: "The research prompts alone paid for the pack. I can turn a messy topic into a structured brief in one pass.",
      a: "Jonas W.",
      role: "PhD candidate, ETH Zürich",
    },
    {
      q: "It looks like something Kinfolk would ship. Rare for a productivity tool — and it actually works.",
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
      name: "Cortex OS Prompt Engine",
      tier: "starter" as const,
      price: "$49",
      note: "one-time · lifetime updates",
      features: [
        "96 prompts across 8 categories",
        "PDF download + instant email delivery",
        "Lifetime updates",
        "Bonus: 10 copy-paste prompt chains",
        "Email support",
      ],
      cta: "Buy Prompt Engine",
      featured: true,
    },
    {
      name: "Prompt Engine + Session",
      tier: "complete" as const,
      price: "$149",
      note: "one-time · everything below",
      features: [
        "Everything in Prompt Engine",
        "60-min 1:1 prompt coaching session",
        "Personal prompt library audit",
        "Priority support for 12 months",
        "Bonus: 25 custom prompts for your workflow",
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
      q: "What AI tools do these prompts work with?",
      a: "Any LLM: ChatGPT, Claude, Gemini, Perplexity, Cursor, and even local models. The prompts are written in plain language with fill-in-the-blank brackets.",
    },
    {
      q: "Is it a one-time purchase?",
      a: "Yes. $49 once, and you get every update for as long as the product exists.",
    },
    {
      q: "How do I receive the prompt pack?",
      a: "After checkout, you get an instant email with a PDF download link. No Notion account, no setup, no waiting.",
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
          <div>Instant digital delivery · PDF format</div>
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
