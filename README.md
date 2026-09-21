# Miko Bot

A lightweight Miko-style Discord bot designed for Render deployment.

## Features
- Slash commands
- Health check endpoint for Render
- Modular bot structure
- Simple and clean codebase
- Ready to deploy

## Included commands
- /help
- /ping
- /status
- /uptime
- /say
- /serverinfo
- /userinfo
- /botinfo

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp .env.example .env
```

Then edit `.env`:

```env
DISCORD_TOKEN=YOUR_DISCORD_BOT_TOKEN
CLIENT_ID=YOUR_DISCORD_CLIENT_ID
GUILD_ID=YOUR_TEST_GUILD_ID
PORT=3000
```

3. Register slash commands:

```bash
npm run register
```

4. Start the bot:

```bash
npm start
```

## Deploy on Render

Use the included `render.yaml` file.

### Render settings
- Build Command: `npm install`
- Start Command: `npm start`
- Health Check Path: `/health`

## Notes
- Render free tier may sleep after inactivity.
- For longer uptime, use a paid plan or a persistent host.

## Important
This bot is a clean, lightweight Miko-inspired base and can be expanded with moderation, music, logs, reactions, and admin commands.
