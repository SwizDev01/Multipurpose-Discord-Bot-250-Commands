const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clearroles')
    .setDescription('Remove all roles from a user.')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Select the user.')
        .setRequired(true)),

  permissionsRequired: ['MANAGE_ROLES'],
  botPermissions: ['MANAGE_ROLES'],

  async execute(interaction) {
    const targetUser = interaction.options.getUser('user');
    const member = interaction.guild.members.cache.get(targetUser.id);

    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageRoles)) {
      return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
    }

    try {
      const rolesToRemove = member.roles.cache.filter(role => role.name !== '@everyone');
      await member.roles.remove(rolesToRemove);
      interaction.reply({ content: `Successfully removed all roles from ${targetUser.tag}.` });
    } catch (error) {
      console.error(error);
      interaction.reply({ content: 'Failed to remove roles from the user.', ephemeral: true });
    }
  },
};
