import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Clipboard, Clock3, ExternalLink, Gift, LockKeyhole, QrCode, Share2, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import bottleImage from "@/assets/gold-message-bottle.jpg";

export const Route = createFileRoute("/bottle/$id")({
  head: () => ({ meta: [
    { title: "A Sealed Bottle — Sats in a Bottle" }, { name: "description", content: "A meaningful message and sats are waiting for the right moment." },
    { property: "og:title", content: "A Sealed Bottle — Sats in a Bottle" }, { property: "og:description", content: "A meaningful message and sats are waiting for the right moment." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ]}), component: BottleDetail,
});

function BottleDetail() {
  const { id } = Route.useParams();
  const [copied, setCopied] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const isReady = id === "mama-2026";
  const copy = async () => { await navigator.clipboard?.writeText(window.location.href); setCopied(true); setTimeout(() => setCopied(false), 1800); };
  if (revealed) return <main className="mx-auto max-w-4xl px-5 py-16 text-center"><Sparkles className="mx-auto size-8 text-primary"/><p className="mt-5 text-xs font-bold uppercase text-primary">The moment is here</p><h1 className="mt-3 font-display text-5xl sm:text-6xl">For all the love you gave us.</h1><blockquote className="mx-auto mt-10 max-w-2xl border-y border-border py-10 font-display text-2xl leading-relaxed">“Mum, this is a small piece of tomorrow for all the years you gave us today. Happy birthday. We love you.”</blockquote><div className="mx-auto mt-10 max-w-md border border-border bg-card p-6 text-left"><p className="text-xs font-bold uppercase text-muted-foreground">Ready to claim</p><p className="mt-2 font-display text-4xl">48,000 sats</p><p className="mt-3 text-sm leading-6 text-muted-foreground">Demo only. A compatible wallet would verify and sign the claim transaction here.</p><Button className="mt-6 w-full"><Gift/> Simulate claim</Button></div></main>;
  return <main className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
    <div className="grid items-center gap-12 lg:grid-cols-[.85fr_1.15fr]">
      <div className="relative mx-auto max-w-sm"><img src={bottleImage} alt="A sealed glass bottle with a message inside" width={1200} height={1504} className="max-h-[65vh] w-auto mix-blend-multiply"/><Badge className="absolute left-0 top-8"><LockKeyhole className="mr-1 size-3"/> {isReady ? "Unlockable" : "Sealed"}</Badge></div>
      <section><p className="text-xs font-bold uppercase text-primary">A bottle for {isReady ? "Mum" : "Ama"}</p><h1 className="mt-4 font-display text-5xl leading-tight sm:text-6xl">{isReady ? "Mum’s birthday surprise" : "For Ama, when you turn 18"}</h1><p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">{isReady ? "The wait is over. Your message and sats are ready." : "Something meaningful is waiting. The message stays private until the opening date."}</p>
        {!isReady && <div className="mt-9 grid grid-cols-4 gap-px bg-border border border-border">{[["1,366","days"],["08","hours"],["42","mins"],["19","secs"]].map(([n,l]) => <div key={l} className="bg-card p-4 text-center"><p className="font-display text-3xl">{n}</p><p className="mt-1 text-xs text-muted-foreground">{l}</p></div>)}</div>}
        <div className="mt-8 grid gap-3 sm:grid-cols-2"><div className="border border-border p-5"><p className="text-xs text-muted-foreground">Gift amount</p><p className="mt-1 font-display text-3xl">{isReady ? "48,000" : "125,000"} sats</p><p className="mt-1 text-xs text-muted-foreground">Gift amount only</p></div><div className="border border-border p-5"><p className="text-xs text-muted-foreground">Opens</p><p className="mt-1 font-bold">{isReady ? "Ready now" : "18 June 2030"}</p><p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground"><ShieldCheck className="size-3 text-primary"/> Bitcoin Signet demo</p></div></div>
        <div className="mt-6 flex flex-wrap gap-3">{isReady ? <Button size="lg" onClick={() => setRevealed(true)}><Sparkles/> Open bottle</Button> : <><Button size="lg" onClick={copy}>{copied ? <Check/> : <Clipboard/>}{copied ? "Copied" : "Copy link"}</Button><Button variant="outline" size="lg"><QrCode/> Show QR</Button><Button variant="ghost" size="icon" aria-label="Share bottle"><Share2/></Button></>}<Button asChild variant="ghost"><Link to="/dashboard">My bottles</Link></Button></div>
      </section>
    </div>
    <section className="mt-16 border-t border-border pt-8"><div className="grid gap-7 md:grid-cols-3">{([[Clock3,"Timelock reached",isReady ? "Yes — demo condition met" : "No — waiting for block time"],[ShieldCheck,"Confirmations","12 confirmations · verified"],[ExternalLink,"Transaction","Signet · 8fd2…91ac"]] as Array<[LucideIcon,string,string]>).map(([Icon,t,d]) => <div key={t} className="flex gap-3"><Icon className="size-5 text-primary"/><div><p className="font-bold">{t}</p><p className="mt-1 text-sm text-muted-foreground">{d}</p></div></div>)}</div><p className="mt-8 text-xs leading-5 text-muted-foreground">Demo status only. This frontend does not verify the chain, hold keys, or create a spend. Bitcoin consensus rules—not this app—must enforce a production timelock.</p></section>
  </main>;
}