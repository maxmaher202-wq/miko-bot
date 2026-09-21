const fs = require("node:fs");
const path = require("node:path");
const express = require("express");
const { Client, Collection, GatewayIntentBits, Events, ActivityType } = require("discord.js");
const { token, port, botName } = require("./config");

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({
    status: "online",
    bot: botName,
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    ok: true,
    bot: botName,
    timestamp: new Date().toISOString()
  });
});

app.listen(port, () => {
  console.log(`HTTP health server running on port ${port}`);\n});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();

const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);

  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  }
}

client.on(Events.ClientReady, () => {
  console.log(`Connected: ${client.user.tag}`);

  client.user.setPresence({
    activities: [{
      name: "Miko Bot | /help",
      type: ActivityType.Watching
    }],
    status: "online"
  });
});

client.on(Events.InteractionCreate, async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);

    const reply = {
      content: "حدث خطأ أثناء تنفيذ الأمر.",
      ephemeral: true
    };

    if (interaction.replied || interaction.deferred) {
      await interaction.followUp(reply);
    } else {
      await interaction.reply(reply);
    }
  }
});

client.login(token).catch(error => {
  console.error("Failed to log in:", error);
  process.exit(1);
});
