---
title: "Poustfit"
description: "A social network for outfits, built at HackUDC 2025 with three teammates. Upload a photo of what you're wearing and Poustfit finds similar products from Inditex's catalogue, using Inditex Tech's Visual Search API."
date: "2025-02-23"
technologies:
  - Vue.js
  - Spring Boot
  - PostgreSQL
  - Inditex API
  - Playwright
  - Java
  - Tailwind CSS
  - PrimeVue
  - JWT
cover: "/projects/poustfit/home.webp"
github: "https://github.com/MiguelDuranAltes/Poustfit"
draft: false
---

## What is it?

**Poustfit** is a social network where people share their outfits and can recreate other people's looks with real products. You publish a photo of what you're wearing, and the post page lists similar items from Inditex's catalogue, each one linking to its product page.

It was built during **HackUDC 2025** by a team of four. The challenge was to build something on top of the **Inditex Tech Visual Search API**, an endpoint that receives the URL of a photo and returns links to similar products.

---

## How it works

The idea is simple, but getting a photo from a phone to a product list involves several services:

1. **Publish.** The user picks a photo and a title. The Vue client creates the post, then sends the image to the server.
2. **Get a public URL.** Inditex's API doesn't accept an image file, only a URL. So the server uploads the photo to **ImgBB** and stores the returned public link, alongside its own copy on disk.
3. **Ask Inditex for matches.** When someone opens a post, the server authenticates with Inditex using OAuth2 (client credentials), then calls the Visual Search endpoint with the photo's public URL and returns the matching products.
4. **Browse the results.** Products load in pages of 40 and keep loading as you scroll.
5. **Preview a product.** Clicking a product shows its photo and a link to the Inditex page. The API doesn't return product photos, so a **Playwright** browser opens the product page, captures the image and sends it back to the client.

---

## Features

- **Accounts.** Registration and login, with sessions handled through a JWT stored in a cookie.
- **Feed.** A paginated feed of everyone's outfits.
- **Outfit page.** The photo, author, date and title, plus the live list of similar Inditex products.
- **Favourites.** Like a post to save it, and see all your liked posts in one place.
- **Profile.** Your own account page with the outfits you've published.
- **Protected routes.** Only the welcome, login and register pages are public; everything else requires a session.

---

## Screens

These are design mockups of the app's main screens, rebuilt from the client code. The outfits, usernames and products are placeholders.

![Welcome screen with the Login and Register buttons](/projects/poustfit/welcome.webp)

![Login form](/projects/poustfit/login.webp)

![Registration form with a profile photo, description and password fields](/projects/poustfit/register.webp)

![Home feed with outfit cards](/projects/poustfit/home.webp)

![Post details with the list of similar Inditex products and a product preview](/projects/poustfit/details.webp)

![Publish form with a title and an outfit photo](/projects/poustfit/publish.webp)

![My profile with account info and published outfits](/projects/poustfit/profile.webp)

![My favorites](/projects/poustfit/favorites.webp)

---

## Challenges

**The API wants a URL, not a file.** Our users upload files from their devices, but the Visual Search endpoint only takes a link. We solved it by routing every upload through the ImgBB API to get a stable public URL. The codebase also still contains an unused Imgur client, a leftover from trying a different image host.

**No product photos in the response.** The API returns product names and links but not images, so we added a scraping step with Playwright to fetch the product photo from the Inditex page when a user clicks an item.

**Understanding the documentation.** At the start we struggled to understand the Inditex API docs, which left some confusing code in the first versions. We sorted it out and kept going.

---

## Architecture

**Frontend: Vue 3 + Vite**
- Components grouped by feature (home, details, publish, profile, favourites, login, register).
- **Pinia** for the authentication state, and **Vue Router** guards that redirect between public and private pages.
- **PrimeVue** components styled with **Tailwind CSS 4**, **Axios** for the API calls and **SweetAlert2** for confirmations.

**Backend: Spring Boot 3.4 on Java 21**
- Layered structure: controllers, services, repositories and DTOs, with a global exception handler that returns consistent error responses.
- **Spring Security** in stateless mode with a JWT filter (jjwt), and CORS configured for the client.
- **Spring Data JPA** with **PostgreSQL** for users, posts and likes.
- A separate `remote` package for the three external integrations: Inditex (authentication and search), ImgBB (image hosting) and Playwright (product photos).

---

## The team

Four of us built it together, working on both the frontend and the backend: Lucas Kwak, Miguel Marcos Trillo, Lucas Redondo and me. We split the work across the four of us and also handled the integration with the Inditex API and the other external services.

---

## What I learned

- **Working with third-party APIs.** Using ImgBB and the Inditex API saved us a huge amount of time compared with building those features ourselves, and taught me to plan around what an external API can and can't do.
- **Chaining services.** A single user action here touches the browser, our server, ImgBB, Inditex and a Playwright browser, so each integration had to be isolated and handled on its own.
- **Teamwork on a full-stack project.** Splitting a project four ways under hackathon time pressure, with frontend and backend moving in parallel, and ending with great results and a good understanding between us.

---

## What I would improve

- Run Playwright headless, reuse a single browser instance and cache product photos instead of launching a browser for every click.
- Deploy it. Today it runs locally, with the client origin and image storage paths configured for a development machine.
- Add real test coverage, which the hackathon timeline didn't allow.

---

## Get the code

**GitHub:** [github.com/MiguelDuranAltes/Poustfit](https://github.com/MiguelDuranAltes/Poustfit)

The repository contains both the Vue client and the Spring Boot server, and is released under the Apache 2.0 license.
