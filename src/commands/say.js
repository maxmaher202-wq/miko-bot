const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Make the bot send a message.")
    .addStringOption(option =>
      option.setName("message")
        .setDescription("Text to send")
        .setRequired(true)
    ),

  async execute(interaction) {
    const message = interaction.options.getString("message");

    await interaction.reply({
      content: message,
      ephemeral: false
    });
  }
};
