const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('purge')
    .setDescription('Deletes a specified number of messages in the current channel.')
    .addIntegerOption(option =>
      option
        .setName('amount')
        .setDescription('The number of messages to delete (1-100).')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
  async execute(interaction) {
    const amount = interaction.options.getInteger('amount');

    // Check if the amount is within valid range
    if (amount < 1 || amount > 100) {
      return interaction.reply({
        content: '❌ Please specify a number between 1 and 100.',
        ephemeral: true,
      });
    }

    // Check if the bot has permission to manage messages
    if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ManageMessages)) {
      return interaction.reply({
        content: '❌ I need the "Manage Messages" permission to execute this command.',
        ephemeral: true,
      });
    }

    try {
      // Acknowledge the interaction and defer the reply
      await interaction.deferReply();

      // Bulk delete messages
      const deletedMessages = await interaction.channel.bulkDelete(amount, true);

      // Send a follow-up message with the result
      await interaction.followUp({
        content: `✅ Successfully deleted ${deletedMessages.size} message(s).`,
      });

      // Optionally, log the deleted messages
      console.log(
        `Purged ${deletedMessages.size} messages in #${interaction.channel.name} (${interaction.channel.id}).`
      );
    } catch (error) {
      console.error('Error purging messages:', error);
      // Ensure the bot follows up with an error message if anything goes wrong
      await interaction.followUp({
        content: '❌ Failed to delete messages. Make sure the messages are not older than 14 days.',
      });
    }
  },
};
