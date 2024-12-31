const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nickname')
    .setDescription('Change a user\'s nickname.')
    .addUserOption(option =>
      option.setName('user')
        .setDescription('Select the user.')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('nickname')
        .setDescription('Enter the new nickname.')
        .setRequired(true)),

  permissionsRequired: ['MANAGE_NICKNAMES'],
  botPermissions: ['MANAGE_NICKNAMES'],

  async execute(interaction) {
    const targetUser = interaction.options.getUser('user');
    const newNickname = interaction.options.getString('nickname');
    const member = interaction.guild.members.cache.get(targetUser.id);

    if (!interaction.member.permissions.has(PermissionFlagsBits.ManageNicknames)) {
      return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
    }

    try {
      await member.setNickname(newNickname);
      interaction.reply({ content: `Successfully changed ${targetUser.tag}'s nickname to ${newNickname}.` });
    } catch (error) {
      console.error(error);
      interaction.reply({ content: 'Failed to change the nickname.', ephemeral: true });
    }
  },
};
