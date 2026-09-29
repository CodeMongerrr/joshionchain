/**
 * Selected posts from X and LinkedIn, shown in the trails beside the homepage
 * hero. Each card links straight to the original post.
 *
 * `text` is the post exactly as published, emoji and punctuation included. It
 * is a quote, so it is exempt from the copy rule in site.ts. Everything else
 * here (`title`, labels) is site copy and follows it.
 *
 * Every `url` was opened and checked against the live post on 29 Sep 2026.
 * X urls are the canonical status links. LinkedIn urls are the activity
 * links, which LinkedIn redirects to the public post for signed out visitors.
 *
 * The hero splits these between its two trails and spaces the LinkedIn posts
 * out, so each trail mixes both platforms whatever order they are listed in.
 */

export type Platform = "x" | "linkedin";

export type Post = {
  slug: string;
  platform: Platform;
  url: string;
  /** ISO timestamp as the platform reports it. */
  date: string;
  /** Short topic line, used as the card's accessible name and in llms-full.txt. */
  title: string;
  text: string;
  /** Set on replies. X hides the leading @mention and shows this line instead. */
  replyTo?: { name: string; handle: string; url: string };
  /** A quoted post, shown as the nested box under the text. */
  quote?: { name: string; handle: string; title: string; url: string };
  /** A notable reply to this post, flagged on the card. */
  response?: { name: string; handle: string; url: string };
};

export const posts: Post[] = [
  {
    slug: "where-juniors-earn-judgment",
    platform: "x",
    url: "https://x.com/JoshiOnChain/status/2077634222370763181",
    date: "2026-07-16T05:59:33.000Z",
    title: "Where engineers earn judgment now",
    replyTo: {
      name: "Addy Osmani",
      handle: "addyosmani",
      url: "https://x.com/addyosmani/status/2077600055159357548",
    },
    response: {
      name: "Addy Osmani",
      handle: "addyosmani",
      url: "https://x.com/addyosmani/status/2077635018869113122",
    },
    text: "this reframes the junior problem. the reps were never the point, they were where judgment got installed for free. now reps are cheap and judgment is the scarce part, so you have to seek the friction on purpose. reviewing what an agent produced is the new place you earn it.",
  },
  {
    slug: "read-the-timing-before-the-code",
    platform: "linkedin",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7491769950781710336/",
    date: "2026-08-08T08:19:06.000Z",
    title: "Read the timing before the code",
    text: `A server rejected me in 125 milliseconds. 🥶 🥶

I was harvesting public data from a handful of sources for a tool I built on Cloudflare Workers. One source, Reddit, kept blocking the reads. I already had a proper descriptive User-Agent set, so I did what everyone does first: I assumed the bug was mine.

Then I looked at the timings instead of the code:
→ Reddit: 403, in 125 ms
→ Google News: 503, in 9.6 s
→ ArXiv: aborted at exactly my 10 s timeout
→ Hacker News: 200, in 2 s

The 125 ms is the whole story 🤯 !
A rejection that fast is not a rate limit and it is not your headers. Nothing was measured and nothing was throttled. It is a reputation decision made before the request was even read. Reddit blocks anonymous reads from datacenter IP ranges, and Cloudflare Workers, Cloud Run and GKE all egress from exactly those ranges.

Which means the move I was tempted to make, was never going to work. You cannot out-engineer an IP reputation block with a disguise. The only durable fix is to stop being anonymous: authenticate as a registered app, and you are allowed in from datacenter IPs under a published quota.

The reframe I kept:
→ A fast reject is a policy decision. Look at auth, identity, IP reputation.
→ A slow reject is a load decision. Look at rate limits, backpressure, timeouts.
Before you fix the code, read the timing. How long something takes to fail tells you what failed. A 125 ms no and a 9 second no are two different bugs wearing the same error message.

What is a failure whose speed gave away the real cause, once you stopped blaming your own code? 🤔`,
  },
  {
    slug: "who-decides-who-won",
    platform: "x",
    url: "https://x.com/JoshiOnChain/status/2102457140812390561",
    date: "2026-09-22T17:56:58.000Z",
    title: "Who decides who won",
    replyTo: {
      name: "vitalik.eth",
      handle: "VitalikButerin",
      url: "https://x.com/VitalikButerin/status/2102143283493507554",
    },
    text: "decentralization claims for these platforms usually hinge on resolution, not matching. matching engines are easy to decentralize, but oracle resolution, who actually decides who won a bet, is where most platforms still lean on a small trusted set. curious how Trueo handles that part",
  },
  {
    slug: "built-with-ai-vs-maintained-with-ai",
    platform: "linkedin",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7477682257273700354/",
    date: "2026-06-30T11:19:38.000Z",
    title: "Built with AI is not maintained with AI",
    text: `Anyone can vibe-code a demo now. Shipping a product that survives real users is a completely different sport. ⚡

"I built this with AI" and "I can maintain this with AI" are two very different sentences. Most people can't tell them apart yet. They're about to.

✨ Vibe coding: prompt, accept, prompt, accept, ship the moment it looks like it works. Feels like magic. Dies the second a real user touches it.

🛠️ Engineering with AI looks slower and is actually faster:

→ Spec before code. I write what I want before Claude writes a line.
→ One concern per change, even when it could do ten at once.
→ Not done until I've watched it run. Green tests aren't proof.
→ Every decision logged, so the same mistake doesn't get a second shot.

Same model. Same prompt window. Opposite outcome.

The difference was never the AI. It's whether there's an engineer on the other end who knows what "correct" actually looks like.

I run 8–16 Claude Code instances in parallel worktrees, merge queues, the whole rig. None of it ships clean without a spec and a human who can read the diff.

"I built this with AI" is cheap now.
"I can maintain this with AI" is the moat. 🔒

Curious who's already feeling the gap between the two. 🙂‍↔️`,
  },
  {
    slug: "seatbelts-before-the-car",
    platform: "x",
    url: "https://x.com/JoshiOnChain/status/2096617165642490346",
    date: "2026-09-06T15:11:00.000Z",
    title: "Seatbelts before the car",
    text: `we're shipping quantum-recoverable notes before quantum computers can reliably read an email.

building the seatbelt before the car exists. the single most Zcash thing imaginable and honestly i respect the paranoia.`,
  },
  {
    slug: "the-login-was-fine",
    platform: "x",
    url: "https://x.com/JoshiOnChain/status/2089354579049848972",
    date: "2026-08-17T14:12:04.000Z",
    title: "The login was never broken",
    text: `spent an hour on "the login is broken". 💀

the login was fine. the accounts in the runbook had never existed in that database. credentials were written down in two places and only one got updated.

a doc that restates a value will drift.
a doc that points at it cannot.`,
  },
  {
    slug: "running-a-fleet-of-cloud-agents",
    platform: "x",
    url: "https://x.com/JoshiOnChain/status/2029029799747023169",
    date: "2026-03-04T03:02:56.000Z",
    title: "Running a fleet of cloud agents",
    quote: {
      name: "nader dabit",
      handle: "dabit3",
      title: "How to Run a Fleet of Cloud Agents (The Complete Guide)",
      url: "https://x.com/dabit3/status/2028905998560436502",
    },
    text: "Wow, this was a great morning read",
  },
  {
    slug: "who-is-the-security-risk",
    platform: "x",
    url: "https://x.com/JoshiOnChain/status/2082163174422479246",
    date: "2026-07-28T17:56:00.000Z",
    title: "The human in the loop",
    text: `the agent asked me to approve a transaction.

i said yes without reading it.

so which one of us is the security risk here`,
  },
  {
    slug: "mev-shield",
    platform: "linkedin",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7426875619524919296/",
    date: "2026-02-10T06:32:12.000Z",
    title: "The cheapest way to execute a trade",
    text: `Your wallet doesn't care how your swap was protected. It only cares how much came back.

That's the problem with MEV protection today. Private relays hide your transaction from sandwich bots, Great!!!. But the cost isn't fixed, it depends on how much your trade distorts the pool's price. The same trade can cost pennies in a deep pool or dollars in a shallow one. And nobody tells you whether using a relay is even the cheapest option for your specific trade.

Nobody is asking the actual question: what is the mathematically cheapest way to execute THIS specific trade?

That's why I built 🛡️MEV Shield.

MEV Shield is an autonomous execution firewall for DeFi. Before your swap hits the chain, it:

→ Simulates the exact sandwich attack a bot would run against your trade using live pool state
→ Calculates your real MEV exposure down to the dollar
→ Evaluates three competing strategies unprotected public swap, private relay via Flashbots, and Optimized order splitting
→ Picks the one that puts the most money back in your wallet

The Optimizer uses a cost function that balances MEV reduction against gas overhead, finds the analytical minimum using calculus, then refines it numerically to handle real-world edge cases like threshold effects and chain-specific gas pricing.

For small trades? It tells you to do nothing the MEV isn't worth a bot's gas to attack. For mid-size trades? Private relay wins. For whale trades? The math says split and it tells you exactly how many chunks, and why.

Three trades, three different optimal strategies. The system adapts to each one.

I also integrated ENS as a Decentralized Policy Layer. Your MEV protection preferences risk tolerance, relay thresholds, chunk limits, slippage bounds are stored as text records on your ENS name. Set them once, and they follow your identity across any wallet or protocol that reads the namespace. No database. No accounts. Your config lives on-chain with you.

Built this for ETHGlobal HackMoney 2026, but I'm not stopping here.

The vision is a fully autonomous execution layer that optimizes across:

• Multiple DEXs - routing through whichever pool has the deepest liquidity and lowest MEV surface
• Multiple chains - splitting chunks across Ethereum, Arbitrum, Base, Optimism based on real-time gas and bridge costs
• Multiple bridges - comparing bridging fees, latency, and security tradeoffs for cross-chain splits
• Multiple private relays - not just Flashbots, but MEV Blocker, MEV Share, and chain-specific builders, each with different fee structures and inclusion guarantees

Every parameter feeds into the same cost function. The math scales. The more inputs it has, the better it optimizes.

DeFi shouldn't require a PhD to not get robbed. But building the thing that prevents it? That took some calculus.

Github - https://lnkd.in/diWkxWrx
#DeFi #MEV #Ethereum #Web3 #ENS #ETHGlobal #HackMoney2026`,
  },
  {
    slug: "same-job-scarier-pager",
    platform: "x",
    url: "https://x.com/JoshiOnChain/status/2082196393448382928",
    date: "2026-07-28T20:08:00.000Z",
    title: "Same job, scarier pager",
    text: `spent years making sure a node wouldn't fall over at 3am.

now i make sure an agent won't wire the treasury to a contract it met five seconds ago.

same job. the pager just got scarier.`,
  },
  {
    slug: "privacy-is-choosing",
    platform: "x",
    url: "https://x.com/JoshiOnChain/status/2096605086147596510",
    date: "2026-09-06T14:23:00.000Z",
    title: "Privacy is about choosing",
    text: `people think Zcash is about hiding. it's about choosing.

transparency should be a decision you make, not a default the entire world extracts from you by force.

privacy isn't the opposite of accountability, it's the precondition for consent.`,
  },
  {
    slug: "zero-traffic-full-rent",
    platform: "x",
    url: "https://x.com/JoshiOnChain/status/2090610860616241384",
    date: "2026-08-21T01:24:05.000Z",
    title: "Zero traffic, full rent",
    text: `asked claude code if i should cram kubernetes into one cloud run service to save money.

it audited the project instead. the whole bill was six services pinned to min-instances 1, idling 24/7. zero traffic, full rent.`,
  },
  {
    slug: "a-demo-is-not-a-spec",
    platform: "x",
    url: "https://x.com/JoshiOnChain/status/2089328659551183307",
    date: "2026-08-17T12:29:04.000Z",
    title: "A working demo is not a finished spec",
    text: `audited a build against its own spec.

the demo ran clean. but half the required tables did not exist, assignment overwrote in place with no history, and the "config driven" enums were hard coded strings nothing read at runtime.

a working demo hides how much of the spec is still scaffolding.`,
  },
  {
    slug: "the-mess-is-the-feature",
    platform: "x",
    url: "https://x.com/JoshiOnChain/status/2096628239158378921",
    date: "2026-09-06T15:55:00.000Z",
    title: "The mess is the feature",
    text: `a healthy protocol isn't five orgs nodding along.

it's five orgs disagreeing loudly and still shipping Ironwood on schedule. decentralized governance looks like a mess from outside, and the mess is the feature. no single throne to capture.`,
  },
  {
    slug: "test-the-off-switch",
    platform: "x",
    url: "https://x.com/JoshiOnChain/status/2083540248508891376",
    date: "2026-08-01T13:08:00.000Z",
    title: "Test the off switch first",
    text: `the interesting part of agent payments was never letting them spend.

it's the off switch.

every serious onchain agent is really just a very fast intern with a kill switch you'd better test before you need it.`,
  },
  {
    slug: "the-seed-phrase-was-a-tax",
    platform: "x",
    url: "https://x.com/JoshiOnChain/status/2077351523768848765",
    date: "2026-07-15T11:16:13.000Z",
    title: "The seed phrase was a tax",
    text: `the seed phrase was never a feature, it was a tax. account abstraction lets your wallet say "cap gas at $5, block anything over $1k, log me in with a passkey." turns out self-custody didn't have to feel like defusing a bomb.`,
  },
  {
    slug: "the-regression-test-is-the-moat",
    platform: "x",
    url: "https://x.com/JoshiOnChain/status/2082819247609368692",
    date: "2026-07-30T13:23:00.000Z",
    title: "The regression test is the moat",
    text: `everyone's shipping agents.
almost nobody's shipping the evals that tell you it still works tomorrow.

the demo is easy. the regression test is the moat.`,
  },
  {
    slug: "why-i-built-torbit",
    platform: "x",
    url: "https://x.com/JoshiOnChain/status/2079125354804122107",
    date: "2026-07-20T08:44:47.000Z",
    title: "Why I built Torbit",
    text: `I started @torbitxyz  because I was the worst version of the problem.

Brilliant thoughts in the shower. Blank drafts by noon. Zero posts by night.

Turns out consistency isn't a discipline issue. It's a systems issue.

So I built the system.`,
  },
];

/**
 * The posts split between the hero's two trails so both mix platforms. X
 * posts alternate sides, and each side's LinkedIn posts sit evenly spaced
 * among its X posts rather than bunched together.
 */
export function postTrails(): [Post[], Post[]] {
  const xs = posts.filter((p) => p.platform === "x");
  const lis = posts.filter((p) => p.platform === "linkedin");
  const sides: [Post[], Post[]] = [[], []];
  xs.forEach((p, i) => sides[i % 2].push(p));
  sides.forEach((side, s) => {
    const mine = lis.filter((_, i) => i % 2 === s);
    const total = side.length + mine.length;
    mine.forEach((p, k) => side.splice(Math.round(((k + 0.5) * total) / mine.length), 0, p));
  });
  return sides;
}

export const platformLabel: Record<Platform, string> = {
  x: "X",
  linkedin: "LinkedIn",
};

/**
 * Dates render in UTC with a fixed locale so the server and the browser
 * always print the same string, and hydration never disagrees.
 */
const dateFormat = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export const formatPostDate = (iso: string) => dateFormat.format(new Date(iso));
