# 🚀 Deploying to Vercel - Step by Step

## Prerequisites
- GitHub account
- Vercel account (free at vercel.com)
- Your Anthropic API key

## Step 1: Prepare for Deployment

1. **Test locally** to ensure everything works:
   ```bash
   npm run build
   npm start
   ```

2. **Update environment variables** in `.env.local`:
   ```
   ANTHROPIC_API_KEY=your_actual_api_key
   ```

## Step 2: Push to GitHub

1. Create a new repository on GitHub
2. Push your code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/genai-assistant-vercel.git
   git push -u origin main
   ```

## Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Configure your project:
   - Framework Preset: Next.js (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

5. **Add Environment Variables**:
   - Click "Environment Variables"
   - Add: `ANTHROPIC_API_KEY` = `your_actual_api_key`
   - Optional: Add Pinecone keys if using

6. Click "Deploy"

## Step 4: Post-Deployment

1. **Custom Domain** (optional):
   - Go to Settings → Domains
   - Add your custom domain

2. **Analytics** (free):
   - Enable Vercel Analytics in project settings

3. **Speed Insights** (free tier):
   - Enable for performance monitoring

## 🎯 What Happens on Vercel

1. **Automatic CI/CD**: Every push to GitHub triggers a new deployment
2. **Preview Deployments**: Each PR gets its own preview URL
3. **Edge Functions**: Your chat API runs at the edge for low latency
4. **Global CDN**: Static assets served from 100+ locations

## 🔧 Troubleshooting

### "Function Size Exceeded"
- Remove unused dependencies
- Use dynamic imports for large libraries

### "Timeout Error"
- Edge functions have 30s limit (plenty for streaming)
- Regular functions have 10s limit on hobby plan

### "Environment Variable Not Found"
- Ensure variables are added in Vercel dashboard
- Redeploy after adding variables

## 📊 Monitoring

1. **Vercel Dashboard** shows:
   - Request logs
   - Function invocations
   - Error tracking
   - Performance metrics

2. **Logs**: Access via dashboard or CLI:
   ```bash
   vercel logs
   ```

## 🚀 Production Tips

1. **Enable Caching** for static assets
2. **Set up Error Tracking** (Sentry integration)
3. **Monitor API Usage** to control costs
4. **Use ISR** for dynamic content that changes infrequently
5. **Enable Web Analytics** for user insights

## 💰 Cost Optimization

Free tier includes:
- 100GB bandwidth
- 100 GB-hours of function execution
- Unlimited static requests

To stay within limits:
- Cache API responses when possible
- Use Edge Config for frequently accessed data
- Implement rate limiting

## 🎉 Success!

Your GenAI Assistant is now live on Vercel with:
- Automatic HTTPS
- Global distribution
- Automatic scaling
- CI/CD pipeline

Share your deployment URL and start chatting! 🤖✨