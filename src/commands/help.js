const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Shows the available commands."),

  async execute(interaction) {
    const commands = [
      "/help - Show the command list",
      "/ping - Check bot response time",
      "/status - Show bot status and uptime",
      "/say - Say something from the bot",
      "/uptime - Show runtime duration"
    ];

    await interaction.reply({
      content: `Miko Bot\n\n${commands.join("\n")}`,
      ephemeral: false
    });
  }
};
