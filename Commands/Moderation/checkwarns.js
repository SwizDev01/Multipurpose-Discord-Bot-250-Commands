const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');
const path = require('path');

// Path to the warn data file
const warnsPath = path.resolve(__dirname, '../../Data/warns.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('checkwarns')
    .setDescription('Check the number of warnings a user has in this guild.')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to check warnings for.')
        .setRequired(true)),

  async execute(interaction) {
    const targetUser = interaction.options.getUser('user');
    const guildId = interaction.guild.id;

    if (!interaction.member.permissions.has(PermissionFlagsBits.ModerateMembers)) {
      return interaction.reply({
        content: 'You don\'t have the required permission to use this command.',
        ephemeral: true,
      });
    }

    let warnData = {};
    if (fs.existsSync(warnsPath)) {
      warnData = JSON.parse(fs.readFileSync(warnsPath, 'utf8'));
    }

    const userWarnings = warnData[guildId]?.[targetUser.id];
    if (!userWarnings || userWarnings.count === 0) {
      return interaction.reply({
        content: `${targetUser.tag} has no warnings in this guild.`,
        ephemeral: true,
      });
    }

    await interaction.reply({
      content: `⚠️ ${targetUser.tag} has **${userWarnings.count} warning(s)** in this guild.`,
      ephemeral: true,
    });
  },
};

/**********************************************************
 * @INFO
 * Bot Coded by PHV#3071 | CJ#0007 (__cj__) | https://discord.gg/YeHzYykQHd
 * @INFO
 * YouTube: UNKNOWN PHV | https://www.youtube.com/@phvdev04/
 * @INFO
 * Do Not Remove Credits | You can Make Modifications in command files if you find a Potential error.
 * @INFO
 *********************************************************/