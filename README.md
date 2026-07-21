# CineQuiz

A cinematic movie-title guessing game built with React, TypeScript, Redux Toolkit, and Tailwind CSS.

CineQuiz turns the classic hangman format into a polished movie challenge with keyboard input, async title loading, reveal states, restart flow, success/failure animations, and demo-safe fallback data.

> Live demo: deployment link coming shortly.

## What it demonstrates

- Production-minded React + TypeScript component structure
- Redux Toolkit state management for game lifecycle, guesses, win/loss state, and resets
- Async movie-title loading with support for a live TMDB API integration
- Offline fallback movie list so the public demo works without exposing API secrets
- Keyboard-first interaction with clickable on-screen controls
- Shortcut support: `1` for a new movie and `2` to reveal the answer
- Game-state feedback with confetti on success and a failure animation on loss
- Responsive, recruiter-friendly UI with clear visual hierarchy

## Tech stack

- React
- TypeScript
- Redux Toolkit
- Tailwind CSS
- Radix UI primitives
- Lucide React icons
- Axios
- Vite

## API behavior

CineQuiz can load movie titles from TMDB when environment variables are configured:

```env
VITE_MOVIEDB_BASE_URL=
VITE_MOVIEDB=
```

If those values are not present, the app automatically uses a curated local movie list. This keeps the hosted demo stable and avoids exposing API keys in public source code.

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite.

## Build

```bash
npm run build
```

## Project focus

This project is intentionally small but complete. It is designed to show frontend product polish, state-driven UI behavior, async data handling, keyboard accessibility, and reliable fallback handling in a public demo.
