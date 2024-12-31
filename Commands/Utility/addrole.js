const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('addrole')
    .setDescription('Adds a role to a user.')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('The user to assign the role to.')
        .setRequired(true)
    )
    .addRoleOption(option =>
      option.setName('role')
        .setDescription('The role to assign to the user.')
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
  async execute(interaction) {
    const user = interaction.options.getUser('user');
    const role = interaction.options.getRole('role');
    const member = interaction.guild.members.cache.get(user.id);

    
    if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ManageRoles)) {
      return interaction.reply({ content: '❌ I lack the "Manage Roles" permission.', ephemeral: true });
    }

    
    if (role.position >= interaction.guild.members.me.roles.highest.position) {
      return interaction.reply({ content: '❌ I cannot assign a role higher than or equal to my highest role.', ephemeral: true });
    }

    
    try {
      await member.roles.add(role);
      await interaction.reply({ content: `✅ Successfully added the role **${role.name}** to **${user.tag}**.` });
    } catch (error) {
      console.error('Error adding role:', error);
      await interaction.reply({ content: '❌ Failed to add the role. Ensure my role is higher than the target role.', ephemeral: true });
    }
  },
};
