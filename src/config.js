require("dotenv").config();

module.exports = {
  token: process.env.DISCORD_TOKEN,
  clientId: process.env.CLIENT_ID,
  guildId: process.env.GUILD_ID,
  port: Number(process.env.PORT) || 3000,
  botName: "Miko Bot",
  developerName: "maxmaher202-wq"
};
