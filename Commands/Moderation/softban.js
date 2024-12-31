const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('softban')
    .setDescription('Temporarily ban a user to delete their messages.')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('Select the user to softban.')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Specify the reason for the softban.')
        .setRequired(false))
    .addIntegerOption(option =>
      option.setName('delete_days')
        .setDescription('Number of days of messages to delete (1-7). Default is 1.')
        .setRequired(false)),
  permissionsRequired: ['BAN_MEMBERS'],
  botPermissions: ['BAN_MEMBERS'],

  async execute(interaction) {
    const targetUser = interaction.options.getUser('target');
    const reason = interaction.options.getString('reason') || 'No reason provided';
    const deleteDays = interaction.options.getInteger('delete_days') || 1;

    await interaction.deferReply();

    if (!interaction.guild) {
      return interaction.editReply({ content: 'This command can only be used in a server.', ephemeral: true });
    }

    try {
      // Ban the user temporarily
      await interaction.guild.members.ban(targetUser.id, {
        reason: `Softban by ${interaction.user.tag} | Reason: ${reason}`,
        deleteMessageDays: deleteDays
      });

      // Unban the user immediately
      await interaction.guild.members.unban(targetUser.id);

      await interaction.editReply({
        content: `Softbanned **${targetUser.tag}** (Messages deleted: ${deleteDays} days).\nReason: ${reason}`,
        ephemeral: true
      });
    } catch (error) {
      console.error('Error executing softban:', error);
      await interaction.editReply({ content: 'Failed to softban the user. Please check the bot\'s permissions.', ephemeral: true });
    }
  },
};
