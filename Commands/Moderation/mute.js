const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Mute a member in the server.')
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to mute.')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('duration')
        .setDescription('Mute duration (e.g., 10s, 5m, 2h, 1d).')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for muting.')
        .setRequired(false)
    ),

  async execute(interaction) {
    const member = interaction.options.getMember('user');
    const durationInput = interaction.options.getString('duration');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    if (!member) {
      return interaction.reply({
        content: 'The specified user is not in the server.',
        ephemeral: true,
      });
    }

    if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers)) {
      return interaction.reply({
        content: 'I do not have permission to mute members.',
        ephemeral: true,
      });
    }

    if (!member.moderatable) {
      return interaction.reply({
        content: `I cannot mute ${member.user.tag}. They might have a higher role or I lack sufficient permissions.`,
        ephemeral: true,
      });
    }

    // Parse the duration input
    const durationRegex = /^(\d+)(s|m|h|d)$/i;
    const match = durationInput.match(durationRegex);

    if (!match) {
      return interaction.reply({
        content: 'Invalid duration format. Use `10s` for seconds, `10m` for minutes, `10h` for hours, or `10d` for days.',
        ephemeral: true,
      });
    }

    const value = parseInt(match[1], 10);
    const unit = match[2].toLowerCase();

    // Convert duration to milliseconds
    let durationMs;
    switch (unit) {
      case 's':
        durationMs = value * 1000;
        break;
      case 'm':
        durationMs = value * 60 * 1000;
        break;
      case 'h':
        durationMs = value * 60 * 60 * 1000;
        break;
      case 'd':
        durationMs = value * 24 * 60 * 60 * 1000;
        break;
      default:
        return interaction.reply({
          content: 'Something went wrong with the duration parsing.',
          ephemeral: true,
        });
    }

    try {
      await member.timeout(durationMs, reason);

      const muteInfoEmbed = {
        color: 0xffa500,
        title: ':mute: User Muted',
        fields: [
          { name: 'Muted User', value: `${member.user.tag} (${member.user.id})`, inline: true },
          { name: 'Duration', value: `${value}${unit}`, inline: false },
          { name: 'Reason', value: reason, inline: false },
          { name: 'Moderator', value: `${interaction.user.tag} (${interaction.user.id})`, inline: false },
        ],
        timestamp: new Date(),
      };

      await interaction.reply({
        embeds: [muteInfoEmbed],
      });
    } catch (error) {
      console.error(`Error muting ${member.user.tag}:`, error.message);
      await interaction.reply({
        content: 'An error occurred while attempting to mute the member.',
        ephemeral: true,
      });
    }
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