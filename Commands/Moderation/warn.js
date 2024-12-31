const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const fs = require('fs');
const path = require('path');

// Path to the warn data file
const warnsPath = path.resolve(__dirname, '../../Data/warns.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Warn a user for inappropriate behavior.')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to warn.')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for the warning.')
        .setRequired(false)),

  async execute(interaction) {
    const targetUser = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const guildId = interaction.guild.id;
    const userId = targetUser.id;

    // Check if the member has the required permission
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

    
    if (!warnData[guildId]) warnData[guildId] = {};
    if (!warnData[guildId][userId]) {
      warnData[guildId][userId] = { count: 0, warnings: [] };
    }

    
    warnData[guildId][userId].count += 1;
    warnData[guildId][userId].warnings.push({
      date: new Date().toISOString(),
      reason,
      moderator: interaction.user.tag,
    });

    
    fs.writeFileSync(warnsPath, JSON.stringify(warnData, null, 2), 'utf8');

   
    await interaction.reply({
      content: `⚠️ ${targetUser.tag} has been warned.\n**Reason:** ${reason}\n**Total Warnings:** ${warnData[guildId][userId].count}`,
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