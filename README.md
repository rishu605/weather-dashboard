Here is your complete `README.md` file in markdown format:  

```markdown
# 🌦️ Weather Dashboard - React App

A feature-rich **Weather Dashboard** built with **React, TypeScript, and Leaflet** to display **real-time weather data** and a **5-day forecast** for multiple user-selected cities. The app integrates **OpenWeatherMap API**, includes **drag-and-drop support**, and provides an **interactive map** for each city.

---

## 🚀 Features

### 🌍 **Weather Data & Forecast**
- Fetch **current weather conditions** (temperature, humidity, wind speed, etc.).
- Display a **5-day weather forecast** for each selected city.
- Shows a **loading spinner** while fetching data.

### 📌 **City Management**
- Users can **add cities** via an input field.
- **Remove** cities from the dashboard when no longer needed.
- Drag and drop cities to **rearrange** their order (persisted in local storage).

### 🗺️ **Interactive Map**
- Each city has a **dynamic map** (powered by Leaflet) showing its location.
- The map smoothly **updates and centers** on the selected city.

### 📦 **Optimized API Calls**
- Implements **retry mechanism with exponential backoff** in case of failures.
- Handles **API rate limits**, displaying user-friendly error messages.

### 🎨 **Smooth UI & UX**
- **Sidebar for the weather forecast** with smooth animations.
- **Error handling components** to display API issues.
- **Dark-themed responsive UI** optimized for mobile & desktop.

---

## 📁 Project Structure

```
📦 weather-dashboard
 ┣ 📂 src
 ┃ ┣ 📂 components
 ┃ ┃ ┣ 📜 WeatherDashboard.tsx  // Main dashboard handling cities
 ┃ ┃ ┣ 📜 CitySelector.tsx      // Input to add new cities
 ┃ ┃ ┣ 📜 WeatherCard.tsx       // Displays current weather info
 ┃ ┃ ┣ 📜 ForecastSidebar.tsx   // Sidebar with 5-day forecast & map
 ┃ ┃ ┣ 📜 CityMap.tsx           // Leaflet-based city map component
 ┃ ┃ ┣ 📜 Errors
 ┃ ┃ ┃ ┣ 📜 WeatherError.tsx    // Error display for weather fetch failures
 ┃ ┃ ┃ ┣ 📜 ForecastError.tsx   // Error display for forecast fetch failures
 ┃ ┃ ┃ ┣ 📜 AddCityError.tsx    // Error message for invalid city input
 ┃ ┃ ┣ 📜 LoadingSpinner.tsx    // Loading spinner component
 ┃ ┣ 📂 api
 ┃ ┃ ┣ 📜 api.ts                // Handles API requests to OpenWeatherMap
 ┃ ┣ 📂 utils
 ┃ ┃ ┣ 📜 utils.ts              // Utility functions (formatting, icons, etc.)
 ┃ ┃ ┣ 📜 storage.ts            // Handles local storage for city persistence
 ┃ ┣ 📂 styles
 ┃ ┃ ┣ 📜 App.css               // Global styles
 ┃ ┣ 📜 App.tsx                 // Root component
 ┃ ┣ 📜 main.tsx                // Entry point for React app
 ┣ 📜 README.md                 // Project documentation
 ┣ 📜 package.json               // Dependencies and scripts
```

---

## 🏗️ **Design Patterns & Optimizations**

### 1️⃣ **Component-Based Architecture**
- The app follows the **Separation of Concerns (SoC)** principle.
- **Reusable components** (WeatherCard, CityMap, ForecastSidebar, etc.).
- **Error handling components** improve maintainability.

### 2️⃣ **Performance Optimizations**
✅ **Efficient API Fetching**  
- **Batch requests** on app load instead of multiple sequential calls.
- **Exponential backoff** mechanism for API retries.

✅ **Reduced Re-Renders**  
- **Memoization with `useState` & `useEffect`** to minimize updates.
- **Controlled re-renders** when cities are added, removed, or reordered.

✅ **Lazy Loading & Suspense**  
- **Weather data loads progressively** instead of blocking UI.
- **Loading spinners prevent UI freeze** while fetching data.

### 3️⃣ **State Management & Local Storage**
✅ **State stored in `useState` & persisted in `localStorage`**  
- Cities remain in the dashboard even after refreshing.  
- **Drag-and-drop changes persist in localStorage** for a seamless experience.

✅ **City Data Handling**
- On **adding a city**, the app **fetches weather data** and updates state.
- **Duplicate city prevention** with meaningful error messages.

---

## ⚡ **Getting Started**

### 📌 Prerequisites
- **Node.js** (v16+ recommended)
- **npm** or **yarn**

### 🔹 Install Dependencies
```sh
npm install
# OR
yarn install
```

### 🔹 Start the App
```sh
npm run dev
# OR
yarn dev
```
- The app runs locally at **http://localhost:5173**

---

## ⚙️ **Environment Variables**
To use the OpenWeatherMap API, replace `API_KEY` in `api.ts` with your API key.

```ts
const API_KEY = "YOUR_OPENWEATHERMAP_API_KEY";
```

---

## 🔄 **API Calls & Error Handling**
The app fetches data from **OpenWeatherMap API** using `fetchWeatherData` and `fetchWeatherForecast` functions.

✅ **API Error Handling**
- **Invalid city names** return `"City not found"`.
- **API rate limits** return `"API rate limit exceeded"`.
- **Network failures** retry **3 times** with **exponential backoff**.

---

## 🎨 **Styling**
The app follows **modern UI/UX best practices**:
- **Dark-themed responsive design**
- **Smooth animations** for sidebar transitions
- **Minimalist, clean UI** optimized for readability

---

## 🛠 **Future Enhancements**
🚀 **Upcoming Features:**
- 🌎 **Geolocation support** – Auto-detect user’s location.  
- 📍 **Search suggestions** – Autocomplete city names.  
- 📊 **More Weather Details** – Hourly forecasts, sunrise/sunset times.  
- 📱 **Mobile Swipe Gestures** – Drag cards using touch.  

---

## 📜 **License**
This project is **open-source** and available under the **MIT License**.

---

## 👨‍💻 **Author**
Developed by **Rishabh Gupta**  
🔗 [GitHub](https://github.com/rishu605) | 🔗 [LinkedIn](https://linkedin.com/in/rishabhgupta605)  

