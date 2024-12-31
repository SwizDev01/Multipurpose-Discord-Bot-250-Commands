const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const config = require('../../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('antilinkstatus')
    .setDescription('Check the status of the antilink feature for this server.'),

  async execute(interaction) {
    // Check if the user has admin permissions
    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({
        content: '❌ You do not have the required permissions (Administrator) to use this command.',
        ephemeral: true,
      });
    }

    const guildId = interaction.guild.id;

    // Check if the antilink feature is enabled for this guild
    if (config.antiLinkGuildId === guildId) {
      const embed = new EmbedBuilder()
        .setTitle('Antilink Status')
        .setDescription('The antilink feature is **enabled** for this server.')
        .addFields(
          { name: 'Configured Guild', value: `\`${config.antiLinkGuildId}\``, inline: true },
          { name: 'Current Guild', value: `\`${guildId}\``, inline: true }
        )
        .setColor(0x000000)
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } else {
      const embed = new EmbedBuilder()
        .setTitle('Antilink Status')
        .setDescription('The antilink feature is **disabled** for this server.')
        .setColor(0x000000)
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    }
  },
};

/**********************************************************
 * @INFO
 * Bot Coded by PHV#3071 (.ultrondev) | https://discord.gg/YeHzYykQHd
 * @INFO
 * YouTube: UNKNOWN PHV | https://www.youtube.com/@phvdev04/
 * @INFO
 * Do Not Remove Credits | You can Make Modifications in command files if you find a Potential error.
 * @INFO
 *********************************************************/