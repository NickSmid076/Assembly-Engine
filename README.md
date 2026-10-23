# Assembly Engine website (v1, front end only)

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

- `app/page.tsx` puts the homepage sections in order.
- `components/` holds one file per section (Header, Hero + HeroEngine, DemoVideo, HowWeWork, WhoWeAre, Services, HoursBand, Advantages, Blog, Footer).
- `lib/motion.tsx` holds the scroll animations (Reveal, Stagger, SplitHeading); `components/SmoothScroll.tsx` adds Lenis smooth scrolling.
- `public/video/` holds the demo video shown under the hero.
- `components/Simulation.tsx` and `components/Newsletter.tsx` are no longer used (replaced by the video and the newsletter row in Blog) and can be deleted.
- `lib/content.ts` holds all copy (services, steps, advantages, blog placeholders), so a Dutch version can come later.
- `public/embeds/` holds the animated artifacts built earlier (five service cards, "Hours back" band, service line animation).
  They load through `components/Embed.tsx` in iframes. `?part=wide|sq1|sq2|bare|band` picks which piece of the artifact shows.
  Next step in Claude Code: port these to native React components.

## Still to do before launch

- The blog posts are placeholders.
- The newsletter form is not connected to a mailing tool yet.
- The "Book a free audit" buttons point to the footer contact for now.
- The logo is rendered as text. Swap it for the SVG from Marketing/Brand/Logo/exports.
- All example data (Van Dijk Accountancy, De Vries, names, amounts) is fictional and labelled as an example.
