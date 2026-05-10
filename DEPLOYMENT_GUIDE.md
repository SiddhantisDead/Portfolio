# Portfolio Website Deployment Guide
## Leveraging GitHub Student Developer Pack Benefits

This guide walks you through deploying your portfolio using the GitHub Student Developer Pack benefits. The setup uses MongoDB Atlas (database), DigitalOcean or Heroku (hosting), and Namecheap or Name.com (domain + SSL).

---

## Prerequisites

- **GitHub Account** with Student Developer Pack verified ([github.com/student](https://github.com/student))
- **Git** installed locally
- **Node.js** (v18+) and **npm** installed
- Portfolio repository on GitHub

---

## Part 1: Database Setup (MongoDB Atlas with Student Credits)

### 1. Create MongoDB Atlas Account

1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for a free account (or use existing)
3. Go to [GitHub Education Benefits for MongoDB](https://www.mongodb.com/community/mongodb-edu) to apply for student credits
4. Alternatively, use the free tier (512 MB storage) for testing

### 2. Create a Cluster

1. After logging in, click **"Create a Project"**
2. Name it `portfolio-prod` (or similar)
3. Click **"Create Project"**
4. Click **"Create a Cluster"**
5. Select **"M0 Free"** (or higher tier if using credits)
6. Choose your region closest to your deployment location
7. Click **"Create Cluster"** and wait for it to deploy (5-10 minutes)

### 3. Set Up Database User & Connection

1. In Atlas, go to **"Database Access"** (left sidebar)
2. Click **"+ Add New Database User"**
3. Select **"Password"** as authentication method
4. Create username (e.g., `portfolio_user`) and strong password
5. Set permissions to **"Read and write to any database"**
6. Click **"Add User"**

### 4. Configure Network Access

1. Go to **"Network Access"** (left sidebar)
2. Click **"+ Add IP Address"**
3. Select **"Allow Access from Anywhere"** (for deployment flexibility)
   - *Or* add specific IP of your hosting provider after deployment
4. Click **"Confirm"**

### 5. Get Connection String

1. Go to **"Clusters"** and click your cluster name
2. Click **"Connect"** button
3. Select **"Drivers"**
4. Copy the connection string (looks like: `mongodb+srv://...`)
5. Replace `<password>` with your database user password
6. Replace `<username>` with your database user username
7. Change database name if desired (e.g., from `myFirstDatabase` to `portfolio`)

**Example:**
```
mongodb+srv://portfolio_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
```

---

## Part 2: Backend Deployment (DigitalOcean OR Heroku)

### Option A: DigitalOcean with $200 Student Credit

#### Step 1: Apply for DigitalOcean Student Credit

1. Visit [DigitalOcean GitHub Education](https://www.digitalocean.com/github-students)
2. Click **"Apply"** and verify your GitHub Student status
3. Receive $200 platform credit (valid for 1 year)

#### Step 2: Create a Droplet

1. Log into your DigitalOcean account
2. Click **"Create"** → **"Droplets"**
3. **Image:** Ubuntu 22.04 x64
4. **Plan:** Basic ($4-6/month) - Student credit covers this
5. **Region:** Choose closest to your users
6. **Authentication:** SSH keys (recommended) or password
7. **Hostname:** `portfolio-api`
8. Click **"Create Droplet"** and wait for setup

#### Step 3: SSH Into Your Droplet

```bash
ssh root@YOUR_DROPLET_IP
```

#### Step 4: Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install npm
npm install -g npm@latest

# Install Nginx (reverse proxy)
sudo apt install -y nginx

# Install PM2 (process manager)
sudo npm install -g pm2

# Install Git
sudo apt install -y git
```

#### Step 5: Clone & Setup Portfolio Backend

```bash
cd /var/www
sudo git clone https://github.com/YOUR_USERNAME/my_website.git portfolio
cd portfolio/backend

# Install dependencies
npm install

# Create .env file
nano .env
```

Paste this into `.env`:
```
PORT=3000
NODE_ENV=production
MONGO_URI=mongodb+srv://portfolio_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
CORS_ORIGIN=https://yourdomain.com
APP_ENV=production
```

Save (Ctrl+X, Y, Enter)

#### Step 6: Start Backend with PM2

```bash
pm2 start server.js --name "portfolio-api"
pm2 startup
pm2 save
```

#### Step 7: Configure Nginx as Reverse Proxy

```bash
sudo nano /etc/nginx/sites-available/portfolio
```

Paste:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    # API proxy
    location /api/ {
        proxy_pass http://localhost:3000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Frontend static files
    location / {
        root /var/www/portfolio/frontend;
        try_files $uri $uri/ /index.html;
    }
}
```

Save (Ctrl+X, Y, Enter)

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test Nginx config
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

#### Step 8: Set Up SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Follow prompts. Certbot auto-renews certificates and updates Nginx config.

---

### Option B: Heroku with $13/month Student Credit

#### Step 1: Claim Heroku Student Credit

1. Visit [Heroku GitHub Education](https://www.heroku.com/github-students)
2. Click **"Sign up"** and verify GitHub Student status
3. Receive $13/month account credit (for 24 months)

#### Step 2: Install Heroku CLI

```bash
curl https://cli-assets.heroku.com/install.sh | sh
```

#### Step 3: Prepare Backend for Heroku

```bash
cd backend

# Create Procfile
echo "web: node server.js" > Procfile

# Ensure package.json has start script (already set)
# Verify: npm run start works locally
npm start  # Test locally
```

#### Step 4: Deploy to Heroku

```bash
# Login to Heroku
heroku login

# Create Heroku app
heroku create portfolio-api-YOURNAME

# Set environment variables
heroku config:set MONGO_URI="mongodb+srv://portfolio_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority"
heroku config:set CORS_ORIGIN="https://yourdomain.com"
heroku config:set NODE_ENV="production"

# Deploy
git push heroku main  # or master, depending on branch name

# View logs
heroku logs --tail
```

Your backend is now live at: `https://portfolio-api-YOURNAME.herokuapp.com`

---

## Part 3: Domain & SSL Setup (Namecheap OR Name.com)

### Option A: Namecheap with 1-Year Free .me Domain + SSL

#### Step 1: Claim Namecheap Benefit

1. Visit [Namecheap GitHub Education](https://www.namecheap.com/github-students/)
2. Apply with GitHub Student account
3. Receive 1 free `.me` domain + 1-year SSL certificate

#### Step 2: Register Your Domain

1. Log into Namecheap
2. Go to **"Premium Services"** → **"Free Domains"**
3. Select your free domain credit
4. Search for `yourname.me`
5. Add to cart and proceed to checkout (cost $0.00)
6. Complete order

#### Step 3: Configure DNS (DigitalOcean Droplet)

1. In Namecheap, go to **"My Domains"** → your domain
2. Click **"Manage"**
3. Go to **"Nameservers"** tab
4. Select **"Custom Nameservers"**
5. Enter DigitalOcean nameservers:
   - `ns1.digitalocean.com`
   - `ns2.digitalocean.com`
   - `ns3.digitalocean.com`
6. Save

Then in DigitalOcean:
1. Go to **"Networking"** → **"Domains"**
2. Click **"Add Domain"**
3. Enter your domain and select your Droplet
4. Click **"Create Domain"**

DNS propagates in 24-48 hours.

#### Step 4: Claim SSL Certificate

1. In Namecheap, under your domain
2. Go to **"SSL Certificates"** → **"Manage"**
3. Click your free SSL certificate
4. Follow activation steps
5. Namecheap auto-installs with Let's Encrypt (covered by Certbot on your server)

---

### Option B: Name.com with Free .me Domain + SSL

#### Step 1: Claim Name.com Benefit

1. Visit [Name.com GitHub Education](https://www.name.com/partner/github-education)
2. Apply and verify
3. Receive 1 free `.me` domain + 1-year SSL

#### Step 2: Register Domain

1. Log into Name.com
2. Go to account benefits section
3. Claim your free `.me` domain
4. Search and register

#### Step 3: Point to Hosting

For **DigitalOcean**:
- In Name.com domain settings, set custom nameservers to DigitalOcean's (same as above)

For **Heroku**:
- In Name.com, add DNS record:
  - **Type:** CNAME
  - **Name:** @ (or your domain)
  - **Value:** `portfolio-api-YOURNAME.herokuapp.com`

#### Step 4: SSL Setup

Name.com provides free SSL; configure via Let's Encrypt on your server (DigitalOcean) or Heroku auto-handles it.

---

## Part 4: Frontend Deployment

### Option A: DigitalOcean (Static Files)

Frontend is served via Nginx on the same Droplet. Update `.env` in frontend if API URL differs:

```javascript
// In frontend/js/main.js, update:
const API_BASE_URL = 'https://yourdomain.com/api';
```

Rebuild if necessary:
```bash
# Frontend is vanilla JS + CSS, no build step needed
# Just push to GitHub and pull on server
cd /var/www/portfolio
sudo git pull origin main
sudo systemctl restart nginx
```

### Option B: Heroku

Deploy frontend separately or alongside backend in same Heroku app:

```bash
# In Procfile, use a static buildpack
heroku buildpacks:add heroku/static

# Create static.json
{
  "root": "frontend",
  "clean_urls": true,
  "routes": {
    "/**": "index.html"
  }
}
```

Deploy both frontend and backend in same Heroku app.

---

## Part 5: Environment Variables & Secrets

### Backend .env Checklist

```
✓ PORT=3000
✓ NODE_ENV=production
✓ MONGO_URI=mongodb+srv://...
✓ CORS_ORIGIN=https://yourdomain.com
```

**Never commit .env files to Git!** Use `.gitignore`.

### Frontend API Configuration

```javascript
// Update in frontend/js/main.js before deployment:
const API_BASE_URL = 'https://yourdomain.com/api';
```

---

## Part 6: Monitoring & Maintenance

### DigitalOcean Monitoring

```bash
# Check server health
ssh root@YOUR_DROPLET_IP

# View logs
sudo journalctl -u nginx -f
pm2 logs

# Restart services
sudo systemctl restart nginx
pm2 restart portfolio-api
```

### Heroku Monitoring

```bash
heroku logs --tail
heroku apps:info
```

---

## Part 7: CI/CD (Optional but Recommended)

### GitHub Actions for Auto-Deployment

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      # For Heroku
      - name: Deploy to Heroku
        uses: akhileshns/heroku-deploy@v3.12.12
        with:
          heroku_api_key: ${{ secrets.HEROKU_API_KEY }}
          heroku_app_name: portfolio-api-YOURNAME
          heroku_email: your-email@example.com

      # For DigitalOcean (SSH deploy)
      - name: Deploy to DigitalOcean
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.DO_HOST }}
          username: root
          key: ${{ secrets.DO_SSH_KEY }}
          script: |
            cd /var/www/portfolio
            git pull origin main
            cd backend && npm install && pm2 restart portfolio-api
            sudo systemctl restart nginx
```

---

## Part 8: Cost Breakdown (Estimated Annual)

| Service | Cost | Notes |
|---------|------|-------|
| **MongoDB Atlas** | $0 (free tier) | 512 MB storage, or use student credits |
| **DigitalOcean** | $0 (first year) | $200 student credit covers ~$50-60/month droplet |
| **Heroku** | $0 (first year) | $13/month credit, eco dyno ~$5/month |
| **Domain** | $0 (first year) | 1 free .me domain from Namecheap/Name.com |
| **SSL** | $0 | Let's Encrypt (free) or included with domain |
| **Total (Year 1)** | **$0** | With GitHub Student Pack |
| **Total (Year 2+)** | ~$50-80 | After credits expire |

---

## Part 9: Troubleshooting

| Issue | Solution |
|-------|----------|
| **CORS errors** | Verify `CORS_ORIGIN` in backend matches frontend domain |
| **Blank projects page** | Check MongoDB connection; verify `MONGO_URI` in `.env` |
| **SSL certificate issues** | Run `sudo certbot renew --dry-run` on server |
| **Heroku app crashed** | Check logs: `heroku logs --tail` |
| **Domain not resolving** | Wait 24-48 hours for DNS propagation; check nameserver settings |

---

## Resources

- [GitHub Student Developer Pack](https://education.github.com/pack)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [DigitalOcean Documentation](https://docs.digitalocean.com/)
- [Heroku Documentation](https://devcenter.heroku.com/)
- [Namecheap GitHub Education](https://www.namecheap.com/github-students/)
- [Name.com GitHub Education](https://www.name.com/partner/github-education)

---

## Next Steps

1. **Complete MongoDB setup** and test connection locally
2. **Deploy backend** using DigitalOcean OR Heroku
3. **Configure domain** via Namecheap or Name.com
4. **Set up SSL** with Let's Encrypt or included certificate
5. **Test frontend** API connectivity to production backend
6. **Monitor** logs and performance
7. **Add projects** to MongoDB via API (POST `/api/projects`)
8. **Automate deployment** with GitHub Actions (optional)

Good luck with your portfolio! 🚀
