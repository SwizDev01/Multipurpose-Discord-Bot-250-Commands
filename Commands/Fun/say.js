const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Echoes a message in a specified channel.')
    .addStringOption(option =>
      option
        .setName('message')
        .setDescription('The message to send.')
        .setRequired(true)
    )
    .addChannelOption(option =>
      option
        .setName('channel')
        .setDescription('The channel to send the message in.')
        .setRequired(true)
    ),
  async execute(interaction) {
    const message = interaction.options.getString('message');
    const targetChannel = interaction.options.getChannel('channel');
    const member = interaction.member;

    // Check if the user has permission to send messages in the target channel
    const userPermissions = targetChannel.permissionsFor(member);

    if (!userPermissions || !userPermissions.has(PermissionFlagsBits.SendMessages)) {
      return interaction.reply({
        content: `❌ You don't have permission to send messages in ${targetChannel}.`,
        ephemeral: true,
      });
    }

    // Send the message in the target channel
    try {
      await targetChannel.send(message);
      await interaction.reply({
        content: `✅ Your message has been sent to ${targetChannel}.`,
        ephemeral: true,
      });
    } catch (error) {
      console.error('Error sending message:', error);
      await interaction.reply({
        content: `❌ I couldn't send the message to ${targetChannel}. Make sure I have the necessary permissions.`,
        ephemeral: true,
      });
    }
  },
};
