# Deploying Discord OwO Bot - Free Hosting Options

This guide covers **FREE** deployment options for the Advanced Discord OwO Tool Farm bot.

## 🎯 Important: This is a Long-Running Process

Discord bots need to stay connected 24/7. They are NOT web servers, so:
- ✅ Need platforms that support **long-running processes**
- ❌ **CANNOT** use Vercel/Netlify (serverless - kills processes after seconds)
- ⚠️ **Render Background Workers** - NO FREE TIER (paid only)

## 🆓 Free Deployment Options (Ranked)

### 1. **Railway** ⭐ BEST FREE OPTION
- **Free Tier**: $5 credit/month (enough for small bots)
- **No credit card required** for trial
- **Pros**: Easy setup, doesn't sleep, great for Discord bots
- **Cons**: Limited free credits

### 2. **Fly.io** ⭐ RECOMMENDED
- **Free Tier**: 3 shared VMs, 160GB bandwidth/month
- **Pros**: Generous free tier, global deployment
- **Cons**: Requires credit card for verification

### 3. **Koyeb** 
- **Free Tier**: 1 service, auto-sleeps after inactivity
- **Pros**: No credit card needed
- **Cons**: Sleeps after 30 mins inactivity (not ideal for bots)

### 4. **Render (Web Service with Workaround)** ⚠️
- **Free Tier**: Web services only (spins down after 15 mins)
- **Workaround**: Keep alive with external pings
- **Cons**: Not reliable, bot will disconnect frequently

### 5. **Oracle Cloud (Free Tier)** 💪 BEST FOR 24/7
- **Free Tier**: 2 free VMs forever (ARM-based)
- **Pros**: TRUE 24/7 hosting, no time limits
- **Cons**: Requires credit card, manual server setup (VPS)

### 6. **Your Own Computer/VPS** 💯 MOST RELIABLE
- **Cost**: Free (if you have a PC/Raspberry Pi)
- **Pros**: Full control, truly free, no limits
- **Cons**: Requires your machine to run 24/7

## Prerequisites

- Your Discord account token
- Discord server (guild) ID and channel ID(s)
- (Optional) A webhook URL for notifications
- (Optional) Captcha API key (2captcha or yescaptcha)
- `.env` file with your configuration (copy from `.env.example`)

---

# 🚀 Deployment Guides

## Option 1: Railway (EASIEST & FREE) ⭐

**Free Tier**: $5/month credit (lasts ~500 hours for small bots)

### Step-by-Step:

1. **Create Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your repository

3. **Configure Service**
   - Railway auto-detects Node.js
   - Go to "Variables" tab
   - Click "RAW Editor"
   - Paste your entire `.env` file content

4. **Set Build & Start Commands** (if not auto-detected)
   - Click "Settings" tab
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start start-env`

5. **Deploy**
   - Railway will automatically deploy
   - Check "Deployments" tab for logs

**That's it!** Your bot will run 24/7 until credits run out.

---

## Option 2: Fly.io (GENEROUS FREE TIER) ⭐

**Free Tier**: 3 shared VMs, 160GB transfer/month

### Step-by-Step:

1. **Install Fly CLI**
   ```bash
   # Windows (PowerShell)
   iwr https://fly.io/install.ps1 -useb | iex
   ```

2. **Login/Signup**
   ```bash
   fly auth signup
   # or if you have account
   fly auth login
   ```

3. **Create fly.toml** in your project root:
   ```toml
   app = "your-owo-bot"
   
   [build]
     builder = "heroku/buildpacks:20"
   
   [env]
     NODE_ENV = "production"
   
   [[services]]
     internal_port = 8080
     protocol = "tcp"
   
     [services.concurrency]
       hard_limit = 25
       soft_limit = 20
   ```

4. **Set Environment Variables**
   ```bash
   # Set each variable from your .env file
   fly secrets set DISCORD_TOKEN="your-token"
   fly secrets set GUILD_ID="your-guild-id"
   fly secrets set CHANNEL_IDS="channel1,channel2"
   fly secrets set WAY_NOTIFY="webhook,popup"
   fly secrets set WEBHOOK_URL="your-webhook-url"
   fly secrets set PREFIX="t"
   # ... set all other variables
   ```

5. **Deploy**
   ```bash
   fly deploy
   ```

6. **Check Logs**
   ```bash
   fly logs
   ```

---

## Option 3: Oracle Cloud Free Tier (BEST FOR 24/7) 💪

**Free Tier**: 2 ARM VMs (1GB RAM each) FOREVER - No time limits!

### Step-by-Step:

1. **Create Oracle Cloud Account**
   - Go to https://www.oracle.com/cloud/free/
   - Sign up (requires credit card but won't be charged)

2. **Create Compute Instance**
   - Go to "Compute" → "Instances"
   - Click "Create Instance"
   - Choose: **Always Free Eligible** (ARM-based)
   - OS: Ubuntu 22.04 LTS

3. **Connect via SSH**
   ```bash
   ssh ubuntu@your-instance-ip
   ```

4. **Setup Node.js**
   ```bash
   # Install Node.js
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs git
   
   # Install PM2 (process manager)
   sudo npm install -g pm2
   ```

5. **Clone & Setup Project**
   ```bash
   # Clone your repo
   git clone https://github.com/your-username/advanced-discord-owo-tool-farm.git
   cd advanced-discord-owo-tool-farm
   
   # Install dependencies
   npm install
   
   # Build
   npm run build
   
   # Create .env file
   nano .env
   # Paste your environment variables, save (Ctrl+X, Y, Enter)
   ```

6. **Run with PM2**
   ```bash
   # Start bot
   pm2 start npm --name "owo-bot" -- start start-env
   
   # Save PM2 config
   pm2 save
   
   # Auto-start on reboot
   pm2 startup
   # Run the command it outputs
   ```

7. **Monitor**
   ```bash
   pm2 logs owo-bot
   pm2 status
   ```

**Your bot will run 24/7 FOREVER for FREE!**

---

## Option 4: Run on Your Own Computer (100% FREE) 💻

### Windows:

1. **Open PowerShell in project directory**

2. **Create .env file** (already done if you have `.env`)

3. **Install & Build**
   ```powershell
   npm install
   npm run build
   ```

4. **Run**
   ```powershell
   npm start start-env
   ```

5. **Keep Running 24/7 with PM2** (optional)
   ```powershell
   npm install -g pm2-windows-startup
   npm install -g pm2
   
   pm2 start npm --name "owo-bot" -- start start-env
   pm2 save
   pm2-startup install
   ```

**Pros**: Completely free, full control  
**Cons**: Your computer must stay on 24/7

---

# 📊 Comparison Table

| Platform | Free Tier | Setup Difficulty | 24/7 Runtime | Credit Card |
|----------|-----------|------------------|--------------|-------------|
| **Railway** | $5/mo credit (~500hrs) | ⭐ Easy | ✅ Yes | ❌ No |
| **Fly.io** | 3 VMs, 160GB transfer | ⭐⭐ Medium | ✅ Yes | ✅ Yes |
| **Oracle Cloud** | 2 VMs forever | ⭐⭐⭐ Hard | ✅ Yes | ✅ Yes |
| **Your PC** | Unlimited | ⭐ Easy | ✅ Yes | ❌ No |
| **Koyeb** | 1 service | ⭐ Easy | ❌ Sleeps | ❌ No |
| Render | ❌ No free workers | Easy | N/A | Yes |
| Vercel | ❌ Not compatible | N/A | ❌ No | No |

---

# 🎯 Recommendation

**For Beginners**: Use **Railway** (easiest, no credit card)  
**For Long-term**: Use **Oracle Cloud Free Tier** (true 24/7 forever)  
**For Quick Test**: Use **Your Own Computer**

---

---

# 📖 Additional Information

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

---

# 🛠️ Troubleshooting

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
- Missing dependencies (run `npm install` locally first)
- Node version mismatch (most platforms use Node 18+)
- Out of memory during build (upgrade plan or use lighter build)

---

# 🔒 Security Best Practices

✅ **DO:**
- Use environment variables for all sensitive data
- Keep your repository private if it contains any config
- Use webhooks for notifications instead of DMs when possible
- Regularly rotate your Discord token

❌ **DON'T:**
- Commit `.env` files to git
- Share your Discord token
- Use your main Discord account (use an alt account)
- Share your deployment platform credentials

---

# 🔄 Updating Your Bot

If you encounter issues:

1. Check the [GitHub Issues](https://github.com/Kyou-Izumi/advanced-discord-owo-tool-farm/issues)
2. Review your platform's documentation
3. Test locally first: `npm start start-env`
4. Make sure all environment variables match `.env.example`

---

**Happy farming! 🌾**
