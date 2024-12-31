const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('massban')
    .setDescription('Ban multiple users at once.')
    .addStringOption(option =>
      option.setName('user_ids')
        .setDescription('Provide user IDs separated by commas.')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Reason for banning users.')
        .setRequired(false)),

  permissionsRequired: ['ADMINISTRATOR'],
  botPermissions: ['BAN_MEMBERS'],

  async execute(interaction) {
    const userIds = interaction.options.getString('user_ids').split(',').map(id => id.trim());
    const reason = interaction.options.getString('reason') || 'No reason provided';

    if (!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
    }

    await interaction.deferReply();
    const failedBans = [];

    for (const id of userIds) {
      try {
        await interaction.guild.members.ban(id, { reason });
      } catch (error) {
        failedBans.push(id);
      }
    }

    const response = failedBans.length > 0
      ? `Banned users, except for the following IDs: ${failedBans.join(', ')}.`
      : 'Successfully banned all specified users.';
    interaction.editReply(response);
  },
};
