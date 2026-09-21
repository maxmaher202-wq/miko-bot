const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Shows information about a user.")
    .addUserOption(option => option.setName("user").setDescription("User to inspect").setRequired(false)),

  async execute(interaction) {
    const target = interaction.options.getUser("user") || interaction.user;
    const member = interaction.guild?.members.cache.get(target.id);
    const created = new Date(target.createdTimestamp).toLocaleDateString();

    await interaction.reply({
      embeds: [{
        title: target.username,
        color: 0xffa500,
        thumbnail: { url: target.displayAvatarURL({ dynamic: true }) },
        fields: [
          { name: "ID", value: target.id, inline: true },
          { name: "Created", value: created, inline: true },
          { name: "Bot", value: target.bot ? "Yes" : "No", inline: true },
          { name: "Role", value: member?.roles.highest ? member.roles.highest.name : "No role", inline: true }
        ]
      }]
    });
  }
};
