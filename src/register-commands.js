const { REST, Routes, SlashCommandBuilder } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");
require("dotenv").config();

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.CLIENT_ID;

if (!token || !clientId) {
  console.error("Missing DISCORD_TOKEN or CLIENT_ID in environment variables.");
  process.exit(1);
}

const commands = [];
const commandsPath = path.join(__dirname, "commands");

for (const file of fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))) {
  const command = require(path.join(commandsPath, file));

  if ("data" in command && "execute" in command) {
    commands.push(command.data.toJSON());
  }
}

const rest = new REST({ version: "10" }).setToken(token);

(async () => {
  try {
    console.log(`Registering ${commands.length} slash commands...`);

    await rest.put(Routes.applicationCommands(clientId), {
      body: commands
    });

    console.log("Slash commands registered successfully.");
  } catch (error) {
    console.error("Failed to register slash commands:", error);
    process.exit(1);
  }
})();
