const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('removerole')
    .setDescription('Removes a role from a user.')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to remove the role from.')
        .setRequired(true)
    )
    .addRoleOption(option =>
      option.setName('role')
        .setDescription('The role to remove from the user.')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const role = interaction.options.getRole('role');
    const member = interaction.guild.members.cache.get(user.id);

    // Check if the bot has permissions to manage roles
    if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ManageRoles)) {
      return interaction.reply({ content: '❌ I lack the "Manage Roles" permission.', ephemeral: true });
    }

    
    if (role.position >= interaction.guild.members.me.roles.highest.position) {
      return interaction.reply({ content: '❌ I cannot remove a role higher than or equal to my highest role.', ephemeral: true });
    }

    
    try {
      await member.roles.remove(role);
      await interaction.reply({ content: `✅ Successfully removed the role **${role.name}** from **${user.tag}**.` });
    } catch (error) {
      console.error('Error removing role:', error);
      await interaction.reply({ content: '❌ Failed to remove the role. Ensure my role is higher than the target role.', ephemeral: true });
    }
  },
};
