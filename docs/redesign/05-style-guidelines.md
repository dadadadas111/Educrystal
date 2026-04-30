# Style & Accessibility Tokens

Màu sắc:
- Primary: `#00B4D8` (vui, aqua)
- Accent: `#FFB703` (warm gold)
- Soft bg: `#F8FCFF`
- Text main: `#0B2545`

Typography (mobile-first):
- Display: 32px / 28px (hero)
- Title: 20px
- Body: 16px
- Micro: 12px

Spacing & Geometry:
- Base spacing: 8px
- Button height: 48px full-width
- Touch targets >= 44px
- Border radius: 12px (cards), 9999px (pills)

Illustration & motion:
- Use friendly, rounded illustrations.
- Short motion (150–250ms) easing: spring-like for CTA.

Accessibility:
- WCAG contrast for text body >= 4.5:1
- Keyboard focus styles visible
- Prefer semantic HTML (button, nav, main)

Assets:
- Provide 3 sizes for illustrations (mobile/tablet/hero).

Implementation note:
- Expose tokens via `tailwind.config.ts` (colors, spacing, font sizes).
