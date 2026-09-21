const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("uptime")
    .setDescription("Shows how long the bot has been running."),

  async execute(interaction) {
    const uptime = Math.floor(process.uptime());
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = uptime % 60;

    await interaction.reply({
      content: `Bot uptime: ${hours}h ${minutes}m ${seconds}s`,
      ephemeral: false
    });
  }
};
