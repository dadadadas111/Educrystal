# Educrystal Decisions And Open Questions

## Frozen Decisions
- Educrystal is a personalized crystal-growing learning app.
- The core loop is program selection, guided progress, private diary, and optional moderated public showcase.
- Programs behave like mini-courses.
- Each program includes difficulty, duration, materials, steps, milestones, and safety notes.
- Social is intentionally limited.
- Public posts require moderation.
- Public posts support upvote/downvote only.
- Public posts do not support comments.
- The MVP should already feel polished and “showable” to a client.

## Working Assumptions Used In Local Docs
- Age input is used for personalization, not for a heavy identity flow.
- The first demo should emphasize mobile-first or app-like behavior even if the actual product starts as a web app.
- Sample content can be generated to make the demo feel alive.
- Public showcase posts can be presented as standalone submissions, even if later they may connect more deeply to diary entries.

## Open Questions
- Should a public showcase post be created directly from a diary entry, or as a separate public composition flow?
- How visible should the moderation state be in the user-facing product?
- Should milestone completion feel more like a checklist, a timeline, or a progress map?
- How strong should the crystal-themed visual layer be: subtle and elegant, or more magical and expressive?
- Should advanced programs be visible immediately, or only after the user completes a beginner journey?

## Prompt Gaps To Revisit After First Demo
- Does the external app builder over-index on social features even when comments are disabled?
- Does the generated prototype show enough safety reminders inside the program journey?
- Does the private diary feel personal enough, or does it still look like a generic notes page?
- Do the sample programs feel distinct from each other in both difficulty and visual presentation?

## Change Log
- 2026-04-30: Locked personalized learning direction.
- 2026-04-30: Limited public social to moderator-approved showcase posts with voting only.
- 2026-04-30: Removed comments from MVP.
- 2026-04-30: Defined local memory layer to preserve continuity for future sessions.

## Next Session Start Here
1. Test the prototype-builder prompt on one or two external platforms.
2. Compare which platform better preserves the private diary and limited public showcase behavior.
3. Capture screenshots and note where the generated demo drifts from the confirmed scope.
4. Refine the prompt based on the first generated result.
5. If needed, convert the best generated direction into a slide or pitch deck for client discussion.
