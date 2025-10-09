# 🔒 Security Checklist Before Publishing

## ✅ Completed Security Measures

### API Key Protection
- [x] API key removed from source code
- [x] Using environment variables only
- [x] `.env` file added to `.gitignore`
- [x] Clear error messages if env vars missing

---

## 📋 Pre-Deployment Security Checklist

Before publishing your app, verify:

### 1. Environment Variables
- [ ] `.env` file is in `.gitignore`
- [ ] No API keys in source code
- [ ] `.env` file is NOT committed to git
- [ ] Created `.env.example` template (without real keys)

### 2. Git Repository
```bash
# Check what's being tracked
git status

# Make sure .env is NOT listed
# If it shows up, run:
git rm --cached .env
git commit -m "Remove .env from tracking"
```

### 3. API Key Security
- [ ] API key only exists in:
  - Local `.env` file (development)
  - Platform environment variables (production)
- [ ] Never shared in:
  - Source code
  - Git commits
  - Screenshots
  - Documentation
  - Chat logs

### 4. Backend Security
- [ ] CORS configured for production domains only
- [ ] File upload size limits enforced (10MB)
- [ ] Rate limiting implemented (optional but recommended)
- [ ] Input validation on all endpoints
- [ ] Error messages don't expose sensitive info

### 5. Frontend Security
- [ ] API calls go through backend only
- [ ] No API keys in frontend code
- [ ] No sensitive data in localStorage
- [ ] HTTPS enabled in production

---

## 🔍 How to Check If Your Key is Exposed

### Before Committing:
```bash
# Search for API keys in your code
cd /Users/jj/projects/prof_headshot
grep -r "AIza" --exclude-dir=node_modules --exclude-dir=.git

# Check git history for exposed keys
git log --all -p | grep -i "AIza"

# Check what files will be committed
git status
git diff
```

### If You Accidentally Committed Your Key:

**IMMEDIATELY:**
1. **Rotate your API key** at https://aistudio.google.com/app/apikey
2. Delete the old key
3. Update your `.env` file with new key
4. If already pushed to GitHub:
   ```bash
   # Remove from git history (advanced)
   git filter-branch --force --index-filter \
   "git rm --cached --ignore-unmatch .env" \
   --prune-empty --tag-name-filter cat -- --all
   
   # Force push (WARNING: destructive)
   git push origin --force --all
   ```
5. Consider using tools like:
   - `git-secrets` to prevent future exposure
   - GitHub's secret scanning alerts

---

## 🚀 Deployment Environment Variables

### For Each Platform:

#### Vercel (Frontend)
- Go to Project Settings → Environment Variables
- Add: (None needed for frontend)

#### Railway (Backend)
- Go to Variables tab
- Add:
  ```
  GOOGLE_API_KEY=your_actual_key_here
  PORT=3001
  NODE_ENV=production
  ```

#### Render (Backend)
- Go to Environment tab
- Add same variables as Railway

#### Google Cloud Run
```bash
gcloud run services update prof-headshot-ai \
  --set-env-vars GOOGLE_API_KEY=your_key_here
```

#### DigitalOcean
- Go to App Settings → Environment Variables
- Add all required variables

---

## 📊 Environment Variable Template

Create this file as `.env.example` (safe to commit):

```bash
# Google API Configuration
# Get your API key from: https://aistudio.google.com/app/apikey
GOOGLE_API_KEY=your_google_api_key_here

# Optional: Google Cloud Project ID
GOOGLE_PROJECT_ID=your_project_id_here

# Server Configuration
PORT=3001
NODE_ENV=development
```

Users can copy this to `.env` and fill in their own values.

---

## 🛡️ Best Practices

### DO:
✅ Use environment variables for ALL secrets
✅ Add `.env` to `.gitignore` immediately
✅ Use different keys for development/production
✅ Rotate keys regularly
✅ Use secret management services for production
✅ Monitor API usage for unusual activity
✅ Set up billing alerts on Google Cloud

### DON'T:
❌ Commit `.env` files
❌ Share API keys in chat/email
❌ Include keys in screenshots
❌ Hardcode keys in source code
❌ Use production keys in development
❌ Share your `.env` file
❌ Store keys in frontend code

---

## 🔐 Additional Security Measures

### Rate Limiting (Recommended)
Add to your backend:

```bash
cd /Users/jj/projects/prof_headshot/server
npm install express-rate-limit
```

Update `server.js`:
```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests, please try again later.'
});

app.use('/api/', limiter);
```

### File Upload Security
Already implemented:
- Max file size: 10MB
- Allowed types: JPEG, PNG, WEBP
- File cleanup after processing

### CORS Security
Update `server.js` for production:
```javascript
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-app.vercel.app',  // Add your production domain
  ],
  credentials: true
}));
```

---

## 📱 Monitoring & Alerts

### Set Up Alerts For:
1. **Google API Usage**
   - Visit Google Cloud Console
   - Set billing alerts
   - Monitor quota usage

2. **Error Rates**
   - Use platform logging (Vercel, Railway)
   - Set up error notifications
   - Monitor unusual patterns

3. **Cost Monitoring**
   - Set budget alerts
   - Review usage weekly
   - Cap spending if needed

---

## ✅ Final Security Check

Before going live, run through this checklist:

```bash
# 1. Check .gitignore includes .env
cat .gitignore | grep ".env"

# 2. Verify .env is not tracked
git status | grep ".env" && echo "WARNING: .env is tracked!" || echo "✓ .env not tracked"

# 3. Search for any hardcoded keys
grep -r "AIza" --exclude-dir=node_modules --exclude-dir=.git

# 4. Check git history
git log --all --oneline | head -20

# 5. Verify environment variables
echo "GOOGLE_API_KEY is set: $([ -n "$GOOGLE_API_KEY" ] && echo "YES" || echo "NO")"
```

All checks should pass before publishing!

---

## 🆘 Emergency: Key Compromised

If your API key is exposed:

1. **Immediately delete the key** at https://aistudio.google.com/app/apikey
2. **Create a new key**
3. **Update your `.env` file**
4. **Restart your backend server**
5. **Update production environment variables**
6. **Review API usage logs** for unauthorized access
7. **Set up billing alerts** to catch unexpected usage

---

## 📚 Additional Resources

- [Google API Security Best Practices](https://cloud.google.com/docs/security/best-practices)
- [OWASP API Security](https://owasp.org/www-project-api-security/)
- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning)
- [Railway Security Docs](https://docs.railway.app/deploy/deployments#environment-variables)

---

**Remember:** Security is not a one-time setup. Regularly review and update your security measures! 🔒

