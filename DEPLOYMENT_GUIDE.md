# 🚀 Deployment Guide - Professional Headshot AI

Follow these steps to deploy your app to Vercel (Frontend) + Railway (Backend).

---

## 📋 Pre-Deployment Checklist

✅ Git repository initialized  
✅ Code committed  
✅ `.env` file NOT tracked (in `.gitignore`)  
✅ Backend and frontend tested locally  

---

## Step 1: Push to GitHub

### 1.1 Create GitHub Repository

1. Go to **https://github.com/new**
2. Repository name: `prof-headshot-ai` (or your choice)
3. Description: `AI-powered professional headshot generator using Google Gemini`
4. Keep it **Public** (or Private if you prefer)
5. **DO NOT** initialize with README (we already have one)
6. Click "Create repository"

### 1.2 Push Your Code

Copy your repository URL from GitHub (looks like: `https://github.com/YOUR_USERNAME/prof-headshot-ai.git`)

Then run these commands:

```bash
cd /Users/jj/projects/prof_headshot

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/prof-headshot-ai.git

# Push to GitHub
git branch -M main
git push -u origin main
```

**✅ Verify:** Visit your GitHub repo - you should see all files EXCEPT `.env`

---

## Step 2: Deploy Backend to Railway

### 2.1 Sign Up and Connect

1. Visit **https://railway.app**
2. Click "Login" → Sign up with GitHub
3. Authorize Railway to access your repositories

### 2.2 Create New Project

1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose your `prof-headshot-ai` repository
4. Railway will detect it's a Node.js app

### 2.3 Configure Backend

1. **Set Root Directory:**
   - Click on your service
   - Go to **Settings** → **Source**
   - Set **Root Directory** to: `server`
   - Click "Update"

2. **Add Environment Variables:**
   - Go to **Variables** tab
   - Click "**New Variable**"
   - Add these variables:
     ```
     GOOGLE_API_KEY=your_actual_google_api_key_here
     PORT=3001
     NODE_ENV=production
     ```
   - Click "Add" for each

3. **Generate Public Domain:**
   - Go to **Settings** → **Networking**
   - Click "**Generate Domain**"
   - You'll get a URL like: `https://prof-headshot-backend-production.up.railway.app`
   - **COPY THIS URL** - you'll need it for the frontend!

### 2.4 Verify Backend Deployment

Visit your Railway URL + `/api/health`:
```
https://your-backend-url.railway.app/api/health
```

You should see:
```json
{
  "status": "healthy",
  "timestamp": "...",
  "apiKeyConfigured": true
}
```

✅ Backend is live!

---

## Step 3: Update Frontend for Production

### 3.1 Update API URL

Update the file `src/services/api.ts`:

```typescript
// Change this line:
const API_BASE_URL = 'http://localhost:3001/api';

// To this (use your Railway URL):
const API_BASE_URL = 'https://your-backend-url.railway.app/api';
```

### 3.2 Update CORS on Backend

Add your future Vercel domain to `server/server.js` CORS config.

For now, you can add a wildcard (we'll update after Vercel deployment):

```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    /\.vercel\.app$/,  // Allow all Vercel domains
  ],
  credentials: true
}));
```

### 3.3 Commit and Push Changes

```bash
cd /Users/jj/projects/prof_headshot
git add .
git commit -m "Update API URL for production"
git push origin main
```

---

## Step 4: Deploy Frontend to Vercel

### 4.1 Sign Up and Import

1. Visit **https://vercel.com**
2. Click "**Sign Up**" → Continue with GitHub
3. Authorize Vercel
4. Click "**Add New**" → "**Project**"
5. **Import** your `prof-headshot-ai` repository

### 4.2 Configure Build Settings

Vercel should auto-detect Vite, but verify:

- **Framework Preset:** Vite
- **Root Directory:** `./` (leave blank or use `./`)
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

### 4.3 Environment Variables

**For frontend:** You don't need to add any (API key is on backend only)

### 4.4 Deploy

1. Click "**Deploy**"
2. Wait 1-2 minutes for build to complete
3. You'll get a URL like: `https://prof-headshot-ai.vercel.app`

✅ Frontend is live!

---

## Step 5: Final Configuration

### 5.1 Update Backend CORS (Optional - more secure)

Now that you have your Vercel domain, update `server/server.js`:

```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://prof-headshot-ai.vercel.app',  // Your actual Vercel URL
    'https://prof-headshot-ai-*.vercel.app' // Preview deployments
  ],
  credentials: true
}));
```

Commit and push:
```bash
git add .
git commit -m "Update CORS for production domain"
git push origin main
```

Railway will auto-deploy the update.

---

## Step 6: Test Your Live App! 🎉

### Visit Your App:
```
https://prof-headshot-ai.vercel.app
```

### Test the Flow:
1. Upload a photo
2. Select a style (Corporate, Creative, or Executive)
3. Click "Generate Headshot"
4. View your professional headshot!
5. Download it

### Share with Friends:
Send them your Vercel URL!

---

## 📊 Monitoring & Management

### Vercel Dashboard
- View deployments: https://vercel.com/dashboard
- See analytics
- Check build logs
- Manage domains

### Railway Dashboard
- View deployments: https://railway.app/dashboard
- Monitor usage (stay within free tier)
- Check logs
- Update environment variables

---

## 💰 Cost Summary

### FREE Tier Includes:
- **Vercel Frontend:** Unlimited bandwidth, 100GB/month
- **Railway Backend:** $5 free credit/month (~10,000 requests)
- **Google Gemini API:** Pay per use (~$0.001-0.01 per image)

### Expected Monthly Cost:
- Light usage (10-50 users): **$0-5**
- Medium usage (100-500 users): **$5-20**
- Your friend testing: **FREE** (within free tiers)

---

## 🔧 Troubleshooting

### Frontend shows CORS error
- Check backend CORS settings include your Vercel domain
- Verify backend is running (check Railway logs)
- Test backend health endpoint directly

### Backend 502 error
- Check Railway logs
- Verify GOOGLE_API_KEY is set in Railway environment variables
- Check if backend is sleeping (Railway free tier sleeps after 15min)

### Image upload fails
- Check file size (max 10MB)
- Verify file type (JPEG, PNG, WEBP)
- Check Railway logs for errors

### Build fails on Vercel
- Check build logs
- Verify all dependencies in package.json
- Test build locally: `npm run build`

---

## 🎯 Next Steps After Deployment

### Optional Enhancements:
1. **Custom Domain:** Add your own domain on Vercel
2. **Analytics:** Add Google Analytics or Plausible
3. **Rate Limiting:** Protect against abuse
4. **User Feedback:** Add feedback form
5. **More Styles:** Create additional headshot styles
6. **Social Sharing:** Add share buttons

### Maintenance:
- Monitor API usage on Google Cloud
- Check Railway usage dashboard
- Review Vercel analytics
- Update dependencies regularly

---

## 🆘 Need Help?

- **Vercel Docs:** https://vercel.com/docs
- **Railway Docs:** https://docs.railway.app
- **Gemini API Docs:** https://ai.google.dev/docs

---

## ✅ Deployment Complete Checklist

- [ ] Code pushed to GitHub
- [ ] Backend deployed to Railway
- [ ] Environment variables set on Railway
- [ ] Railway domain generated and noted
- [ ] Frontend API URL updated
- [ ] Frontend deployed to Vercel
- [ ] CORS configured for production
- [ ] Tested live app end-to-end
- [ ] Shared URL with friends!

---

**Congratulations! Your Professional Headshot AI app is now LIVE!** 🎉🚀

