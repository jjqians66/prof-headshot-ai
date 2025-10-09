# Publishing Your Professional Headshot AI App

This guide covers all your options to publish and share your app with friends and users.

---

## 🎯 Quick Summary

To let your friend use the app, you need to deploy:
1. **Frontend** (React app) - Publicly accessible
2. **Backend** (Express API) - Needs to handle image uploads and API calls
3. **Environment Variables** - Securely manage your Google API key

---

## 📊 Deployment Options Comparison

| Option | Cost | Difficulty | Setup Time | Best For |
|--------|------|------------|------------|----------|
| **Vercel + Railway** | Free tier available | Easy | 15-20 min | Quick sharing |
| **Netlify + Render** | Free tier available | Easy | 15-20 min | Simple deployment |
| **Google Cloud Run** | Pay-per-use (~$0) | Medium | 30-45 min | Full Google integration |
| **AWS (Amplify + Lambda)** | Free tier (12 months) | Medium | 45-60 min | Scalable production |
| **DigitalOcean App Platform** | $5-12/month | Easy | 20-30 min | Simple all-in-one |
| **Heroku** | $5-7/month | Easy | 15-20 min | Classic choice |

---

## 🚀 RECOMMENDED: Option 1 - Vercel (Frontend) + Railway (Backend)

**Best for:** Quick deployment, free tier, easy setup

### Why This Option?
- ✅ Both have generous free tiers
- ✅ Automatic deployments from GitHub
- ✅ Easy environment variable management
- ✅ Great for demos and small projects
- ✅ No credit card required for free tier

### Frontend: Deploy to Vercel

**Cost:** FREE (Hobby plan)
- Unlimited bandwidth
- Automatic HTTPS
- Custom domain support

**Steps:**

1. **Push code to GitHub** (if not already)
   ```bash
   cd /Users/jj/projects/prof_headshot
   git init
   git add .
   git commit -m "Initial commit"
   # Create repo on GitHub, then:
   git remote add origin https://github.com/YOUR_USERNAME/prof-headshot-ai.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Visit https://vercel.com
   - Sign up with GitHub
   - Click "New Project"
   - Import your `prof_headshot` repository
   - Configure:
     - **Framework Preset:** Vite
     - **Root Directory:** `./`
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
   - Click "Deploy"

3. **Update Frontend API URL**
   - After backend is deployed, update `src/services/api.ts`
   - Change `const API_BASE_URL = 'http://localhost:3001/api'`
   - To: `const API_BASE_URL = 'https://your-backend.railway.app/api'`
   - Redeploy

### Backend: Deploy to Railway

**Cost:** FREE ($5 credit/month, then $0.000463/min)
- Handles ~10,000 API requests/month free
- 500MB storage included

**Steps:**

1. **Prepare backend for deployment**
   
   Create `server/package.json` if not exists (should already be there)

2. **Create `.dockerignore` in server folder**
   ```
   node_modules
   uploads/*
   !uploads/.gitkeep
   .env
   ```

3. **Deploy to Railway**
   - Visit https://railway.app
   - Sign up with GitHub
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository
   - Configure:
     - **Root Directory:** `server`
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
   
4. **Add Environment Variables in Railway**
   - Go to your project → Variables
   - Add:
     ```
     GOOGLE_API_KEY=your_api_key_here
     PORT=3001
     NODE_ENV=production
     ```

5. **Generate Domain**
   - Railway will auto-generate a public URL
   - Copy this URL (e.g., `https://prof-headshot-backend.railway.app`)

6. **Update CORS in backend**
   - Add your Vercel domain to allowed origins in `server/server.js`

**Your app will be live!** Share the Vercel URL with your friend.

---

## 🌟 Option 2 - Netlify (Frontend) + Render (Backend)

**Similar to Option 1, different providers**

### Frontend: Netlify
- Visit https://netlify.com
- Drag & drop `dist` folder OR connect GitHub
- Free plan: 100GB bandwidth/month

### Backend: Render
- Visit https://render.com
- Free plan: 750 hours/month
- Auto-sleep after 15 min inactivity (wakes on request)
- Takes 30-60 seconds to wake up

**Steps similar to Railway**

---

## 🏢 Option 3 - Google Cloud Run (All-in-One Google)

**Best for:** Full Google ecosystem integration, serverless

**Cost:** Pay-per-use
- First 2 million requests/month FREE
- ~$0.00002400 per request after that
- Realistically FREE for personal use

### Why This Option?
- ✅ Same ecosystem as Gemini API
- ✅ True serverless (scales to zero)
- ✅ Only pay when used
- ✅ Very generous free tier
- ⚠️ More complex setup

### Steps:

1. **Install Google Cloud CLI**
   ```bash
   brew install --cask google-cloud-sdk
   gcloud init
   ```

2. **Create `Dockerfile` in project root**
   ```dockerfile
   FROM node:18-alpine
   
   WORKDIR /app
   
   # Copy frontend
   COPY package*.json ./
   RUN npm install
   COPY . .
   RUN npm run build
   
   # Copy backend
   WORKDIR /app/server
   COPY server/package*.json ./
   RUN npm install --production
   COPY server/ .
   
   # Serve both
   EXPOSE 8080
   CMD ["npm", "start"]
   ```

3. **Deploy**
   ```bash
   gcloud run deploy prof-headshot-ai \
     --source . \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated
   ```

4. **Set environment variables**
   ```bash
   gcloud run services update prof-headshot-ai \
     --set-env-vars GOOGLE_API_KEY=your_key
   ```

---

## 💰 Option 4 - DigitalOcean App Platform

**Best for:** Simple all-in-one, predictable pricing

**Cost:** $5-12/month
- Includes frontend + backend
- 500GB bandwidth
- Always on (no cold starts)

### Steps:

1. Visit https://cloud.digitalocean.com
2. Create App → Import from GitHub
3. Configure as monorepo:
   - **Frontend:** Root directory, build with `npm run build`
   - **Backend:** `/server` directory, run with `npm start`
4. Add environment variables
5. Deploy

**Benefits:**
- Simple pricing
- No surprises
- Always fast (no cold starts)
- Great for production

---

## 🎓 Option 5 - For Testing/Demos: Ngrok (Temporary)

**Best for:** Quick testing, showing to friends NOW

**Cost:** FREE for temporary URLs
- Perfect for immediate demos
- URL changes each restart
- Not for permanent deployment

### Steps:

1. **Install ngrok**
   ```bash
   brew install ngrok
   ```

2. **Start your local servers**
   ```bash
   # Terminal 1 - Frontend
   cd /Users/jj/projects/prof_headshot
   npm run dev
   
   # Terminal 2 - Backend
   cd /Users/jj/projects/prof_headshot/server
   npm run dev
   ```

3. **Expose backend to internet**
   ```bash
   # Terminal 3
   ngrok http 3001
   ```
   
   You'll get a URL like: `https://abc123.ngrok.io`

4. **Update frontend API URL**
   - Change `src/services/api.ts` to use ngrok URL
   - Restart frontend

5. **Expose frontend**
   ```bash
   # Terminal 4
   ngrok http 5173
   ```

6. **Share the frontend ngrok URL** with your friend

**Limitations:**
- Temporary URLs (expire when you stop)
- Free tier limits: 40 requests/min
- Not suitable for permanent sharing

---

## 📋 Pre-Deployment Checklist

Before deploying, make sure:

- [ ] Remove any hardcoded API keys
- [ ] Update CORS settings for production domains
- [ ] Test the app locally one more time
- [ ] Add error handling for production
- [ ] Update README.md with live demo link
- [ ] Consider adding rate limiting
- [ ] Add analytics (optional - Google Analytics, Plausible)
- [ ] Test on mobile devices
- [ ] Check image upload size limits
- [ ] Ensure environment variables are set correctly

---

## 🔐 Security Considerations

### Environment Variables
**Never commit:**
- `.env` file
- API keys
- Secrets

**Always:**
- Use platform environment variable settings
- Keep `.env` in `.gitignore`
- Rotate keys if exposed

### API Key Protection
Your backend should:
- ✅ Never expose API key to frontend
- ✅ Validate all inputs
- ✅ Implement rate limiting
- ✅ Add file size restrictions
- ✅ Clean up temporary files

### Rate Limiting (Recommended)
Add to your backend:
```bash
npm install express-rate-limit
```

---

## 📊 Cost Estimates (Monthly)

### FREE Options:
- **Vercel (Frontend):** $0
- **Railway (Backend):** $0 - $5 (after free credits)
- **Netlify (Frontend):** $0
- **Render (Backend):** $0 (with cold starts)
- **Google Cloud Run:** $0 - $2 (for small usage)

### Paid Options:
- **DigitalOcean App Platform:** $12/month
- **Heroku:** $7/month (Eco plan)
- **AWS:** Variable, likely $5-20/month

### Google API Costs:
- **Gemini API:** Pay-per-use
- Approximately $0.001-0.01 per image generation
- 1000 generations = $1-10

---

## 🎯 My Recommendation for You

**For sharing with friends (small scale):**

1. **Deploy to Vercel + Railway** (FREE)
   - Takes 20 minutes
   - Free forever for small usage
   - Professional URLs
   - Easy to update

2. **If you want it always fast:**
   - **DigitalOcean App Platform** ($12/month)
   - No cold starts
   - Predictable performance
   - Worth it if many people use it

3. **For immediate testing today:**
   - Use **ngrok**
   - Takes 5 minutes
   - Free and instant
   - Good for showing one person

---

## 📝 Next Steps

1. Choose your deployment option
2. Follow the specific steps above
3. Test thoroughly before sharing
4. Send the live URL to your friend!

---

## 🆘 Need Help?

Common issues and solutions:

**Build fails:**
- Check all dependencies are in `package.json`
- Ensure Node version compatibility (18+)
- Review build logs

**Backend 502 errors:**
- Check environment variables are set
- Verify API key is correct
- Check backend logs

**CORS errors:**
- Update backend CORS settings
- Add frontend domain to allowed origins
- Ensure credentials are set correctly

**Image upload fails:**
- Check file size limits on platform
- Verify disk space available
- Test with smaller images

---

## 🎉 After Deployment

Share with your friend:
1. Live URL
2. Supported image formats (JPEG, PNG, WEBP)
3. Max file size (10MB)
4. Available styles (Corporate, Creative, Executive)

Consider adding:
- Usage analytics
- User feedback form
- Social sharing buttons
- More styles
- Batch processing

---

Good luck with your deployment! 🚀

