---
title: "Nebula"
description: "A personal project I built to solve a real need of my own: a private place to keep my photos and videos, on my own hardware instead of the cloud. An iPhone and Android app built with Expo talks to a FastAPI and PostgreSQL server at home, with every photo backed up to a second computer. Building it taught me more than any course."
date: "2026-10-21"
cover: "/projects/nebula/cover.mp4"
technologies:
  - React Native
  - Expo
  - TypeScript
  - FastAPI
  - PostgreSQL
  - Python
  - Docker
  - Tailscale
  - restic
draft: false
---

## What is it?

**Nebula is a personal project, built to solve a need I had.** I wanted to keep my photos and videos somewhere I control, on hardware I own, instead of depending on iCloud.

It's my own version of iCloud Photos: a laptop at home runs the server, and a phone app (iPhone and Android, one codebase) lets two people back up their photos, browse them and share some with each other.

I could have installed a ready-made solution like [Immich](https://immich.app). I built it by hand because I also wanted to learn how an app like this really works, from the database indexes to the pinch-to-zoom gesture.

---

## How it works

```
 Phone (Expo app)           Laptop at home (Ubuntu)                  Windows PC
┌──────────────┐ Tailscale ┌───────────────────────────────┐ restic ┌──────────────┐
│ Library      │◄─────────►│ FastAPI ──► PostgreSQL        │───────►│ Encrypted,   │
│ Upload       │ (private, │    │        (Docker)          │        │ dated        │
│ Settings     │  HTTPS)   │    └──────► External HDD      │        │ snapshots    │
└──────────────┘           │            (photos & videos)  │        └──────────────┘
                           └───────────────────────────────┘
```

- **The app** only talks to the API, over **Tailscale**, a private encrypted network. Nothing is exposed to the internet.
- **The API** decides who can see what, stores each file once and manages the trash.
- **PostgreSQL** keeps the information *about* each photo; the files themselves live on an **external hard drive**.
- **restic** copies everything (photos plus a database export) to a second computer as encrypted, dated snapshots, so even a photo deleted by mistake can be recovered.

---

## Feature tour

### Login and Face ID

<video class="phone" src="/projects/nebula/login.mp4" controls muted loop playsinline preload="metadata" aria-label="Unlocking Nebula and logging in"></video>

You type your password once; after that the app unlocks with Face ID and locks itself after 5 minutes in the background. There's no sign-up: accounts are created on the server.

### The Library

<video class="phone" src="/projects/nebula/library.mp4" controls muted loop playsinline preload="metadata" aria-label="Scrolling the Library, changing columns and jumping between months with the scrubber"></video>

Every photo, newest first, grouped by month. Pinch to switch between 1, 3, 5 and 9 columns, filter by **All / Mine / Shared**, and drag the scrubber on the right to jump to any month instantly, even with tens of thousands of photos.

<video class="phone" src="/projects/nebula/filters.mp4" controls muted loop playsinline preload="metadata" aria-label="Filtering the Library by All, Mine and Shared"></video>

### The viewer

<video class="phone" src="/projects/nebula/viewer-info.mp4" controls muted loop playsinline preload="metadata" aria-label="Opening a photo full screen, the Info panel and sharing from the viewer"></video>

Tap a photo and it zooms out of its square to full screen. Swipe through the whole gallery, pinch to zoom into the full-resolution original, watch videos with custom controls, and swipe up for the date, camera and location.

### Uploading

<video class="phone" src="/projects/nebula/upload.mp4" controls muted loop playsinline preload="metadata" aria-label="Choosing a photo in the upload picker and uploading it as shared"></video>

The app's own picker shows the phone's photos with a ✓ on those already backed up. Before sending anything, the phone asks the server if it already has that exact file (by its SHA-256 fingerprint), so duplicates are never uploaded. Uploads continue in the background, private by default or shared.

### Managing photos

<video class="phone" src="/projects/nebula/select.mp4" controls muted loop playsinline preload="metadata" aria-label="Selecting photos by dragging, moving them to the Trash and sharing a selection"></video>

Select photos by tapping or by sliding a finger across them, then share, make private, save to the phone (as the original or as JPEG) or delete. Saving skips photos that are still on the phone, so nothing gets duplicated.

<video class="phone" src="/projects/nebula/save.mp4" controls muted loop playsinline preload="metadata" aria-label="Saving photos from the viewer back to the phone"></video>

### Trash and settings

<video class="phone" src="/projects/nebula/trash.mp4" controls muted loop playsinline preload="metadata" aria-label="Restoring and erasing photos in the Trash"></video>

Deleted photos stay in the Trash for 30 days, where they can be restored or erased. Photos the other person shared can't be erased early: they wait the full 30 days so their owner can still restore them. Settings hold Face ID, the download format, changing the password and logging out.

---

## Under the hood

- **Each file is stored once.** If both people upload the same photo, it's kept once on disk but each person gets their own gallery entry, with their own visibility and trash.
- **Privacy on every endpoint.** A photo you aren't allowed to see answers `404`, as if it didn't exist.
- **Fast at any size.** With 50,000 test photos, pages went from 45-250 ms to **about 5 ms** thanks to cursor pagination and query changes that let Postgres use its indexes.
- **Any phone's photos.** HEIC, JPEG, PNG, RAW (DNG) and video, with date, local time zone, GPS and camera read from each file.
- **Secure by default.** Argon2 passwords, JWT tokens, a limit on failed logins and HTTPS inside the private network.
- **Always on.** A systemd service that starts at boot, recovers from crashes and empties the expired trash every day.
- **Tested.** 124 backend tests (pytest) and 49 app tests (Jest).

---

## Challenges

**Gestures fighting each other.** Swiping, pinching and swipe-down-to-close kept stealing each other's touches in the viewer. I wrote my own three-page pager where all gestures live in one system, so they work together smoothly.

**Big videos.** Fingerprinting a 1 GB video on the phone would have taken 17 minutes. Files over 64 MB now go straight to the server, which detects duplicates itself.

**Dates in the wrong month.** Postgres stores times in UTC, which put a New Year's photo from Spain in the previous December. Each photo now keeps its own time-zone offset, so it's grouped by the date it was really taken.

---

## What I learned

This is the project where I learned the most, because it was mine: no tutorial to follow and nobody to hand the hard parts to.

- **Building for a real need**, and letting my own use of the app decide what to improve next.
- **Database performance**: reading query plans, designing indexes and measuring instead of guessing.
- **Mobile development**: gestures, animations, large lists and memory limits on a phone.
- **Running my own server**: services, private networking, storage and backups.
- **Documenting decisions**: every important choice is written down with its alternatives and the reason it won.
