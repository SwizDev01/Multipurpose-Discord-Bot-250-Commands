const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('lockchannel')
    .setDescription('Locks a channel, hiding it from everyone except specific roles.')
    .addChannelOption(option =>
      option.setName('channel').setDescription('The channel to lock').setRequired(true)
    )
    .addRoleOption(option =>
      option
        .setName('role1')
        .setDescription('The first role to keep access')
        .setRequired(true)
    )
    .addRoleOption(option =>
      option
        .setName('role2')
        .setDescription('The second role to keep access')
        .setRequired(false)
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
    const role1 = interaction.options.getRole('role1');
    const role2 = interaction.options.getRole('role2');

    if (!channel.isTextBased()) {
      return interaction.reply({
        content: '❌ The selected channel is not a text-based channel.',
        ephemeral: true,
      });
    }

    try {
      // Update channel permissions
      await channel.permissionOverwrites.edit(channel.guild.roles.everyone, {
        ViewChannel: false,
      });

      await channel.permissionOverwrites.edit(role1, {
        ViewChannel: true,
      });

      if (role2) {
        await channel.permissionOverwrites.edit(role2, {
          ViewChannel: true,
        });
      }

      await interaction.reply({
        content: `✅ ${channel} has been locked. Only ${role1} ${
          role2 ? `and ${role2} ` : ''
        }can access it now.`,
        ephemeral: true,
      });
    } catch (error) {
      console.error('Error locking channel:', error);
      await interaction.reply({
        content: '❌ An error occurred while locking the channel.',
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