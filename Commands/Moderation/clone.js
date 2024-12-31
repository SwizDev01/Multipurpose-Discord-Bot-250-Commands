const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clone')
    .setDescription('Clone a channel.')
    .addChannelOption(option =>
      option.setName('channel')
        .setDescription('Select the channel to clone.')
        .setRequired(true)),

  permissionsRequired: ['MANAGE_CHANNELS'],
  botPermissions: ['MANAGE_CHANNELS'],

  async execute(interaction) {
    const channel = interaction.options.getChannel('channel');

    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageChannels)) {
      return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
    }

    try {
      const clonedChannel = await channel.clone({
        name: `${channel.name}-clone`,
      });
      interaction.reply({ content: `Successfully cloned the channel: ${clonedChannel}` });
    } catch (error) {
      console.error(error);
      interaction.reply({ content: 'Failed to clone the channel.', ephemeral: true });
    }
  },
};
