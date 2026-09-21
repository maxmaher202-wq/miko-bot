const { SlashCommandBuilder } = require("discord.js");

function formatUptime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;
  return `${hours}h ${minutes}m ${remainingSeconds}s`;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("botinfo")
    .setDescription("Shows information about the bot."),

  async execute(interaction) {
    const uptime = process.uptime();
    const botOwner = "maxmaher202-wq";

    await interaction.reply({
      embeds: [{
        title: "Miko Bot Information",
        description: "Official lightweight bot built for Render.",
        color: 0x00bfff,
        fields: [
          { name: "Owner", value: botOwner, inline: true },
          { name: "Uptime", value: formatUptime(Math.floor(uptime)), inline: true },
          { name: "Platform", value: "Node.js + Discord.js", inline: true },
          { name: "Mode", value: "Render Ready", inline: true }
        ],
        thumbnail: {
          url: interaction.client.user.displayAvatarURL({ dynamic: true })
        },
        footer: {
          text: "Miko Bot"
        }
      }]
    });
  }
};
