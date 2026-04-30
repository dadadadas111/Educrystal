# Lộ trình chuyển đổi (Migration Plan)

Phase A — Document & tiny prototypes (1 week)
- Hoàn thiện tài liệu thiết kế (đã bắt đầu).
- Implement 2 mẫu component: `PrimaryButton`, `StepView` (prototype pages).
- Estimate: 3–5 dev days.

Phase B — Core screens (2 weeks)
- Implement Home, Catalog, Program Detail, Step View, BottomNav.
- Migrate `data/programs.ts` dùng cho các view.
- Add `data/copy.ts` theo hướng dẫn copy.
- Estimate: 7–10 dev days.

Phase C — Journal + Sync (1 week)
- Implement Journal CRUD (local), Camera/photo support.
- Calendar sync (OAuth) as opt-in (parent mode first).
- Estimate: 5 dev days + infra.

Phase D — Polish & QA (1 week)
- Accessibility pass, animations, tests, performance.
- Prepare for deployment.

Task breakdown (example for Phase B):
1. Create layout components (BottomNav, AppShell tweaks) — 1 day
2. Catalog grid + Card — 1.5 day
3. Program Detail + ProgressRing — 2 days
4. Step View + navigation (next/complete) — 1.5 day
5. Integrations & small fixes — 1 day

Next steps tôi có thể làm ngay:
- Tạo `data/copy.ts` mẫu dựa trên guideline.
- Triển khai `StepView` component mẫu trong `components/app/`.

Bạn muốn tôi tiếp tục bằng cách nào? (tạo `data/copy.ts`, hay bắt đầu code component mẫu?)
