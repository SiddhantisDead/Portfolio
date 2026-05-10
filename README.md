# Personal Portfolio Website

A minimalist, high-performance personal portfolio built with **vanilla HTML/CSS/JavaScript** (frontend) and **Node.js/Express** (backend). Features a dark purple bloom aesthetic with glassmorphism effects, dynamic project management, and a contact form.

## 🎨 Design

- **Theme:** Dark Purple Bloom (neon purple accents on deep void backgrounds)
- **Effects:** CSS-driven glowing text-shadows, box-shadows, and bloom effects
- **Typography:** Inter (body) + Space Grotesk (headings) for modern hierarchy
- **Responsive:** Fully mobile-optimized with smooth interactions
- **Framework-Free:** Pure CSS (no Tailwind/Bootstrap) for ultimate control

## 🏗️ Architecture

```
my_website/
├── frontend/
│   ├── index.html        # Single-page structure
│   ├── css/
│   │   └── style.css     # All styling (dark purple theme)
│   └── js/
│       └── main.js       # Navigation, projects fetch, form handling
├── backend/
│   ├── server.js         # Express app with middleware
│   ├── package.json      # Dependencies
│   ├── .env.example      # Environment template
│   ├── config/
│   │   └── db.js         # MongoDB connection
│   ├── models/
│   │   ├── Project.js    # Project schema
│   │   └── Message.js    # Contact message schema
│   ├── routes/
│   │   ├── projects.js   # GET/POST projects
│   │   └── messages.js   # POST contact messages
│   └── middleware/
│       └── validation.js # Request validation
├── DEPLOYMENT_GUIDE.md   # Step-by-step deployment
└── README.md             # This file
```

## ✨ Features

### Frontend
- **Hero Section:** Minimalist intro with glowing text effects
- **Skills Grid:** Dual skill sets (Dev + VFX) with tag display
- **Projects:** Dynamic grid fetching from backend API with category filtering
- **Contact Form:** Real-time validation, AJAX submission, feedback states
- **Responsive Design:** Mobile-first, adapts to all screen sizes
- **Navigation:** Fixed header with smooth scroll + mobile hamburger menu

### Backend
- **REST API:** 
  - `GET /api/projects` — fetch all projects (optional category filter)
  - `GET /api/projects/:id` — fetch single project
  - `POST /api/projects` — create project (with validation)
  - `POST /api/messages` — submit contact form
- **Security:** Helmet.js, CORS, rate limiting, input validation
- **Database:** MongoDB with Mongoose schemas for Projects & Messages
- **Error Handling:** Comprehensive error responses

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (free tier or student credits)
- Git

### Local Development

#### 1. Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/my_website.git
cd my_website

# Backend setup
cd backend
npm install

# Frontend is vanilla JS—no install needed
cd ../frontend
```

#### 2. Configure Environment

```bash
# Backend
cd backend
cp .env.example .env
nano .env
# Fill in:
# - MONGO_URI (from MongoDB Atlas)
# - CORS_ORIGIN=http://localhost:3000
# - PORT=3000
```

#### 3. Start Backend

```bash
cd backend
npm run dev  # Uses nodemon for auto-restart
```

Backend runs on `http://localhost:3000`

#### 4. Serve Frontend

Option A: Simple HTTP server
```bash
cd frontend
python3 -m http.server 3000
# Open http://localhost:3000
```

Option B: VS Code Live Server extension
```bash
# Install "Live Server" extension, right-click index.html → "Open with Live Server"
```

#### 5. Test API

```bash
# Get projects
curl http://localhost:3000/api/projects

# Create project (replace with your data)
curl -X POST http://localhost:3000/api/projects \
  -H "Content-Type: application/json" \
  -d '{
    "title":"My Cybersecurity Script",
    "description":"Automated network analysis tool",
    "category":"cybersec",
    "tags":["Python","Security","Networking"],
    "repoUrl":"https://github.com/..."
  }'

# Submit contact message
curl -X POST http://localhost:3000/api/messages \
  -H "Content-Type: application/json" \
  -d '{
    "name":"John Doe",
    "email":"john@example.com",
    "subject":"Let'\''s collaborate",
    "body":"I loved your VFX projects!"
  }'
```

---

## 📦 Dependencies

### Backend
- **express** — Web framework
- **mongoose** — MongoDB ODM
- **cors** — Cross-origin handling
- **helmet** — Security headers
- **express-rate-limit** — Rate limiting
- **dotenv** — Environment variables

### Frontend
- **Vanilla JS** — No frameworks
- **CSS3** — Grid, flexbox, custom properties
- **Google Fonts** — Inter + Space Grotesk

---

## 🎯 Project Schema (MongoDB)

```javascript
{
  title: String,              // e.g., "Arch Linux Dotfiles"
  description: String,        // Project description
  category: String,           // 'dev' | 'vfx' | 'cybersec' | 'other'
  tags: [String],            // e.g., ['Linux', 'Automation', 'Configuration']
  imageUrl: String,          // URL to project image (optional)
  liveUrl: String,           // Link to live project (optional)
  repoUrl: String,           // GitHub repo link (optional)
  featured: Boolean,         // Pin to top (default: false)
  createdAt: Date,           // Auto-generated
  updatedAt: Date            // Auto-generated
}
```

## 📝 Message Schema (MongoDB)

```javascript
{
  name: String,              // Visitor name
  email: String,             // Email address (validated)
  subject: String,           // Message subject (optional)
  body: String,              // Message content
  read: Boolean,             // Mark as read (default: false)
  createdAt: Date,           // Auto-generated
  updatedAt: Date            // Auto-generated
}
```

---

## 🔑 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio

# CORS
CORS_ORIGIN=http://localhost:3000
```

See `.env.example` for full template.

---

## 🎨 Customization

### Colors (Dark Purple Bloom)
Edit CSS custom properties in `frontend/css/style.css`:

```css
:root {
  --bg-void: #090510;           /* Background */
  --accent-primary: #b768ff;    /* Main glow color */
  --accent-secondary: #8a2be2;  /* Secondary accent */
  --text-primary: #f5f5f5;      /* Text color */
  /* ... more colors ... */
}
```

### Typography
```css
--font-body: 'Inter', sans-serif;
--font-heading: 'Space Grotesk', sans-serif;
```

Modify `frontend/index.html` Google Fonts link to use different fonts.

### API Endpoint
In `frontend/js/main.js`:

```javascript
const API_BASE_URL = 'http://localhost:3000/api';  // Change for production
```

---

## 📱 Responsive Breakpoints

- **Mobile:** < 480px
- **Tablet:** 480px — 768px
- **Desktop:** > 768px

All breakpoints use CSS media queries in `style.css`.

---

## 🛡️ Security

- **Helmet.js** — Sets secure HTTP headers
- **CORS** — Restricts API access to allowed origins
- **Rate Limiting:**
  - General API: 100 requests / 15 minutes
  - Messages: 5 messages / 1 hour
- **Input Validation:** Server-side validation on all inputs
- **Environment Variables:** Secrets kept in `.env` (not in repo)

---

## 🚀 Deployment

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for complete step-by-step instructions using GitHub Student Developer Pack benefits:

- **Database:** MongoDB Atlas (free or student credits)
- **Hosting:** DigitalOcean ($200 credit) or Heroku ($13/month credit)
- **Domain + SSL:** Namecheap or Name.com (free .me domain + SSL)

Quick summary:
```bash
# DigitalOcean Droplet
ssh root@YOUR_IP
# Follow DEPLOYMENT_GUIDE.md steps

# Or Heroku
heroku create portfolio-api
git push heroku main
```

---

## 📊 API Endpoints

### Projects

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/projects` | Fetch all projects (optional `?category=dev`) | ✗ |
| GET | `/api/projects/:id` | Fetch single project | ✗ |
| POST | `/api/projects` | Create new project | ✓ Rate limit |

**POST /api/projects Example:**
```json
{
  "title": "Portfolio Website",
  "description": "Full-stack personal portfolio",
  "category": "dev",
  "tags": ["JavaScript", "Node.js", "MongoDB"],
  "imageUrl": "https://...",
  "liveUrl": "https://portfolio.com",
  "repoUrl": "https://github.com/...",
  "featured": true
}
```

### Messages

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/messages` | Submit contact form | ✓ Rate limit |

**POST /api/messages Example:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Collaboration inquiry",
  "body": "I'm interested in working on a VFX project together!"
}
```

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| **"Cannot find module" errors** | Run `npm install` in backend directory |
| **CORS errors** | Verify `CORS_ORIGIN` in `.env` matches frontend URL |
| **MongoDB connection fails** | Check `MONGO_URI` in `.env`; verify IP whitelist in Atlas |
| **Projects don't load** | Check browser console for API errors; verify backend is running |
| **Form submission fails** | Check form validation; verify backend is accepting POST requests |

---

## 📚 Resources

- [Express.js Docs](https://expressjs.com/)
- [Mongoose Docs](https://mongoosejs.com/)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

## 📄 License

This project is open source. Customize it freely for your portfolio!

---

## 🎓 GitHub Student Developer Pack

This project is optimized to use the GitHub Student Developer Pack benefits:
- **MongoDB Atlas** — Free clusters + student credits
- **DigitalOcean** — $200 platform credit
- **Heroku** — $13/month for 24 months
- **Namecheap** — Free .me domain + SSL
- **Name.com** — Free .me domain + SSL

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for claiming these benefits.

---

**Built with ❤️ • No frameworks, no bloat, just code.**
