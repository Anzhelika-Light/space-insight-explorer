# 🚀 Spaceflight News Explorer

A modern, responsive web application built for the Codebridge technical assessment. It provides an intuitive interface to browse and search for the latest space exploration news using the Spaceflight News API.

## 🔗 Живе посилання (Live Demo)

[https://space-insight-explorer.netlify.app/]

## 📋 Features

• **Dynamic Search:** Filter articles by keywords across both titles and summaries.
• **Smart Sorting:** Advanced logic that prioritizes search results (articles with matches in the title appear before those with matches only in the description).
• **Text Highlighting:** Real-time visual highlighting of search queries within the results using Regular Expressions.
• **Global State Management:** Powered by Redux Toolkit to persist search queries and article data during navigation.
• **Responsive Design:** Fully optimized for mobile, tablet, and desktop views using Material UI.
• **Smooth UX:** "Sticky" navigation and modern layout effects (content overlapping images) for a premium feel.

## 🛠 Tech Stack

• **Framework:** React 19 (Vite)
• **Language:** TypeScript (Strictly typed API interfaces and components)
• **State Management:** Redux Toolkit (RTK)
• **UI Library:** Material UI (MUI)
• **Styling:** SCSS (Preprocessor used for global variables, typography, and advanced styling)
• **Routing:** React Router
• **HTTP Client:** Axios
• **API:** [Spaceflight News API (v4)](https://api.spaceflightnewsapi.net/v4/docs/).

## 📐 Architecture and Structure

The project is organized according to the **Separation of Concerns** principle:

- **`/src/components`** — reusable UI components (article cards, search input, etc.).
- **`/src/pages`** — main application pages (Home Page and Article Page).
- **`/src/store`** — Redux store configuration and slices for centralized state management.
- **`/src/services`** — service layer for API interaction and Axios configuration.

## 🚀 Getting Started

1. Clone the repository:
   Bash
   git clone https://github.com/Anzhelika-Light/space-insight-explorer
2. Install dependencies:
   Bash
   npm install
3. Run the development server:
   Bash
   npm run dev
