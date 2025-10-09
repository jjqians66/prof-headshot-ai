#!/bin/bash

# Replace YOUR_USERNAME with your actual GitHub username
GITHUB_USERNAME="YOUR_USERNAME"

echo "🚀 Pushing Professional Headshot AI to GitHub..."
echo ""
echo "⚠️  IMPORTANT: Replace YOUR_USERNAME in this script with your GitHub username first!"
echo ""

cd /Users/jj/projects/prof_headshot

# Add remote (replace YOUR_USERNAME with your actual GitHub username)
git remote add origin https://github.com/$GITHUB_USERNAME/prof-headshot-ai.git

# Rename branch to main
git branch -M main

# Push to GitHub
git push -u origin main

echo ""
echo "✅ Code pushed to GitHub!"
echo "📍 Visit: https://github.com/$GITHUB_USERNAME/prof-headshot-ai"
echo ""
echo "Next steps:"
echo "1. Deploy backend to Railway: https://railway.app"
echo "2. Deploy frontend to Vercel: https://vercel.com"
echo "3. Follow DEPLOYMENT_GUIDE.md for detailed instructions"

