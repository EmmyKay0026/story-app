# 📚 StoryBook Web App

**An online-first, responsive web platform built with Next.js & Tailwind CSS.**

Users log in via phone number, browse and read stories, customize their theme, font, and text size, earn or purchase points, and save/favorite stories.

---

## 🚀 Features

- Phone number (OTP) authentication—no password needed
- Responsive design: mobile-first, optimized for Android and desktop browsers
- Theme options: Light, Dark, or System Default
- Font customization: Sans or Serif
- Adjustable font size: Small, Base, or Large
- Browse by story categories or search
- Unlock premium content with points (earn or subscribe)
- Save bookmarks and continue reading where you left off
- Rate and review stories

---

## 🧩 Built With

- [Next.js](https://nextjs.org) (App Router)
- [Tailwind CSS v4.1](https://tailwindcss.com) CSS-first styling
- [next-themes](https://github.com/pacocoursey/next-themes) for theme mode handling
- Custom hooks for `font` and `text size` user preferences

---

## 📦 Getting Started

### Prerequisites

- Node.js (v18+)

### Installation

1. Clone the repo
   ```bash
   git clone https://github.com/EmmyKay0026/story-app.git
   ```

````

2. Install dependencies

   ```bash
   cd storybook-webapp
   npm install
   ```
3. Configure environment variables
   Create `.env.local`:

   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=...
   NEXTAUTH_URL=https://your-domain.com
   ```
4. Run the dev server

   ```bash
   npm run dev
   ```
5. Visit [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Usage

* Login using phone number (and OTP optionally)
* Access the homepage to browse or search stories
* Navigate to story detail, then unlock or read episodes
* Customize theme/font settings in the Preferences page
* Track reading progress under **My Reads**, save favorites, and leave ratings
* Manage points and subscriptions from **Profile**

---

## 📁 Project Structure

```
/app
  /auth/login
  /home
  /story/[id]
  /read/[id]
  /profile
  /bookmarks
  /my‑reads
  /subscription
  layout.tsx
  page.tsx
/components
  /atoms
  /molecules
  /organisms
  /templates
  /styles
  style.css
/utils
  usePreferences.ts
/constants
```

---

## 🧪 Development

* **Formatting & linting:** Prettier and ESLint configured
* Mock data store and API: use `/constants` or `msw` to simulate endpoints
* Hot reload enabled via Next.js dev server

---


## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

Please ensure forks follow consistent code style and pass tests.
````

PUT /user/preferences

Updates user preferences (theme, fontSize).

Request body (partial update allowed):

{
"preferences": {
"theme": "dark",
"fontSize": "medium",
}
}
Response: User (as described in the Data model section above)

PUT /user/:userId/progress
Request{
episodeId: episodeId,
storyId: storyId
updatedProgess (updatedProgess of type UserProgress as described in the Data model section above)
}

Returns a detailed story, including episodes.

Response: Story (as described in the Data model section above)
