# 🚀 Quick Start Guide

Get your portfolio up and running in 5 minutes!

---

## Prerequisites

✓ Node.js v18+ installed  
✓ MongoDB Atlas account (free)  
✓ Git installed  
✓ Code editor (VS Code, etc.)  

---

## Step 1: MongoDB Setup (2 min)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free
3. Create a cluster (M0 free tier)
4. Create a database user (username: `portfolio_user`, strong password)
5. Get connection string:
   ```
   mongodb+srv://portfolio_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/portfolio
   ```

**Save this string — you'll need it next!**

---

## Step 2: Backend Setup (2 min)

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

Edit `.env`:
```env
MONGO_URI=mongodb+srv://portfolio_user:PASSWORD@cluster0.xxxxx.mongodb.net/portfolio
CORS_ORIGIN=http://localhost:3000
PORT=3000
NODE_ENV=development
```

Replace `PASSWORD` with your database password.

---

## Step 3: Seed Database (1 min)

```bash
# In backend/ directory
npm run seed
```

This populates your database with sample projects. Output:
```
✓ Created 6 projects
✓ Created 2 messages
✨ Database seeding complete!
```

---

## Step 4: Start Backend

```bash
# In backend/ directory
npm run dev
```

You should see:
```
Server running on port 3000
MongoDB connected: cluster0.xxxxx.mongodb.net
```

**Keep this terminal open!**

---

## Step 5: Serve Frontend

**Option A: Python HTTP Server** (easiest)
```bash
# Open new terminal, go to project root
cd frontend
python3 -m http.server 3000
```

**Option B: VS Code Live Server**
1. Install "Live Server" extension in VS Code
2. Right-click `frontend/index.html`
3. Select "Open with Live Server"

---

## Step 6: View Portfolio

Open browser: **http://localhost:3000**

You should see:
- ✅ Hero section with glow effects
- ✅ Skills grid
- ✅ Projects loaded from database
- ✅ Contact form
- ✅ Dark purple bloom theme

---

## 🧪 Test API

In a new terminal:

```bash
# Get all projects
curl http://localhost:3000/api/projects

# Get projects by category
curl http://localhost:3000/api/projects?category=dev

# Send test message
curl -X POST http://localhost:3000/api/messages \
  -H "Content-Type: application/json" \
  -d '{
    "name":"Test User",
    "email":"test@example.com",
    "subject":"Testing",
    "body":"This is a test message from the API!"
  }'
```

---

## 📝 Customize Your Content

### Add Your Projects

Edit `backend/seed.js` and update `sampleProjects` array:

```javascript
{
  title: 'Your Project Name',
  description: 'What you built and why',
  category: 'dev', // or 'vfx', 'cybersec'
  tags: ['Tag1', 'Tag2'],
  repoUrl: 'https://github.com/...',
  liveUrl: 'https://...',
  featured: true,
}
```

Then:
```bash
npm run seed  # Re-seed with your content
```

### Update Frontend Text

Edit `frontend/index.html`:
- Change hero title and subtitle
- Update skill descriptions
- Modify footer

### Change Colors

Edit `frontend/css/style.css` CSS variables:
```css
:root {
  --bg-void: #090510;         /* Dark background */
  --accent-primary: #b768ff;  /* Main purple */
  /* ... etc ... */
}
```

---

## 🚢 Deploy to Production

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for complete instructions.

**Quick preview:**
1. Push to GitHub
2. Deploy backend to DigitalOcean ($200 credit) or Heroku
3. Get free domain from Namecheap or Name.com
4. Set up SSL with Let's Encrypt
5. Done! 🎉

---

## ⚡ Common Tasks

### Restart Backend
```bash
# In backend terminal: Ctrl+C, then
npm run dev
```

### View Database
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Collections" on your cluster
3. Browse projects and messages

### Check Logs
```bash
# Backend logs show in terminal running npm run dev
# Browser console (F12) shows frontend errors
```

### Reset Database
```bash
npm run seed  # Wipes and recreates all data
```

---

## 🎨 File Structure Quick Reference

```
frontend/
├── index.html     ← Main structure (edit text here)
├── css/
│   └── style.css  ← All styling (edit colors here)
└── js/
    └── main.js    ← API calls & interactivity

backend/
├── server.js      ← Express app
├── .env           ← Your secrets (don't commit!)
├── models/        ← Database schemas
├── routes/        ← API endpoints
└── seed.js        ← Sample data
```

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| **"Cannot GET /" in browser** | Use Python server: `python3 -m http.server 3000` |
| **"CORS error" in console** | Verify `CORS_ORIGIN=http://localhost:3000` in `.env` |
| **Projects show "No projects"** | Run `npm run seed` to populate database |
| **"MongoDB connection error"** | Check `MONGO_URI` in `.env` matches Atlas connection string |
| **Port 3000 already in use** | Kill process: `lsof -i :3000` then `kill -9 <PID>` |

---

## 📚 Next Steps

1. ✅ Complete Quick Start (you are here)
2. 📖 Read [README.md](./README.md) for full docs
3. 🚀 Follow [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) to go live
4. 💾 Customize with your projects and content
5. 🎨 Tweak CSS for your personal brand

---

## 💡 Tips

- **Keep backend running** while developing frontend
- **Check browser console** (F12) for frontend errors
- **Check terminal** where backend runs for API errors
- **Use "npm run seed"** whenever you want fresh sample data
- **Don't edit .env** after first setup (unless changing MongoDB URI)

---

**You're all set! Happy building! 🎉**
