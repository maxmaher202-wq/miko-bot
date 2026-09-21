const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Shows the bot status."),

  async execute(interaction) {
    const uptime = Math.floor(process.uptime());
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = uptime % 60;

    await interaction.reply({
      content: `Status: Online\nUptime: ${hours}h ${minutes}m ${seconds}s`,
      ephemeral: false
    });
  }
};
