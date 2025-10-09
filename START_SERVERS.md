# 🚀 How to Start Your Professional Headshot AI App

## Quick Start Guide

Follow these steps to run your app:

### Step 1: Verify Your Google API Key

Make sure your `.env` file in the project root has your API key:

```bash
# Location: /Users/jj/projects/prof_headshot/.env
GOOGLE_API_KEY=AIza...your_actual_key_here
```

---

### Step 2: Open TWO Terminal Windows

You need to run both the frontend and backend simultaneously.

---

## Terminal 1: Start Backend Server

```bash
cd /Users/jj/projects/prof_headshot/server
npm run dev
```

**You should see:**
```
🚀 Professional Headshot AI Backend Server
📡 Server running on http://localhost:3001
🔑 Google API Key configured: true
📁 Uploads directory: /Users/jj/projects/prof_headshot/server/uploads

Available endpoints:
  - GET  http://localhost:3001/
  - GET  http://localhost:3001/api/health
  - GET  http://localhost:3001/api/styles
  - POST http://localhost:3001/api/generate
```

**If you see errors:**
- Make sure your `.env` file has `GOOGLE_API_KEY=` with your actual key
- The key should NOT have quotes around it
- There should be no spaces before or after the `=`

---

## Terminal 2: Frontend is Already Running! ✅

Your frontend is already running at **http://localhost:5173**

If you need to restart it:
```bash
cd /Users/jj/projects/prof_headshot
npm run dev
```

---

## Step 3: Test the App

1. **Open your browser:** http://localhost:5173
2. **Upload a photo:** Drag-and-drop or click to browse
3. **Select a style:** Corporate, Creative, or Executive
4. **Generate:** Click "Generate Headshot"
5. **View results:** See the before/after comparison
6. **Download:** Save your professional headshot!

---

## Testing the Backend API

You can test if the backend is working with these commands:

### Health Check:
```bash
curl http://localhost:3001/api/health
```

### Get Available Styles:
```bash
curl http://localhost:3001/api/styles
```

---

## Troubleshooting

### "GOOGLE_API_KEY is not set"
1. Check that `.env` file exists in `/Users/jj/projects/prof_headshot/`
2. Verify the format: `GOOGLE_API_KEY=your_key_here` (no quotes, no spaces)
3. Restart the backend server after adding the key

### "Port 3001 already in use"
```bash
# Find and kill the process
lsof -ti:3001 | xargs kill -9
# Then restart the server
```

### Backend won't start
1. Make sure you're in the `/server` directory
2. Check that `node_modules` folder exists (run `npm install` if not)
3. Look for error messages in the terminal

### Frontend can't connect to backend
1. Make sure BOTH servers are running
2. Check that backend shows "Server running on http://localhost:3001"
3. Verify no firewall is blocking connections

---

## Current Status

- ✅ Frontend: Running at http://localhost:5173
- ⏳ Backend: Needs to be started in a new terminal

**Next step:** Open a new terminal and start the backend with the commands above!

