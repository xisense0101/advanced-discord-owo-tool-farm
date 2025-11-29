# Deploying to Render

This guide will walk you through deploying the Advanced Discord OwO Tool Farm bot to [Render](https://render.com) as a **Background Worker** using environment variables.

## 🎯 Important: This is a Background Worker, NOT a Web Service

Discord bots are **long-running processes** that need to stay connected 24/7. They don't serve HTTP requests, so:
- ✅ Deploy as **Background Worker** on Render
- ❌ **DO NOT** deploy as Web Service (will fail health checks)
- ❌ **CANNOT** deploy to Vercel/Netlify (serverless platforms kill long-running processes)

## Prerequisites

- A Render account (sign up at [render.com](https://render.com))
- Your Discord account token
- Discord server (guild) ID and channel ID(s)
- (Optional) A webhook URL for notifications
- (Optional) Captcha API key (2captcha or yescaptcha)

## Quick Start (Using render.yaml)

1. **Fork/Clone this repository** to your GitHub account

2. **Push your code** to GitHub (if you made any changes)

3. **Go to Render Dashboard**
   - Visit https://dashboard.render.com
   - Click "New +" → "Blueprint"
   
4. **Connect your repository**
   - Select your GitHub repository
   - Render will automatically detect `render.yaml`
   
5. **Configure Environment Variables**
   
   After the blueprint is loaded, you'll need to set these **required** variables:
   
   | Variable | Description | Example |
   |----------|-------------|---------|
   | `DISCORD_TOKEN` | Your Discord account token | `xxx.yyy.zzz` |
   | `GUILD_ID` | Discord server ID | `123456789012345678` |
   | `CHANNEL_IDS` | Channel IDs (comma-separated) | `111111111111111111,222222222222222222` |
   | `WEBHOOK_URL` | Discord webhook for notifications | `https://discord.com/api/webhooks/...` |
   | `ADMIN_ID` | Your Discord user ID | `123456789012345678` |
   | `CAPTCHA_API_KEY` | API key for captcha service | `your-api-key` |

6. **Deploy**
   - Click "Apply"
   - Render will build and deploy your bot automatically

## Manual Deployment (Without render.yaml)

If you prefer not to use the blueprint:

### Step 1: Create a New Background Worker

1. Go to https://dashboard.render.com
2. Click "New +" → **"Background Worker"** (NOT Web Service!)
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `advanced-discord-owo-bot` (or any name you prefer)
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start start-env`
   - **Instance Type**: `Free` (or upgrade if needed)

### Step 2: Configure Environment Variables

In the "Environment" section, add the following variables:

#### Required Variables

```env
DISCORD_TOKEN=your.discord.token.here
GUILD_ID=123456789012345678
CHANNEL_IDS=111111111111111111,222222222222222222
```

#### Notification Settings (Optional but Recommended)

```env
WAY_NOTIFY=webhook
WEBHOOK_URL=https://discord.com/api/webhooks/your-webhook-url
ADMIN_ID=123456789012345678
```

#### Captcha Settings (Optional)

```env
CAPTCHA_API=2captcha
CAPTCHA_API_KEY=your-captcha-api-key
```

#### Bot Automation Settings (Optional - defaults shown)

```env
AUTO_HUNTBOT=true
AUTO_TRAIT=efficiency
USE_ADOTF_API=true
AUTO_PRAY=pray
AUTO_GEM=0
GEM_TIER=common,uncommon,rare,epic,mythical
USE_SPECIAL_GEM=false
AUTO_LOOTBOX=true
AUTO_FABLED_LOOTBOX=false
AUTO_QUOTE=owo
AUTO_RPP=run,pup,piku
AUTO_DAILY=true
AUTO_COOKIE=true
AUTO_CLOVER=true
USE_CUSTOM_PREFIX=true
AUTO_SLEEP=true
AUTO_SELL=true
AUTO_RELOAD=true
AUTO_RESUME=true
SHOW_RPC=true
PREFIX=!
```

### Step 3: Deploy

Click "Create Background Worker" and Render will:
1. Clone your repository
2. Install dependencies
3. Build the TypeScript code
4. Start the bot with your environment variables

## Getting Your Discord Token

⚠️ **WARNING**: Never share your Discord token with anyone!

1. Open Discord in your browser
2. Press `F12` to open Developer Tools
3. Go to the "Network" tab
4. Type a message in any channel
5. Look for a request to `messages` or `science`
6. In the request headers, find `authorization`
7. Copy the token value

## Getting IDs (Guild, Channel, User)

1. Enable Developer Mode in Discord:
   - User Settings → Advanced → Developer Mode
2. Right-click on a server/channel/user
3. Click "Copy ID"

## Getting a Webhook URL

1. Go to your Discord server settings
2. Navigate to "Integrations" → "Webhooks"
3. Click "New Webhook"
4. Configure and copy the webhook URL

## Monitoring Your Bot

### View Logs

1. Go to your service in Render Dashboard
2. Click on "Logs" tab
3. You'll see real-time output from your bot

### Check Status

The "Events" tab shows:
- Build status
- Deploy history
- Any errors that occurred

## Troubleshooting

### Bot Doesn't Start

**Check the logs for validation errors:**

```
Configuration validation failed:
{
  "token": { "_errors": ["Token must have three parts separated by dots"] },
  ...
}
```

This means one or more environment variables are missing or invalid.

### "Invalid Token" Error

- Make sure your Discord token is correct
- Tokens expire if you change your password
- Get a fresh token following the steps above

### Bot Starts But Doesn't Send Messages

- Verify `GUILD_ID` is correct
- Check `CHANNEL_IDS` are valid and accessible
- Ensure your Discord account has permission to send messages in those channels

### Build Fails

Common causes:
- TypeScript compilation errors (check the build logs)
- Missing dependencies (should auto-install)
- Node version mismatch (Render uses Node 18+ by default)

### Bot Keeps Restarting

Render's free tier may restart your service if:
- It uses too much memory
- It crashes repeatedly
- **Note**: Free Background Workers don't spin down like Web Services
- You can upgrade to a paid plan for better stability

## Security Best Practices

✅ **DO:**
- Use environment variables for all sensitive data
- Keep your repository private if it contains any config
- Use webhooks for notifications instead of DMs when possible
- Regularly rotate your Discord token

❌ **DON'T:**
- Commit `.env` files to git
- Share your Discord token
- Use your main Discord account (use an alt account)
- Share your Render dashboard access

## Updating Your Bot

When you push changes to GitHub:
1. Render will automatically detect the changes
2. It will rebuild and redeploy your bot
3. Check the "Events" tab to monitor the deployment

To disable auto-deploy:
- Service Settings → "Auto-Deploy" → Toggle off

## Cost

- **Free Tier**: 750 hours/month for Background Workers (enough for one bot running 24/7)
- Unlike Web Services, **Background Workers don't spin down** on free tier
- The bot will run continuously as long as you have available hours
- Upgrade to paid plans for:
  - Unlimited hours
  - More resources
  - Better performance

## Support

If you encounter issues:

1. Check the [GitHub Issues](https://github.com/Kyou-Izumi/advanced-discord-owo-tool-farm/issues)
2. Review Render's [documentation](https://render.com/docs)
3. Make sure all environment variables match the format in `.env.example`

## Alternative: Local Testing

Before deploying to Render, test locally:

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Fill in your credentials in `.env`

3. Run locally:
   ```bash
   npm install
   npm run build
   npm start start-env
   ```

4. If it works locally, it should work on Render!

## Alternative Deployment Platforms

### ✅ **Other Platforms That Work:**

1. **Railway** - Similar to Render, supports long-running processes
2. **Fly.io** - Good for Discord bots, has free tier
3. **DigitalOcean App Platform** - Supports workers
4. **Heroku** - Works but expensive (no free tier anymore)
5. **VPS (Linode, DigitalOcean Droplet, AWS EC2)** - Full control but requires server management

### ❌ **Platforms That DON'T Work:**

1. **Vercel** - Serverless only, kills processes after 10-60 seconds
2. **Netlify** - Static sites and serverless functions only
3. **GitHub Pages** - Static hosting only
4. **Cloudflare Pages** - Static/serverless only

### 🏠 **Can I Deploy as a Normal Node.js Project?**

**Yes!** This IS a normal Node.js project. You can run it anywhere that supports:
- Long-running Node.js processes
- Environment variables
- Outbound HTTPS connections (for Discord API)

**Example on a VPS:**
```bash
# SSH into your server
ssh user@your-server.com

# Clone your repo
git clone https://github.com/your-username/advanced-discord-owo-tool-farm.git
cd advanced-discord-owo-tool-farm

# Install dependencies
npm install

# Build
npm run build

# Create .env file
nano .env
# (paste your environment variables)

# Run with PM2 (process manager)
npm install -g pm2
pm2 start npm --name "owo-bot" -- start start-env
pm2 save
pm2 startup
```

---

**Happy farming! 🌾**
