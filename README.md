# Miko Bot

Lightweight Miko-style Discord bot for Render deployment.

## Features
- Slash commands
- Health check endpoint for Render
- Modular command structure
- Easy to customize
- Ready for deployment on Render

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Fill in your Discord values in `.env`:

```env
DISCORD_TOKEN=YOUR_DISCORD_BOT_TOKEN
CLIENT_ID=YOUR_DISCORD_CLIENT_ID
GUILD_ID=YOUR_TEST_GUILD_ID
PORT=3000
```

4. Register slash commands:

```bash
npm run register
```

5. Start the bot:

```bash
npm start
```

## Commands
- `/help`
- `/ping`
- `/status`
- `/say`
- `/uptime`

## Render Deployment

Use the included `render.yaml` file.

## Notes

The free Render plan may sleep after inactivity, but the application is prepared for health checks and restart-safe operation.
