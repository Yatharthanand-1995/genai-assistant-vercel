# 🚀 Complete Vercel Deployment Guide

## Step 1: Create GitHub Repository

### Option A: Using GitHub CLI (if installed)
```bash
gh repo create genai-assistant-vercel --public --source=. --remote=origin --push
```

### Option B: Manual Method
1. Go to [github.com/new](https://github.com/new)
2. Repository name: `genai-assistant-vercel`
3. Description: "AI-powered GenAI knowledge assistant with RAG"
4. Keep it public
5. Don't initialize with README (we have one)
6. Click "Create repository"

Then push your code:
```bash
git remote add origin https://github.com/YOUR_USERNAME/genai-assistant-vercel.git
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

### 1. Go to Vercel
- Visit [vercel.com](https://vercel.com)
- Sign in with GitHub

### 2. Import Project
- Click "Add New..." → "Project"
- Select your `genai-assistant-vercel` repository
- Click "Import"

### 3. Configure Build Settings
Vercel will auto-detect Next.js. Verify:
- **Framework Preset**: Next.js
- **Root Directory**: `./`
- **Build Command**: `npm run build`
- **Output Directory**: `.next`

### 4. Add Environment Variables
Click "Environment Variables" and add:

**Required:**
```
ANTHROPIC_API_KEY=your-anthropic-api-key-here
```

**Optional (for full RAG):**
```
PINECONE_API_KEY=your-pinecone-api-key
PINECONE_ENVIRONMENT=us-east-1-aws
PINECONE_INDEX_NAME=genai-assistant
OPENAI_API_KEY=your-openai-key
```

### 5. Deploy
- Click "Deploy"
- Wait 1-2 minutes
- Your app will be live at: `https://genai-assistant-vercel.vercel.app`

## Step 3: Post-Deployment Setup

### Custom Domain (Optional)
1. Go to Settings → Domains
2. Add your domain
3. Follow DNS instructions

### Enable Analytics
1. Go to Analytics tab
2. Enable Web Analytics (free)

### Set Up Pinecone (Optional)
1. Follow `PINECONE_SETUP.md`
2. Add Pinecone environment variables
3. Redeploy to activate

## 🎯 What You'll Get

- ✅ **Live URL**: https://your-app.vercel.app
- ✅ **Automatic HTTPS**: SSL included
- ✅ **Global CDN**: Fast everywhere
- ✅ **Preview URLs**: For each PR
- ✅ **Analytics**: Built-in metrics

## 🧪 Testing Your Deployment

1. Visit your Vercel URL
2. Try these questions:
   - "What is RAG?"
   - "Compare vector databases"
   - "How to build GenAI apps?"

## 📊 Monitoring

### Vercel Dashboard Shows:
- Function invocations
- Bandwidth usage
- Error logs
- Performance metrics

### Check Logs:
```bash
vercel logs --follow
```

## 🚨 Troubleshooting

### "Function timeout"
- Edge functions have 30s limit
- Check for infinite loops

### "Environment variable not found"
- Ensure all vars are added
- Redeploy after adding

### "Build failed"
- Check build logs
- Run `npm run build` locally

## 💰 Staying in Free Tier

**Limits:**
- 100GB bandwidth/month
- 100GB-hours functions
- Unlimited deployments

**Tips:**
- Cache API responses
- Use ISR for static content
- Monitor usage weekly

## 🎉 Success Checklist

- [ ] GitHub repo created
- [ ] Pushed to GitHub
- [ ] Imported to Vercel
- [ ] Environment variables added
- [ ] Deployment successful
- [ ] Custom domain (optional)
- [ ] Analytics enabled
- [ ] Tested live site

## 🆘 Need Help?

1. Check Vercel docs: vercel.com/docs
2. Join Discord: vercel.com/discord
3. Check deployment logs
4. Verify environment variables

Your GenAI Assistant is now LIVE! 🚀🎊