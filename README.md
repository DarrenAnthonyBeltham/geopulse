# 🌍 GeoPulse - The Ultimate Travel Intelligence Platform

> **Live Demo:** [Insert Your Vercel/Netlify Link Here]

GeoPulse is a modern, serverless "Super App" for travelers. It aggregates real-time data from 7+ different public APIs to provide a comprehensive dashboard for trip planning, budgeting, and exploration. 

I built this project to demonstrate how a complex, feature-rich application can be engineered using **Vue 3** and modern frontend architecture without the need for a heavy backend database.

## 🚀 The Goal
The goal was to create a travel tool that feels "Elite" — focusing heavily on **User Experience (UX)**, smooth **Micro-interactions**, and **Data Visualization**. It solves real travel pain points: "Do I need a visa?", "What is the currency rate?", "Is it safe?", and "What should I pack?".

## ✨ Key Features

### 🧭 Command Center (Home)
* **Real-time Search:** Filter countries by region or name instantly.
* **Smart Sorting:** Sort destinations by Population or Name.
* **"Feeling Lucky":** A gamified randomizer to discover new places.

### 📊 Country Intelligence
* **Live Dashboard:** Real-time Weather (OpenMeteo), Currency Rates (Frankfurter), and Local Time.
* **Interactive Maps:** Embedded Google Maps & Transport PDF downloads.
* **Cultural Insights:** Tipping etiquette, Power plug guides, and Safety Index scores.
* **Smart Visa Checker:** Simulates entry requirements based on your passport.

### 🤖 AI & Tools
* **AI Trip Planner:** Generates detailed 3-10 day itineraries with specific morning/afternoon/evening activities based on budget and city.
* **Financial Tools:** "Big Mac" Cost of Living index & Currency Calculator.
* **Travel Journal:** A persistent diary (saved to LocalStorage) to record memories.
* **Phrasebook:** Text-to-Speech audio guide for essential local phrases.

### 🛠️ Technical Highlights
* **Architecture:** Vue 3 (Composition API) + Vite.
* **State Management:** Pinia (for Auth, Favorites, and Journal persistence).
* **Styling:** Bootstrap 5 with a custom "Glassmorphism" CSS engine and Dark Mode.
* **Performance:** Staggered animations, Skeleton loading states, and Lazy routing.
* **Serverless:** 100% frontend-based. All user data is persisted via Browser LocalStorage.

## 🧰 Tech Stack

| Category | Technology |
| :--- | :--- |
| **Framework** | Vue.js 3 (TypeScript) |
| **Build Tool** | Vite |
| **State** | Pinia |
| **Routing** | Vue Router |
| **HTTP Client** | Axios |
| **Styling** | Bootstrap 5 + Custom CSS Variables |
| **Icons** | Bootstrap Icons (BI) |

## 🔌 APIs Integrated
* **REST Countries:** Core geographic data.
* **Open-Meteo:** Live weather forecasts.
* **Frankfurter:** Currency exchange rates.
* **Nager.Date:** Public holiday calendars.
* **Ticketmaster:** Live event discovery.
* **Google Flights/Booking:** Deep linking for reservations.
