# StitchBill isolated redesign preview

Plain HTML/CSS/JavaScript. Open index.html locally or serve the repository root with a static HTTP server. No installation or build is required.

Changed: index.html (homepage, metadata and notices).
Added: styles.css, script.js, assets/retail.jpg.
Preserved byte-for-byte: robots.txt and sitemap.xml from the supplied archive.

Photo: https://images.unsplash.com/photo-1441986300917-64674bd600d8 (Unsplash clothing-store photograph; illustrative, not a StitchBill customer).

Verified: JavaScript syntax; local anchor targets; structured-data JSON; canonical URL; SEO file equality; no green palette values; main colour contrast (burgundy/cream 9.31:1, burgundy/white 10.44:1, charcoal/cream 12.35:1); Chrome desktop at 1363px and mobile-width iframe (375px content viewport) without horizontal overflow; image load; FAQ expansion and privacy-dialog opening/closing.

Unverified: Safari/Firefox, real devices, Lighthouse performance score, working product capabilities and production deployment linkage. Website notices are draft site-specific copy for owner review, not a product privacy policy.

Verification was performed in an isolated preview. All product capability examples are proposed/in development and preview content is labelled concept.

## Concept 2 — The Living Fashion-Tech Interface

Incremental hero enhancement only. The prior static hero figure is replaced with three fictional sample cards over the existing retail photograph. Purchase appears first, profile/history second, and follow-up opportunity third. All settle before fading into the next eight-second cycle. Motion uses CSS transforms/opacity; plain JavaScript enables animation, observes reduced-motion changes, supplies pause/play, and pauses offscreen/hidden-page animation. With no JavaScript or reduced motion the full static composition is visible.

Changed for Concept 2: index.html (hero figure only), styles.css (scoped additions), script.js (progressive enhancement), README.md (this report). No dependency, image, hosting, or SEO changes. All markup outside the hero figure and the entire head are identical to the approved baseline.

Browser QA: Chrome desktop 1280px and mobile 390px frame widths showed the sequence 000 → 100 → 110 → 111 → fade → repeat. Animation-iteration events and opacity samples confirmed actual looping; successive first-card appearances were approximately eight seconds apart. Additional 320px phone and 820px tablet frame checks showed no horizontal overflow and all settled cards inside the scene. Classic scrollbar widths reduce content viewports by 15px. Tablet spacing was corrected to separate card edges; the profile slide distance was reduced to keep its entrance within narrow screens. Pause gives all three cards at full opacity with no animation; Play restores animation. Reduced-motion branch tested using a controlled matchMedia/CSS fixture, and a separate fixture with page scripts removed verified the no-JavaScript static fallback. No app-origin errors were observed; the browser extension emitted unrelated metadata messages.

Verification limits: mobile sizes were browser frames, not physical devices; native OS reduced-motion switching, Safari/Firefox and Lighthouse scores remain unverified. No product functionality, automated messages, or data connections are provided by this illustration.

Preview verification completed before the authorized GitHub push.
