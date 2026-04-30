# Educrystal Prototype Builder Prompt

## Recommendation Before Use
For tools like Lovable, Dreamflow, or similar app-generation platforms, this prompt will usually work best if pasted in English while asking the generated UI copy to stay mainly in Vietnamese. That tends to produce a stronger visual and structural result while keeping the demo easy to show to the client.

## Paste-Ready Prompt

```text
Create a polished MVP demo for a product called Educrystal.

Educrystal is a personalized crystal-growing learning app for young learners and beginners. It is not a full social network. The core idea is that users learn to grow crystals through guided programs that feel like mini-courses, track their personal journey over time, and optionally share their results through carefully moderated public showcase posts.

I want you to design the app as a realistic, modern, crystal-themed product demo that feels complete enough to show a client, but still stays inside the MVP scope below.

HIGH-PRIORITY BUILD INSTRUCTION
This is a clickable MVP demo brief, not a production build spec. Prioritize one coherent learner journey over feature breadth. The most important thing is that the demo clearly shows this flow: sign in, choose a program, understand the steps and milestones, start the journey, log private diary progress, optionally submit a moderated public showcase post, and browse approved showcase posts.

TARGET SURFACE
Design this as a mobile-first consumer learning app experience. Do not design it like an admin dashboard, LMS back office, or broad social platform.

DEMO-FIRST BUILD RULES
- Use realistic mock data and simulated states where needed.
- Use placeholder photos or image blocks where appropriate.
- Simulate moderation states instead of building a heavy admin system.
- Prioritize polished UX, clear navigation, believable content, and connected flows.
- Do not spend demo effort on backend-like complexity, account settings depth, or technical infrastructure.

PRODUCT POSITIONING
- Educrystal is a personalized learning app about crystal growing.
- The product helps users choose a suitable crystal-growing program, follow a clear journey, track progress, and log real observations.
- The product also has a small public sharing layer, but only for moderator-approved showcase posts.
- This should feel like a guided learning journey with a safe and curated public inspiration area, not like a social media app.

TARGET USERS
- Young learners and beginners who are curious about crystal growing.
- Users who need a clear starting point, step-by-step guidance, visible progress, and simple safety reminders.
- Users who enjoy recording their own real journey with notes and photos.

MVP GOAL
The demo should clearly show that a user can:
1. sign in,
2. choose a crystal-growing program,
3. understand the program structure,
4. start the journey,
5. track progress and milestones,
6. keep a private diary with photos and notes,
7. optionally submit a public showcase post,
8. browse approved public showcase posts from others,
9. upvote or downvote public posts.

CORE PRODUCT RULES
- The private diary is private by default.
- Public posts are never published instantly. They must go through moderation first.
- Public posts can have upvote and downvote only.
- There are no comments.
- There is no chat, no DM, no follow system, no group feature, and no full social feed.
- The app should feel personal, educational, safe, and motivating.

PRIVATE / PUBLIC STATE MODEL
- A diary entry is private by default.
- A public showcase post is a separate, explicit action. Diary content must never automatically become public.
- A showcase post should have clear simulated states such as pending, approved, or rejected.
- Only approved showcase posts appear in the public feed.
- The public feed is a moderated inspiration gallery, not a conversation space.

PROGRAM CONCEPT
Each crystal-growing program should feel like a mini-course.
Each program must include:
- program title
- short description
- difficulty level
- estimated duration
- materials needed
- step-by-step guidance
- milestones or progress checkpoints
- safety notes
- completion goal

Please generate exactly 3 example programs with realistic sample content:
1. A beginner program: Alum crystal basic growing
2. A medium program: Crystal shaping / creative crystal form
3. A more advanced program: Advanced crystal-growing experience

Each sample program should have believable materials, 4-6 steps, 1-2 milestones, and clear safety notes.

PRIVATE DIARY CONCEPT
The private diary is a major part of the app experience.
It should help users:
- log progress by day or by milestone
- upload photo placeholders
- write observations, personal thoughts, and small reflections
- see a timeline or calendar-style progress view
- always understand which current program they are working on

The diary should feel warm, personal, and encouraging. It should not feel like a generic note-taking tool.

PUBLIC SHOWCASE CONCEPT
The public area is not a free-for-all social feed.
It is a curated showcase of approved posts.
Each public showcase post should feel like:
- a result sharing post
- a journey summary
- a useful learning insight
- a safe knowledge reference for others

Each public showcase post can include:
- title
- short story or lesson learned
- images
- optional YouTube embed placeholder if necessary
- voting controls
- moderation status behind the scenes

Do not add comments anywhere.

REQUIRED SCREENS
Please design these REQUIRED screens or views:
1. Welcome / Home screen
2. Light onboarding or age input screen
3. Program catalog screen
4. Program detail screen
5. Active program dashboard
6. Step detail screen
7. Milestones / progress screen
8. Private diary screen
9. New diary entry screen
10. Public showcase feed
11. Public showcase detail
12. Submit showcase post screen
13. Submission status / moderation result screen

Please keep the navigation coherent and connected. Fewer stronger screens are better than many shallow screens.

SUPPORTING UI STATES
You may also include lightweight supporting states if helpful:
- empty diary state
- first milestone reached state
- pending moderation state
- rejected showcase post with short revision note

MAIN USER FLOW
Design the app so the primary journey feels like this:
- User lands on Educrystal and immediately understands the value.
- User signs in with Google.
- User enters age or age band for a more personalized experience.
- User sees recommended programs.
- User opens one program and sees all the important details.
- User starts the program.
- User follows steps and tracks milestones.
- User logs diary updates with photo placeholders and observations.
- User sees visual progress.
- User optionally turns part of the journey into a public showcase post.
- The post enters moderation state.
- User later sees it as approved or rejected.
- Approved posts appear in the public showcase feed.

CONTENT PERSONALIZATION
Use age personalization in a gentle way:
- simpler tone for younger users
- clearer safety reminders for beginners
- more confidence-building and guided language

Do not make age personalization feel like a heavy account setup. Keep it light, private, and secondary to the main learning flow.

DESIGN DIRECTION
The product should feel:
- crystal-themed
- calm and bright
- slightly magical but still educational
- science-meets-craft
- modern and polished
- friendly and motivating

Visual inspiration should come from:
- crystals
- light refraction
- gradients
- soft glowing accents
- clean cards
- progress indicators
- gentle achievement moments

The design should not feel childish in a cartoon way. It should feel welcoming, a little magical, and thoughtful.

COPY STYLE
Use mostly Vietnamese UI copy for the visible product interface.
Keep text short, friendly, and easy to understand.
Avoid technical jargon.

SEED CONTENT TO GENERATE
Please create realistic sample content for the demo, including:
- 3 sample programs
- 1-2 sample milestones for each program
- 2-3 sample diary entries with image placeholders
- 3-4 sample approved public showcase posts
- 1 sample rejected showcase post with a short moderation reason
- 1 sample pending showcase post

Keep the seed content representative, not excessive. Use enough sample content to make the demo feel alive without making the app feel cluttered.

IMPORTANT SCOPE GUARDRAILS
Do not add any of the following:
- comments
- private messaging
- following or friend features
- group/community chat
- open posting without moderation
- social profile gamification as a major feature
- complicated admin systems unless needed only as a light state or placeholder

The app should feel complete because the core learning journey is strong, not because it has every possible social feature.

EXPECTED OUTPUT
I want a believable MVP demo with:
- a clear and consistent information architecture
- attractive crystal-themed visuals
- well-structured program screens
- strong private diary experience
- a clearly moderated public showcase area
- enough realistic sample content that the demo already feels alive

SUCCESS CRITERIA
- No lorem ipsum or empty generic placeholders.
- The app must clearly separate private diary content from public approved showcase posts.
- The main learner journey must feel connected from program discovery to progress tracking to optional public sharing.
- The product should feel like a crystal-growing learning companion, not a generic course app and not a social network.
- The UI should feel polished enough to show a client immediately.

Please prioritize product clarity, emotional warmth, and a smooth user journey.
```

## Quick Usage Tip
If the first result from the app builder becomes too generic or turns into a full social platform, immediately give a second prompt saying: “Reduce social complexity. Keep comments disabled. Make the product feel more like a personalized learning journey and less like a social feed.”
