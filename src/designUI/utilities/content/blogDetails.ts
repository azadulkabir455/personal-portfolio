export interface BlogDetailsContent {
  backLabel: string;
  backHref: string;
  title: string;
  subtitle: string;
  publishedDate: string;
  readTime: string;
  image: string;
  content: string;
  tags: string[];
}

export const blogDetailsContent: BlogDetailsContent = {
  backLabel: "Back",
  backHref: "/blog",
  title: "The Subtle Power Of Micro-Interactions In Art Auction Platforms",
  subtitle:
    "Why the smallest details in a bidding flow often decide whether a buyer trusts the platform enough to place a bid.",
  publishedDate: "June 12th, 2026",
  readTime: "6 min read",
  image: "/images/blog/blog.png",
  content: `
    <h1>Demo Heading Level 1</h1>
    <p>Auction platforms live and die on trust. A buyer placing a six-figure bid needs to feel, in the span of a click, that the system has registered their intent correctly. That confidence rarely comes from the big, obvious parts of the interface — it comes from the small ones.</p>
    <h2>Demo Heading Level 2</h2>
    <p>Micro-interactions are the tiny moments of feedback a product gives in response to a single action: a bid button that pulses on confirmation, a countdown timer that shifts color as the clock runs low, a subtle haptic-style animation when a bid is outbid. Individually, none of these feel significant. Together, they form the emotional texture of the entire experience.</p>
    <blockquote class="not-prose border-l-[3px] border-[#242423] pl-[16px]">
      <p class="mb-[12px] text-[14px] leading-[20px] font-medium tracking-[0px] text-[#242423] md:text-[16px] md:leading-[24px] lg:text-[24px] lg:leading-[32px]">People ignore design that ignores people — and often, it's the micro-interactions that speak the loudest.</p>
      <cite class="block text-[12px] leading-[18px] font-medium tracking-[0px] text-[#616161] not-italic md:text-[14px] md:leading-[20px] lg:text-[18px] lg:leading-[22px]">— Don Norman</cite>
    </blockquote>
    <h3>Practical Applications</h3>
    <p>On a recent auction platform audit, we mapped every moment a user could feel uncertain — placing a bid, getting outbid, watching a lot close — and designed a dedicated micro-interaction for each. The result was a measurable drop in abandoned bids during the final sixty seconds of an auction, when hesitation is most expensive.</p>
    <h4>Demo Heading Level 4</h4>
    <p>Scroll-linked motion, drag feedback, and form validation timing all fall under this same umbrella of small, trust-building signals.</p>
    <h5>Demo Heading Level 5</h5>
    <p>Even something as small as a button's hover state communicates whether the interface is listening.</p>
    <h6>Demo Heading Level 6</h6>
    <img src="/images/blog/blog.png" alt="Micro-interactions demo" />
    <h3>In Summary</h3>
    <p>Treat micro-interactions as a first-class part of the design system, not a polish pass at the end. On platforms where trust is the product, they are often the difference between a user who bids again and one who never returns.</p>
  `,
  tags: ["UX Research", "Micro-Interactions", "Auction Platforms", "Design Systems"],
};
