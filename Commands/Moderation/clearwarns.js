const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');
const path = require('path');

// Path to the warn data file
const warnsPath = path.resolve(__dirname, '../../Data/warns.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clearwarns')
    .setDescription('Remove the latest warnings for a user in this guild.')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to clear warnings for.')
        .setRequired(true))
    .addIntegerOption(option =>
      option.setName('count')
        .setDescription('The number of warnings to remove.')
        .setRequired(true)),

  async execute(interaction) {
    const targetUser = interaction.options.getUser('user');
    const count = interaction.options.getInteger('count');
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
        content: `${targetUser.tag} has no warnings in this guild to remove.`,
        ephemeral: true,
      });
    }

    const warningsToRemove = Math.min(count, userWarnings.count);
    userWarnings.warnings.splice(-warningsToRemove, warningsToRemove);
    userWarnings.count -= warningsToRemove;

    if (userWarnings.count <= 0) delete warnData[guildId][targetUser.id];
    if (Object.keys(warnData[guildId]).length === 0) delete warnData[guildId];

    fs.writeFileSync(warnsPath, JSON.stringify(warnData, null, 2), 'utf8');

    await interaction.reply({
      content: `Removed the latest ${warningsToRemove} warning(s) for ${targetUser.tag}.`,
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