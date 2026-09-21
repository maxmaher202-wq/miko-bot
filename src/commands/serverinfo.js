const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Shows server information."),

  async execute(interaction) {
    const guild = interaction.guild;
    if (!guild) {
      return interaction.reply({ content: "This command can only be used in a server.", ephemeral: true });
    }

    const owner = await guild.fetchOwner();
    const created = new Date(guild.createdTimestamp).toLocaleDateString();

    await interaction.reply({
      embeds: [{
        title: guild.name,
        color: 0x00ff88,
        thumbnail: { url: guild.iconURL({ dynamic: true }) || "" },
        fields: [
          { name: "Members", value: `${guild.memberCount}`, inline: true },
          { name: "Owner", value: `<@${owner.id}>`, inline: true },
          { name: "Created", value: created, inline: true },
          { name: "Boost Level", value: `${guild.premiumTier}`, inline: true }
        ]
      }]
    });
  }
};
