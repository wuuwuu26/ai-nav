# DevAI Hub - Geek AI & Developer Curated Navigation

> **English** | [简体中文](README_CN.md)

> A modern, lightweight, beautifully designed AI tools & full-stack developer navigation site and productivity workbench, built with **React 19 + TypeScript + Vite 6 + Tailwind CSS v4**.

---

## ✨ Key Features

- 🚀 **Rich and comprehensive AI resource ecosystem**:
  - **Hot picks**: DeepSeek, Claude 3.7, Cursor, v0, Ollama, Hugging Face and other top-tier tools;
  - **LLMs & chat assistants**: DeepSeek R1, ChatGPT, Claude, Kimi, Qwen, Perplexity, GLM-4, etc.;
  - **AI coding & agent assistants**: Cursor, GitHub Copilot, v0.dev, Bolt.new, Windsurf, Trae, Replit Agent, etc.;
  - **AI image & multimedia creation**: Midjourney, FLUX.1, Kling AI, Suno, Stable Diffusion, Runway, etc.;
  - **Open-source LLM frameworks & model hubs**: Hugging Face, Ollama, Dify.ai, LangChain, vLLM, ModelScope, etc.;
  - **Cloud services & dev infrastructure**: Vercel, Cloudflare, Supabase, Neon Serverless Postgres, Railway, Upstash, etc.;
  - **High-frequency developer productivity tools**: GitHub, Excalidraw, Postman / Hoppscotch, Raycast, Bundlephobia, Transform Tools, etc.

- 🔍 **Multi-engine aggregation & instant full-library search**:
  - **Live in-site filtering**: matches names, descriptions, tags and links as you type;
  - **Global hotkey**: press `/` to focus the search box instantly;
  - **External engine quick jumps**: seamlessly switch between DeepSeek search, Google search and GitHub repo search;
  - **Category tags & pricing filters**: one-click filters such as "Free", "Open Source", "Free Trial", "AI IDE", "Top Domestic".

- ⭐ **Personal favorites & custom entries (LocalStorage)**:
  - **One-click favorites**: star any card to add it to "My Favorites";
  - **Custom site entries**: register your own private services, intranet wikis or daily sites, persisted locally in the browser.

- 🛠️ **Built-in developer toolbox (runs offline, privacy-friendly)**:
  - **Prompt template library**: curated templates for architecture refactoring, RESTful API design, SQL performance tuning, Git commit conventions, etc., editable online with one-click copy;
  - **JSON formatter & validator**: 2-space/4-space pretty-print, single-line minify, syntax error highlighting;
  - **Timestamp & codec conversion**: live Unix timestamp conversion, Base64 encode/decode, URL encode/decode.

- 🎨 **Modern UI / UX**:
  - Full **dark mode** and **light mode** support with free switching;
  - Auto-loads HD favicons with a gradient initial-letter badge as fallback;
  - Responsive sidebar (smart drawer on mobile), floating back-to-top button.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Build tool**: Vite 6
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Persistence**: browser LocalStorage

---

## 🚀 Quick Start

### 1. Enter the project directory
```bash
cd ai-nav
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the local dev server
```bash
npm run dev
```
Then open `http://127.0.0.1:5173/` in your browser.

### 4. Production build
```bash
npm run build
```
Build output goes to `dist/`, ready to deploy on **Vercel**, **Cloudflare Pages**, **GitHub Pages** or any static web server (Nginx / Caddy).

---

## 📁 Project Structure

```text
ai-nav/
├── src/
│   ├── components/
│   │   ├── AddSiteModal.tsx     # Custom site entry modal
│   │   ├── CategorySection.tsx  # Category sections and card grid
│   │   ├── DevToolsModal.tsx    # Built-in lightweight dev toolbox (Prompt/JSON/timestamp)
│   │   ├── Header.tsx           # Top navigation bar (theme toggle, toolbox entry)
│   │   ├── NavCard.tsx          # Site card (favicon/badges/favorite/external link)
│   │   ├── SearchBar.tsx        # Search and quick filter bar
│   │   ├── Sidebar.tsx          # Responsive category sidebar
│   │   └── Toast.tsx            # Global toast notifications
│   ├── data/
│   │   └── navData.ts           # Full dataset of curated AI & developer tools
│   ├── types/
│   │   └── index.ts             # TypeScript type definitions
│   ├── App.tsx                  # Main page and global state coordination
│   ├── index.css                # Tailwind CSS styles
│   └── main.tsx                 # React entry point
├── index.html                   # HTML template and site metadata
├── vite.config.ts               # Vite build config
└── package.json                 # Dependencies and scripts
```
