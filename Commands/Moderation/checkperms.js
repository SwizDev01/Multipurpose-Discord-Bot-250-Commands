const { SlashCommandBuilder, PermissionFlagsBits, ChannelType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('checkperms')
    .setDescription('Check a user\'s permissions for a specific channel.')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Select the user to check.')
        .setRequired(true))
    .addChannelOption(option =>
      option.setName('channel')
        .setDescription('Select the channel to check permissions in.')
        .addChannelTypes(ChannelType.GuildText)
        .setRequired(false)),
  permissionsRequired: ['MANAGE_ROLES'],
  botPermissions: ['VIEW_AUDIT_LOG'],

  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const channel = interaction.options.getChannel('channel') || interaction.channel;

    await interaction.deferReply();

    const member = interaction.guild.members.cache.get(user.id);

    if (!member) {
      return interaction.editReply({ content: 'The user is not in this server.', ephemeral: true });
    }

    const permissions = channel.permissionsFor(member);

    if (!permissions) {
      return interaction.editReply({ content: 'Unable to retrieve permissions for the user in this channel.', ephemeral: true });
    }

    const permissionsList = permissions.toArray().map(perm => `\`${perm}\``).join(', ') || 'No permissions found.';

    await interaction.editReply({
      content: `**Permissions for ${user.tag} in #${channel.name}:**\n${permissionsList}`,
      ephemeral: true
    });
  },
};
