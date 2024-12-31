const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unlockchannel')
    .setDescription('Unlocks a previously locked channel.')
    .addChannelOption(option =>
      option.setName('channel').setDescription('The channel to unlock').setRequired(true)
    ),
  async execute(interaction) {
    // Check if the user has the necessary permission
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
      return interaction.reply({
        content: '❌ You do not have permission to use this command.',
        ephemeral: true,
      });
    }

    const channel = interaction.options.getChannel('channel');

    if (!channel.isTextBased()) {
      return interaction.reply({
        content: '❌ The selected channel is not a text-based channel.',
        ephemeral: true,
      });
    }

    try {
      // Reset permissions to allow everyone to view the channel
      await channel.permissionOverwrites.edit(channel.guild.roles.everyone, {
        ViewChannel: true,
      });

      await interaction.reply({
        content: `✅ ${channel} has been unlocked and is now visible to everyone.`,
        ephemeral: true,
      });
    } catch (error) {
      console.error('Error unlocking channel:', error);
      await interaction.reply({
        content: '❌ An error occurred while unlocking the channel.',
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