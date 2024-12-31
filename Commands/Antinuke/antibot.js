const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
const config = require('../../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('antibotstatus')
    .setDescription('Check the status of the antibot feature for this server.'),

  async execute(interaction) {
    // Check if the user has admin permissions
    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({
        content: '❌ You do not have the required permissions (Administrator) to use this command.',
        ephemeral: true,
      });
    }

    const guildId = interaction.guild.id;

    // Check if the antibot feature is enabled for this guild
    if (config.antiBotGuildId === guildId) {
      const embed = new EmbedBuilder()
        .setTitle('Antibot Status')
        .setDescription('The antibot feature is **enabled** for this server.')
        .addFields(
          { name: 'Configured Guild', value: `\`${config.antiBotGuildId}\``, inline: true },
          { name: 'Current Guild', value: `\`${guildId}\``, inline: true }
        )
        .setColor(0x00ff00)
        .setTimestamp();

      await interaction.reply({ embeds: [embed] });
    } else {
      const embed = new EmbedBuilder()
        .setTitle('Antibot Status')
        .setDescription('The antibot feature is **disabled** for this server.')
        .setColor(0xff0000)
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