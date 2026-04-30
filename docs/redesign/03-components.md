# Component Library (phân cấp & mô tả)

Nguyên tắc chung:
- Components nhỏ, tái sử dụng được, tối giản props.
- Mỗi component chỉ đảm nhiệm một hành vi.
- Thiết kế mobile-first, touch-friendly.

Atoms:
- `IconButton` (big touch area 44–56px)
- `Avatar` (circular)
- `Badge` (tone, small)
- `Text` variants: Display, Title, Body, Micro (kích thước cố định)
- `Illustration` (SVG/PNG container)

Molecules:
- `PrimaryButton` (big, full-width)
- `Card` (cover + meta + CTA)
- `ProgramCover` (large visual + overlay labels)
- `StepRow` (number + title + short preview)
- `ProgressRing` (circular progress playful)

Organisms / Templates:
- `HomeHero` (uses ProgramCover + primary CTA)
- `CatalogGrid` (list of `Card`)
- `StepView` (template for single step)
- `JournalList` (timeline)
- `BottomNav` (persistent)

Behavioral patterns:
- Single primary action per screen.
- Inline help: a small info icon that mở modal tip (child-friendly).
- Confirmations minimal: replace textual confirmations bằng micro-animations & short toast "Tuyệt!".

Props & Types (example):
- `PrimaryButton` props: {label: string, onClick: () => void, variant?: 'primary'|'ghost'}
- `Step` type should reuse `Program.steps` from `data/programs.ts`.

Accessibility:
- All interactive elements >= 44px.
- Contrast >= 4.5:1 đối với văn bản body.
- Aria labels for icon-only buttons.

Design tokens (brief):
- Radius: rounded-lg / rounded-full for pills.
- Spacing scale: 4/8/12/16/24 for padding.
- Motion: subtle spring for transitions.
