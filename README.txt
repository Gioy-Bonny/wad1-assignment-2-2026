# 📸 Photo Gallery App

> **Assignment N. 2 — Web Application Development 1**  
> **Author:** Gioele Bonini

---

## 📋 Project Overview

The Photo Gallery App is a web application that allows users to view and manage a collection of photo galleries. It features a clean, user-friendly interface built with Semantic UI, making it easy to navigate through galleries and view photos organised by collection.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| [Node.js](https://nodejs.org/) | JavaScript runtime environment |
| [Express.js](https://expressjs.com/) | Web application framework |
| [Handlebars (HBS)](https://handlebarsjs.com/) | Templating engine for rendering views |
| [Fomantic UI](https://fomantic-ui.com/) | UI component library for styling |
| [Winston](https://github.com/winstonjs/winston) | Logging utility |
| JSON Files | Lightweight data store for galleries and app info |

---

## 📁 Project Structure

```
├── controllers/
│   ├── about.js          # Controller for the About page
│   ├── galleries.js      # Controller for the Galleries dashboard
│   ├── gallery.js        # Controller for a single Gallery page
│   └── start.js          # Controller for the Home/Start page
│
├── models/
│   ├── app-info.js           # Model for application metadata
│   ├── app-info.json         # JSON data store for app info
│   ├── creators-store.js     # Model for working group/creator info
│   ├── creators-store.json   # JSON data store for creators
│   ├── galleries-store.js    # Model for galleries data
│   ├── galleries-store.json  # JSON data store for galleries
│   └── json-store.js         # Generic JSON store utility
│
├── utils/
│   └── looger.js         # Winston logger configuration
│
├── views/
│   ├── layouts/
│   │   └── main.hbs      # Main HTML layout template
│   ├── partials/
│   │   ├── menu.hbs          # Shared navigation menu partial
│   │   └── listGallery.hbs   # Gallery photo table partial
│   ├── about.hbs         # About page view
│   ├── galleries.hbs     # Galleries dashboard view
│   ├── gallery.hbs       # Single gallery view
│   └── start.hbs         # Home/Start page view
│
├── public/
│   ├── script.js         # Client-side JavaScript
│   ├── style.css         # Custom stylesheet
│   ├── creators-store/
|   └── galleries-store/
├── routes.js             # Application route definitions
├── app.js                # Main application entry point
└── README.md             # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd photo-gallery-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the application:
   ```bash
   node app.js
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

---

## 🗺️ Routes

| Method | Route | Description |
|---|---|---|
| GET | `/` | Home / Start page |
| GET | `/galleries` | Galleries dashboard — lists all galleries |
| GET | `/gallery/:id` | Single gallery view by ID |
| GET | `/about` | About page with app info and team details |
| GET | `/error` | 404 error page |

---

## 📝 Features

- View all photo galleries on a centralised dashboard
- Browse individual galleries and their photos
- About page displaying app metadata and working group information
- Responsive UI using Fomantic UI components
- Interactive logo and map modals on the About page
- Winston-powered logging with configurable log levels via the `LEVEL` environment variable

---

## ⚙️ Environment Variables

| Variable | Description | Default |
|---|---|---|
| `LEVEL` | Sets the Winston log level (`debug`, `info`, `warn`, `error`) | `debug` |

---

## 👤 Author

**Gioele Bonini**  
Assignment for **Web Application Development 1**

---