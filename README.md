# 💻 DevSphere — Developer Productivity Dashboard

DevSphere is a modern, developer-focused productivity dashboard built with React 19 and Vite. It brings together essential tools like task management, AI chat, tech news, data visualization, and more — all in one stylish and responsive interface.

> 🌐 Built by **Pinki Akter**, 2025.

---

## ✨ Features

- ✅ **Dashboard Overview** – Visualize project/task stats with a beautiful hero banner.
- 📂 **Project Manager** – Add, complete, filter, delete tasks (stored in `localStorage`).
- 🤖 **AI Chat Assistant** – Ask questions using OpenRouter AI (Mistral 7B).
- 📰 **News Feed** – Fetch articles from Dev.to, HackerNews, Medium, Hashnode, and Reddit.
- 📈 **Data Visualization** – Track live crypto prices and forex rates; GitHub contribution charts.
- 🍽️ **Recipe Finder** – Discover recipes by ingredients using TheMealDB API.
- 🌙 **Dark/Light Mode** – Seamless theming with toggle support.
- 🧭 **Responsive UI** – Built with Bootstrap 5 and custom CSS.
- 🔐 **Authentication UI** – Login/Register and user state via `localStorage`.

---

## 🗂️ Folder Structure

```text
DevSphere/
├── public/
├── src/
│ ├── assets/ # Static images, icons
│ ├── components/ # Reusable components (Navbar, Footer, Cards, Graphs)
│ ├── context/ # ThemeContext
│ ├── pages/ # Main route pages (Dashboard, NewsFeed, etc.)
│ ├── services/ # API service handlers (news, currency, openai)
│ ├── utils/ # AuthUtils (login/register mock logic)
│ ├── App.jsx # Main app entry
│ ├── main.jsx # Vite entry point
│ └── index.css # Global styles
├── .env # API keys and secrets
├── .gitignore
├── package.json
├── vite.config.js
└── README.md
```

---

## ⚙️ Setup & Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/devsphere.git
cd devsphere
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Add Environment Variables
Create a .env file:
VITE_OPENAI_API_KEY=your_openrouter_api_key

### 4. Run the App
```bash
npm run dev
```
Visit http://localhost:5173

---

## 🧪 Technologies Used

### 🧱 Frontend
- **React 19** – Modern UI library for building interactive interfaces
- **Vite** – Fast and optimized build tool
- **Bootstrap 5** – Responsive CSS framework
- **React Router DOM** – SPA routing and navigation
- **Chart.js + react-chartjs-2** – Data visualization with beautiful charts

### 🌙 Theming & State Management
- **Context API** – Global theme management (Dark/Light mode)
- **React Hooks** – `useState`, `useEffect`, `useContext` for functional components

### 📦 APIs & Data Integration
- **OpenRouter API** – Mistral 7B model for AI assistant
- **CoinGecko API** – Real-time cryptocurrency prices
- **ExchangeRate.host** – Live forex data
- **TheMealDB API** – Search meals by ingredient
- **News Sources** – Dev.to, HackerNews, Medium, Hashnode, Reddit (via dummy/fetch)

### 💾 Storage
- **localStorage** – Store user and project/task data persistently

### 🛠 Utilities
- **Custom Utils** – Auth handling, prompt templates, local data management

---

## 🧠 How to Use
- 🔐 Register/Login – Create a user (stored in localStorage).

- 📊 Dashboard – View project stats and recent tasks.

- 📂 Project Manager – Add/manage tasks per user.

- 📰 News Feed – Switch between sources for latest dev news.

- 🤖 AI Chat – Select a prompt template and ask anything.

- 📈 Data Visualization – View live data for crypto, forex, and GitHub contributions.

- 🍽️ Recipe Finder – Search recipes by ingredients.

---

## 🧩 Key Components

| Component                 | Description                                                                 |
|---------------------------|-----------------------------------------------------------------------------|
| `Navbar.jsx`              | Top navigation bar with routing, theme toggle, and user dropdown menu       |
| `Footer.jsx`              | Sticky footer with © info and social icons                                  |
| `Dashboard.jsx`           | Hero section, project stats, recent task list                               |
| `ProjectManager.jsx`      | Full-featured task CRUD interface (add, edit, delete, filter, paginate)     |
| `AiChat.jsx`              | AI assistant using OpenRouter (Mistral-7B), with prompt templates            |
| `NewsFeed.jsx`            | News reader from Dev.to, HackerNews, Medium, Reddit, Hashnode               |
| `DataVisualization.jsx`   | Combines currency tracking and GitHub contribution visualizations           |
| `CurrencyTracker.jsx`     | Bar chart of live cryptocurrency prices (via CoinGecko)                     |
| `ExchangeRateChart.jsx`   | Line chart showing exchange rates from USD to other currencies              |
| `GitHubContribution.jsx`  | GitHub contribution graph using image embed                                 |
| `RecipeFinder.jsx`        | Ingredient-based meal discovery using TheMealDB API                         |
| `ThemeContext.jsx`        | Context provider for managing Dark/Light theme across components            |
| `authUtils.js`            | LocalStorage-based mock authentication utilities                            |

--- 
## 🙌 Acknowledgements

Huge thanks to the following platforms and APIs that made this project possible:

- [🔗 OpenRouter](https://openrouter.ai) – for providing access to Mistral-7B AI assistant
- [💰 CoinGecko API](https://www.coingecko.com) – for real-time cryptocurrency prices
- [💱 ExchangeRate.host](https://exchangerate.host) – for live currency exchange rates
- [🍲 TheMealDB](https://www.themealdb.com) – for a free recipe API
- [📰 Dev.to](https://dev.to) – for open developer blog APIs
- [🧵 HackerNews](https://news.ycombinator.com) – for curated tech discussions
- [✍️ Medium](https://medium.com) – for article inspiration
- [🌐 Reddit & Hashnode] – for developer community content
- [🎨 Bootstrap](https://getbootstrap.com) – for styling and layout

---


🛡️ License
This project is for educational and demo purposes only.

---

👩‍💻 Author
Pinki Akter
📧 Email: pinki@example.com
🔗 GitHub: https://github.com/pinkfloyed

