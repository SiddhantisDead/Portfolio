# ✅ Portfolio Setup Checklist

Use this checklist to track your progress through setup, customization, and deployment.

---

## Phase 1: Local Setup (15 minutes)

### Database Setup
- [ ] Create MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
- [ ] Create M0 free cluster
- [ ] Create database user (username & password)
- [ ] Add IP to Network Access (allow from anywhere for now)
- [ ] Copy connection string (mongodb+srv://...)

### Backend Configuration
- [ ] Clone repository locally
- [ ] Run `npm install` in backend directory
- [ ] Copy `.env.example` to `.env`
- [ ] Edit `.env` with your MongoDB URI
- [ ] Verify `CORS_ORIGIN=http://localhost:3000`
- [ ] Run `npm run seed` to populate database

### Start Development Servers
- [ ] Terminal 1: `npm run dev` in backend directory
- [ ] Terminal 2: Python server `python3 -m http.server 3000` in frontend directory
- [ ] Open http://localhost:3000 in browser
- [ ] Verify portfolio loads (hero, skills, projects, contact form visible)

### Test API
- [ ] Open browser console (F12)
- [ ] Check for CORS errors (should be none)
- [ ] Verify projects load on page
- [ ] Fill out contact form and test submission
- [ ] Check terminal for API logs

---

## Phase 2: Customization (30 minutes)

### Frontend Content
- [ ] Edit `frontend/index.html`:
  - [ ] Update `<title>` tag
  - [ ] Update `<meta>` description
  - [ ] Update hero eyebrow text
  - [ ] Update hero title (replace with your intro)
  - [ ] Update hero subtitle
  - [ ] Update skill descriptions if needed

### Add Your Projects
- [ ] Open `backend/seed.js`
- [ ] Replace `sampleProjects` array with your projects:
  - [ ] At least 1 development project
  - [ ] At least 1 cybersecurity project (if applicable)
  - [ ] At least 1 VFX project (if applicable)
  - [ ] Include titles, descriptions, categories, tags
  - [ ] Add GitHub repo links where applicable
  - [ ] Add live links where applicable
- [ ] Run `npm run seed` to update database
- [ ] Refresh browser to see new projects

### Customize Styling (Optional)
- [ ] Open `frontend/css/style.css`
- [ ] Customize CSS variables if desired:
  - [ ] Background colors
  - [ ] Accent colors
  - [ ] Fonts (requires editing HTML for font links)
  - [ ] Spacing/sizing values
- [ ] Test on mobile (F12 → Toggle device toolbar)

### Review & Test
- [ ] Hero section displays correctly
- [ ] All skills visible
- [ ] All projects appear
- [ ] Category filtering works (click All, Dev, Cybersec, VFX)
- [ ] Contact form validates
- [ ] Responsive layout works on mobile/tablet/desktop

---

## Phase 3: GitHub Setup (5 minutes)

### Version Control
- [ ] Initialize git (if not already): `git init`
- [ ] Add all files: `git add .`
- [ ] Create initial commit: `git commit -m "Initial portfolio setup"`
- [ ] Create GitHub repository
- [ ] Add GitHub as remote: `git remote add origin https://github.com/YOUR_USERNAME/my_website.git`
- [ ] Push to GitHub: `git branch -M main && git push -u origin main`

### GitHub Student Pack
- [ ] Visit https://education.github.com/pack
- [ ] Verify your student status
- [ ] Add GitHub Student Pack to account
- [ ] Note down benefits:
  - [ ] MongoDB Atlas student credits
  - [ ] DigitalOcean $200 credit
  - [ ] Heroku $13/month credit
  - [ ] Namecheap free .me domain + SSL

---

## Phase 4: Database Setup (MongoDB Atlas) (10 minutes)

### MongoDB Atlas Configuration
- [ ] Log into MongoDB Atlas
- [ ] Select your portfolio cluster
- [ ] Click "Database Access"
- [ ] Verify database user created (portfolio_user)
- [ ] Click "Network Access"
- [ ] Verify your IP is whitelisted (or "Allow from Anywhere" selected)

### Test Database Connection
- [ ] Backend should show "MongoDB connected: ..." when running
- [ ] Check MongoDB Atlas collections:
  - [ ] `projects` collection contains 6 documents
  - [ ] `messages` collection contains any sent messages

---

## Phase 5: Domain & SSL Setup (30 minutes)

### Choose Domain Provider
- [ ] Option A: Namecheap (https://www.namecheap.com/github-students/)
  - [ ] Claim free .me domain benefit
  - [ ] Claim free SSL certificate
- [ ] Option B: Name.com (https://www.name.com/partner/github-education)
  - [ ] Claim free .me domain benefit
  - [ ] Claim free SSL certificate benefit

### Register Domain
- [ ] Verify GitHub Student status with provider
- [ ] Search for `yourname.me`
- [ ] Add free domain to cart
- [ ] Complete checkout ($0 cost)
- [ ] Complete domain registration

### Configure Nameservers
- [ ] Note your domain name: `yourname.me`
- [ ] Log into domain registrar account
- [ ] Go to nameserver settings
- [ ] **For DigitalOcean:** Set to:
  - [ ] `ns1.digitalocean.com`
  - [ ] `ns2.digitalocean.com`
  - [ ] `ns3.digitalocean.com`
- [ ] **For Heroku:** Set CNAME to Heroku app URL
- [ ] Save nameserver changes
- [ ] Wait 24-48 hours for DNS propagation

---

## Phase 6: Backend Deployment (Choose One)

### Option A: DigitalOcean ($200 credit)

#### Claim Credit
- [ ] Visit https://www.digitalocean.com/github-students
- [ ] Verify GitHub Student status
- [ ] Add $200 credit to account

#### Create & Configure Droplet
- [ ] Click "Create" → "Droplets"
- [ ] Select Ubuntu 22.04 x64
- [ ] Select Basic $4-6/month plan
- [ ] Choose region closest to you
- [ ] Select SSH key authentication
- [ ] Name droplet: `portfolio-api`
- [ ] Click "Create Droplet"
- [ ] Wait for Droplet to be ready

#### SSH Into Droplet
- [ ] Note Droplet IP address
- [ ] SSH in: `ssh root@YOUR_DROPLET_IP`
- [ ] Run system updates: `apt update && apt upgrade -y`

#### Install Dependencies
- [ ] Install Node.js:
  ```bash
  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  apt install -y nodejs
  ```
- [ ] Install Nginx: `apt install -y nginx`
- [ ] Install PM2: `npm install -g pm2`
- [ ] Install Git: `apt install -y git`

#### Deploy Portfolio
- [ ] Clone repository: `git clone https://github.com/YOUR_USERNAME/my_website.git /var/www/portfolio`
- [ ] Navigate: `cd /var/www/portfolio/backend`
- [ ] Install deps: `npm install`
- [ ] Create `.env`:
  ```
  PORT=3000
  MONGO_URI=your_mongodb_uri
  CORS_ORIGIN=https://yourname.me
  NODE_ENV=production
  ```
- [ ] Start with PM2: `pm2 start server.js --name "portfolio-api"`
- [ ] Save PM2 config: `pm2 startup` then `pm2 save`

#### Configure Nginx
- [ ] Create Nginx config: `nano /etc/nginx/sites-available/portfolio`
- [ ] Paste configuration (see DEPLOYMENT_GUIDE.md)
- [ ] Enable site: `ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/`
- [ ] Remove default: `rm -f /etc/nginx/sites-enabled/default`
- [ ] Test: `nginx -t`
- [ ] Restart: `systemctl restart nginx`

#### Set Up SSL
- [ ] Install Certbot: `apt install -y certbot python3-certbot-nginx`
- [ ] Get certificate: `certbot --nginx -d yourname.me -d www.yourname.me`
- [ ] Follow prompts
- [ ] Verify auto-renewal setup

#### Final Tests
- [ ] Visit https://yourname.me in browser
- [ ] Verify portfolio loads
- [ ] Check API: https://yourname.me/api/projects
- [ ] Test contact form submission
- [ ] Check SSL certificate (click lock icon)

### Option B: Heroku ($13/month credit)

#### Claim Credit
- [ ] Visit https://www.heroku.com/github-students
- [ ] Verify GitHub Student status
- [ ] Add $13/month credit to account (24 months)

#### Install Heroku CLI
- [ ] Download & install from https://devcenter.heroku.com/articles/heroku-cli
- [ ] Verify: `heroku --version`

#### Prepare for Deployment
- [ ] Ensure `Procfile` exists: `web: node server.js`
- [ ] Ensure `package.json` has start script
- [ ] Test locally: `npm start`

#### Deploy to Heroku
- [ ] Login: `heroku login`
- [ ] Create app: `heroku create portfolio-YOUR_NAME`
- [ ] Set environment:
  ```bash
  heroku config:set MONGO_URI="your_mongodb_uri"
  heroku config:set CORS_ORIGIN="https://yourname.me"
  heroku config:set NODE_ENV="production"
  ```
- [ ] Deploy: `git push heroku main`
- [ ] Check logs: `heroku logs --tail`

#### Connect Domain
- [ ] In Heroku dashboard, go to "Settings"
- [ ] Add domain: `yourname.me`
- [ ] Note the target (e.g., `portfolio-xxx.herokuapp.com`)
- [ ] In domain registrar, update DNS CNAME:
  - [ ] Name: `@` (or root)
  - [ ] Value: `portfolio-xxx.herokuapp.com`
- [ ] Wait for DNS propagation (24-48 hours)
- [ ] Heroku handles SSL automatically ✅

#### Final Tests
- [ ] Visit https://yourname.me in browser
- [ ] Verify portfolio loads
- [ ] Check API: https://yourname.me/api/projects
- [ ] Test contact form

---

## Phase 7: Verification & Launch (15 minutes)

### Desktop Testing
- [ ] [ ] Visits http://yourname.me on desktop
- [ ] [ ] All sections load correctly
- [ ] [ ] Skills display properly
- [ ] [ ] Projects load from API
- [ ] [ ] Category filters work
- [ ] [ ] Contact form works
- [ ] [ ] Links point to correct places

### Mobile Testing
- [ ] [ ] Visit on mobile device
- [ ] [ ] Navigation hamburger menu works
- [ ] [ ] All sections responsive
- [ ] [ ] Projects display in single column
- [ ] [ ] Contact form usable
- [ ] [ ] Touch interactions smooth

### SSL/Security Check
- [ ] [ ] Visit https://yourname.me (HTTPS working)
- [ ] [ ] Lock icon shows in browser address bar
- [ ] [ ] No security warnings
- [ ] [ ] SSL certificate valid

### API Testing
- [ ] [ ] GET /api/projects returns projects
- [ ] [ ] GET /api/projects?category=dev filters correctly
- [ ] [ ] POST /api/messages accepts submissions
- [ ] [ ] Rate limiting works (5 messages per hour)

### Browser Compatibility
- [ ] [ ] Works on Chrome
- [ ] [ ] Works on Firefox
- [ ] [ ] Works on Safari
- [ ] [ ] Works on Edge

### Performance
- [ ] [ ] Page loads fast (< 2 seconds)
- [ ] [ ] No console errors (F12)
- [ ] [ ] Images optimized
- [ ] [ ] CSS/JS minified (if applicable)

---

## Phase 8: Ongoing Maintenance

### Regular Tasks
- [ ] [ ] Monitor API logs weekly
- [ ] [ ] Check MongoDB usage
- [ ] [ ] Review contact form submissions
- [ ] [ ] Update projects as you complete new work

### Content Updates
- [ ] [ ] Add new projects as completed
- [ ] [ ] Update skills list
- [ ] [ ] Refresh hero text if needed
- [ ] [ ] Update contact info if changed

### Backups
- [ ] [ ] Export MongoDB data monthly
- [ ] [ ] Backup `backend/.env` securely
- [ ] [ ] Keep GitHub repository up-to-date

### Security
- [ ] [ ] Monitor for security updates
- [ ] [ ] Update npm packages monthly
- [ ] [ ] Review API rate limiting settings
- [ ] [ ] Check SSL certificate expiration (auto-renews but verify)

---

## 🎉 Completion Status

**Phase 1 (Local Setup):** [ ] Complete  
**Phase 2 (Customization):** [ ] Complete  
**Phase 3 (GitHub Setup):** [ ] Complete  
**Phase 4 (Database):** [ ] Complete  
**Phase 5 (Domain & SSL):** [ ] Complete  
**Phase 6 (Backend Deployment):** [ ] Complete  
**Phase 7 (Verification & Launch):** [ ] Complete  
**Phase 8 (Maintenance):** [ ] Complete  

---

## 📞 Need Help?

- **Setup questions?** → Read `QUICK_START.md`
- **Architecture questions?** → Read `README.md`
- **Deployment issues?** → Check `DEPLOYMENT_GUIDE.md`
- **General help?** → See Resources section in README.md

---

**You've got this! 🚀**
