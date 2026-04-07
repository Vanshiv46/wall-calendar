# 📅 Wall Calendar — Interactive React Component

A polished, responsive wall calendar component built for the **Frontend Engineering Challenge**. Inspired by the aesthetics of a physical wall calendar, this component transforms the familiar desk-calendar experience into a fluid digital interface.

---

## ✨ Live Demo

👉 [🔗 View Live Project](https://wall-calendar-47347lrqd-vanshiv46s-projects.vercel.app/)
---

## 🎯 Features

### Core Requirements ✅
- **Wall Calendar Aesthetic** — Prominent hero image panel that changes uniquely per month, with floating emoji scenes and ambient particle animations
- **Day Range Selector** — Click a start date, hover to preview the range, click end date to confirm. Visual states: start (filled circle), end (filled circle), in-between (tinted band)
- **Integrated Notes Section** — Auto-saves notes per day, per range, or per month using `localStorage`. Notes persist across sessions.
- **Fully Responsive** — Desktop: side-by-side hero + grid. Mobile: stacked vertically, fully touch-friendly.

### Creative Extras 🌟
- **Page-flip animation** when switching months (CSS perspective transform)
- **12 unique visual themes** — each month has a distinct color gradient, emoji, and scene label
- **Holiday markers** — Indian + international holidays auto-highlighted
- **Note indicator dots** — Days with saved notes show a ✦ marker
- **Month quick-nav strip** — Jump to any month instantly
- **Selection hint toast** — Bottom floating bar guides user through the two-click range flow
- **Particle animations** — Ambient floating particles on the hero image
- **No AI-feel** — Custom typography (Playfair Display + DM Mono), warm paper texture palette

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/wall-calendar.git
cd wall-calendar

# Install dependencies
npm install

# Start development server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

---

## 🧑‍💻 Tech Stack

| Tool | Purpose |
|------|---------|
| React 18 | Component framework |
| CSS Modules (plain CSS) | Scoped styling, no CSS-in-JS overhead |
| Google Fonts | Playfair Display + DM Sans + DM Mono |
| localStorage | Client-side note persistence |

**Zero dependencies** beyond React itself — no date library, no icon pack, no UI kit. Everything is custom.

---

## 📐 Architecture Decisions

### State Management
All state lives in the `Calendar` component using `useState` and `useCallback`. There's no Redux or context needed — the component is self-contained and portable.

### Date Logic
Pure vanilla JS `Date` API — no moment.js, no date-fns. This keeps the bundle tiny and the logic transparent.

### Notes Persistence
Notes are keyed as:
- `{year}-{month}-{day}` for single days
- `range-{startDate}-{endDate}` for date ranges  
- `month-{year}-{month}` for general monthly notes

Auto-saved on every keystroke to `localStorage`.

### Responsive Strategy
Two-column grid on desktop (≥700px), single-column stack on mobile. The hero panel shrinks gracefully, and the month-nav strip adjusts font sizes.

---

## 📁 Project Structure

```
src/
├── App.js              # Root component, month image data
├── App.css             # Global resets
├── index.js            # React entry point
├── index.css           # Body defaults
└── components/
    ├── Calendar.js     # Main calendar logic & layout
    └── Calendar.css    # All calendar styles
```

---

## 🎨 Design Choices

The calendar draws from **editorial magazine design** — generous white space, a dominant image panel as the "cover", and a clean typographic grid for the dates. The warm `#f0ede8` background mimics paper texture without using actual images, keeping the bundle light.

Typography pairing:
- **Playfair Display** (month name) — editorial authority
- **DM Sans** (body, days) — friendly, modern legibility  
- **DM Mono** (year, notes, labels) — technical precision

---

## 📬 Submission Info

Built with ❤️ for the Frontend Engineering Challenge.  
Focus: component architecture, CSS craftsmanship, state management, and UX attention to detail.
