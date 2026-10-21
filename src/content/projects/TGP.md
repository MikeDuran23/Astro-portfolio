---
title: "The Gamer's Place"
description: "A full-stack web application built as my Bachelor's Thesis. It helps users keep track of the games they have played, discover new titles through a personalized recommendation system, and manage their personal gaming library."
date: "2026-07-03"
cover: "/home.mp4"
technologies:
  - Vue.js
  - Java
  - Spring Boot
  - MongoDB
  - GraphQL
github: "https://github.com/MiguelDuranAltes/TheGamersPlace"
external: "https://project-one.example.com"
draft: false
---

# The Gamer's Place

## What Is It?

**The Gamer's Place** is a full-stack web application built for my Bachelor's Thesis in Computer Engineering. It's a platform designed to solve a real problem in the gaming industry: with thousands of games released every year across multiple platforms, it's nearly impossible to discover genuinely good titles that match your interests.

Think of it as **your personal gaming curator**. Organize your library, track what you've played, write and read reviews, compare games, and discover personalized recommendations all in one place.

---

## The Problem We're Solving

**Why This Project Exists:**

- **Too many games, too little time** – Steam alone releases thousands of games yearly, many go unnoticed
- **Poor recommendations** – Most platforms prioritize commercial hits over genuine discovery
- **No central hub** – You need multiple apps to manage wishlists, favorites, and game info
- **Indie game saturation** – Brilliant indie games get buried because they lack marketing budgets
- **Discoverer's dilemma** – How do you find your next favorite game without endless scrolling?

This project was born from the conviction that **gamers deserve better tools to discover games they'll actually love**.

---

## Core Features

- **Secure Authentication** – Register and log in to access personalized features
- **Personal Library** – Organize games into favorites, played, and custom lists
- **Extensive Catalog** – Browse 10,000+ real games with detailed information
- **Advanced Search & Filters** – Find games by genre, platform, year, rating, and more
- **Smart Recommendations** – Personalized suggestions based on your preferences and mood
- **Game Comparator** – Compare two games side-by-side to make decisions easier
- **User Reviews** – Write and read reviews with ratings and community feedback
- **Custom Lists** – Create public or private game collections with meaningful categories
- **User Profiles** – Showcase your gaming history and lists to the community
- **Admin Panel** – Moderation tools to maintain a safe, quality community

---

## Feature Tour

### Registration & Login
<video controls preload="metadata" playsinline>
  <source src="/auth.mp4" type="video/mp4" controls muted>
  Your browser doesn't support HTML5 video.
</video>

Secure authentication system built with Spring Security and JWT tokens. Create an account or log in to access your personalized gaming hub. Your data is encrypted and protected.

---

### Home Page
<video controls preload="metadata" playsinline>
  <source src="/home.mp4" type="video/mp4" controls muted>
  Your browser doesn't support HTML5 video.
</video>

Your entry point to the platform. See the latest releases, top-rated games, featured titles, and quick access to key sections: the complete catalog, personalized recommendations, and your profile. The navigation bar makes everything just one click away.

---

### Game Catalog with Advanced Filtering
<video controls preload="metadata" playsinline>
  <source src="/catalog.mp4" type="video/mp4" controls muted>
  Your browser doesn't support HTML5 video.
</video>

Explore our curated collection of 10,000+ games with pagination and powerful filters:
- Search by game name
- Filter by genre, platform, release year, and rating
- Sort by rating, release date, and popularity
- Add games to favorites instantly

The interface is built for speed and intuitive exploration—no endless scrolling, just smart discovery.

---

### Game Details & Library Management
<video controls preload="metadata" playsinline>
  <source src="/details.mp4" type="video/mp4" controls muted>
  Your browser doesn't support HTML5 video.
</video>

Each game has a dedicated page packed with information:
- Full game description and metadata
- Supported platforms and stores
- Genres, ratings, and reviews
- Screenshot carousel
- Year and release details

From here you can:
- **Add/Remove from Favorites** – Flag games you love
- **Mark as Played** – Track what you've completed
- **Create Custom Lists** – Add to personalized collections on the fly
- **Write Reviews** – Rate and comment publicly, or just rate privately
- **Read Community Reviews** – See what other gamers think

---

### Game Comparator
<video controls preload="metadata" playsinline>
  <source src="/compare.mp4" type="video/mp4" controls muted>
  Your browser doesn't support HTML5 video.
</video>

Torn between two games? Use the comparator to see them side-by-side:
- Compare platforms, genres, ratings, and pricing
- Visual layout makes differences instantly clear
- Make informed decisions in seconds

This is one of the platform's most unique features—most gaming sites don't offer this level of comparison.

---

### User Profile & Lists
<video controls preload="metadata" playsinline>
  <source src="/profile.mp4" type="video/mp4" controls muted>
  Your browser doesn't support HTML5 video.
</video>

Your gaming dashboard. See at a glance:
- **Your Favorites** – Games you love (publicly visible)
- **Games Played** – Your completion history (publicly visible)
- **Custom Lists** – Collections you've created (choose public or private)
- **Your Reviews** – All comments and ratings you've published
- **Personal Stats** – Games played, hours invested, achievements

Edit your profile, customize list visibility, and manage your gaming identity.

---

### Personalized Recommendation System
<video controls preload="metadata" playsinline>
  <source src="/recom.mp4" type="video/mp4" controls muted>
  Your browser doesn't support HTML5 video.
</video>

This is the **heart of the platform**. Instead of showing random suggestions, the recommendation engine works like this:

1. **Interactive Preference Survey** – Pick your favorite from 10 pairs of games (just what you're in the mood for right now)
2. **Smart Analysis** – The system combines:
   - Your current choices
   - Your general preferences
   - Games you've loved in the past
   - Genre affinities
3. **Personalized Results** – Get 10 tailored recommendations
4. **Save as List** – Convert recommendations into a custom list instantly

The genius here: **recommendations change based on your mood**. You can get different suggestions the next time you run it, depending on what you select.

---

## Technical Architecture

### Why This Matters

Building this wasn't just about a nice interface—it's about **solid engineering**:

**Frontend (Vue.js)**
- Reactive, modern UI that responds instantly to user actions
- Component-based architecture for reusability and maintainability
- Responsive design that works seamlessly on mobile, tablet, and desktop

**Backend (Spring Boot + Java)**
- RESTful and GraphQL APIs for flexible client-server communication
- JWT-based authentication for stateless, secure sessions
- Modular code structure following clean architecture principles
- Role-based access control (users, admins, moderators)

**Database (MongoDB)**
- NoSQL structure perfect for complex gaming data (multiple platforms, genres, ratings per game)
- Flexible schema to evolve with new features
- Indexed queries for fast searches across 10,000+ games

**Data Pipeline**
- Integration with RAWG.io API (~500,000 games available)
- Custom Python scripts for data extraction and cleaning
- Intelligent filtering to select relevant games and metadata
- Persistent JSON backups for data integrity

---

## Development Journey (7 Sprints)

I followed **Scrum methodology** to manage this full solo project:

| Sprint | Duration | Focus |
|--------|----------|-------|
| **Sprint 1** | 3 weeks | Technology research, framework evaluation, architecture planning |
| **Sprint 2** | 3 weeks | Data extraction from API, user story mapping, UI prototypes in Figma |
| **Sprint 3** | 3 weeks | Backend foundation, frontend setup, database schema design |
| **Sprint 4** | 3 weeks | Authentication system, initial catalog, user database |
| **Sprint 5** | 3 weeks | Advanced search, game details pages, custom list creation |
| **Sprint 6** | 3 weeks | User review system, game comparator tool |
| **Sprint 7** | 3 weeks | Visual recommendation engine, admin panel, final polish |

Tools used: **GitHub** (version control), **Taiga** (project management), **VS Code + IntelliJ** (development), **Postman** (API testing), **Figma** (design).

---

## What I Learned

This was a comprehensive full-stack learning experience:

**Backend Mastery**
- REST API design and GraphQL for optimized data fetching
- Spring Security and JWT authentication flow
- Database design for complex relationships
- Query optimization for 10,000+ game searches
- Admin and role-based authorization

**Frontend Excellence**
- Vue.js state management and reactive patterns
- Building responsive, accessible UIs
- Component composition and reusability

**Recommendation Algorithms**
- Preference matching logic
- Weighting systems for diverse factors
- Personalization beyond simple "users who like X also like Y"

**Full-Stack Integration**
- Frontend-backend communication patterns
- Error handling and graceful degradation
- Scalable architecture design

**Professional Practices**
- Scrum ceremonies and sprint cycles
- Code reviews and clean code principles
- Technical documentation
- Version control best practices

---

## What Makes This Project Different

1. **Genuine Discovery** – Not optimized for sales; optimized for what *you* actually want to play
2. **Visual Comparator** – Rare feature that helps solve decision paralysis
3. **Mood-Based Recommendations** – Your suggestions change based on current preferences, not just history
4. **Community Reviews** – Real player feedback, not just aggregated scores
5. **Admin Oversight** – Moderation tools keep the community healthy
6. **Scalable Design** – Built from the ground up to grow into a real platform

---

## Technical Stack

- **Frontend:** Vue.js (reactive, component-based)
- **Backend:** Java + Spring Boot (REST + GraphQL)
- **Database:** MongoDB (flexible, scalable)
- **Authentication:** Spring Security + JWT
- **Data Source:** RAWG.io API + custom ETL pipeline
- **Project Management:** Scrum (7 sprints, 21 weeks)
- **Version Control:** GitHub

---

## Future Improvements

The platform is production-ready, but there's always room to grow:

- **Social Features** – Friend lists, activity feeds, shared playlists
- **Platform Integration** – Auto-import your Steam/PlayStation library
- **Better Recommendations** – Machine learning and collaborative filtering
- **Achievements & Trophies** – Gamify the platform itself
- **Mobile App** – Native iOS/Android experiences
- **User Profiles 2.0** – Statistics, achievements, customizable themes
- **Community Spaces** – Forum discussions, game clubs
- **Streaming Integration** – Watch streams of games you're interested in

---

## Get the Code

**GitHub:** [github.com/MiguelDuranAltes/TheGamersPlace](https://github.com/MiguelDuranAltes/TheGamersPlace)

The complete source code is public. Feel free to explore, fork, or use as a reference for your own projects!

---

## Impact

This project represents a significant achievement in my journey as a developer. It's not just a thesis requirement—it's a complete, functional platform that solves a real problem for gamers everywhere. It demonstrates my ability to design, architect, build, and deploy a complex full-stack application **from scratch**, following professional development practices.

If you're hiring, this is the kind of work I do: thoughtful, user-centered, technically sound, and scalable.
