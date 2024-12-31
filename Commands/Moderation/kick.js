const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a user from the server.')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('Select the user to kick.')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Specify the reason for kicking the user.')
        .setRequired(false)),

  permissionsRequired: ['KICK_MEMBERS'],
  botPermissions: ['KICK_MEMBERS'],

  async execute(interaction) {
    const targetUser = interaction.options.getUser('target');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    await interaction.deferReply();

    if (!interaction.guild) {
      await interaction.editReply({ content: 'This command can only be used in a server.', ephemeral: true });
      return;
    }

    const botMember = interaction.guild.members.cache.get(interaction.client.user.id);

    if (!botMember.permissions.has(PermissionFlagsBits.KickMembers)) {
      await interaction.editReply({ content: 'I don\'t have the necessary permissions to kick members. I require `KICK_MEMBERS` permission.', ephemeral: true });
      return;
    }

    if (!interaction.member.permissions.has(PermissionFlagsBits.KickMembers)) {
      await interaction.editReply({ content: 'You do not have permission to use this command.', ephemeral: true });
      return;
    }

    const memberToKick = interaction.guild.members.cache.get(targetUser.id);

    if (!memberToKick) {
      await interaction.editReply({ content: 'The specified user is not in the server.', ephemeral: true });
      return;
    }

    if (!memberToKick.kickable) {
      await interaction.editReply({ content: 'I cannot kick this user. They may have higher permissions or roles.', ephemeral: true });
      return;
    }

    try {
      await memberToKick.kick(reason);

      const kickInfoEmbed = {
        color: 0xffa500,
        title: ':boot: User Kicked',
        fields: [
          { name: 'Kicked User', value: `${targetUser.tag} (${targetUser.id})`, inline: true },
          { name: 'Moderator', value: `${interaction.user.tag} (${interaction.user.id})`, inline: true },
          { name: 'Reason', value: reason },
        ],
        timestamp: new Date(),
      };

      
      try {
        await interaction.user.send({ embeds: [kickInfoEmbed] });
      } catch (error) {
        console.error('Error sending DM to moderator:', error);
      }

     
      try {
        await targetUser.send({ embeds: [kickInfoEmbed] });
      } catch (error) {
        console.error('Error sending DM to kicked user:', error);
      }

      await interaction.editReply({ content: `Successfully kicked ${targetUser.tag}. Reason: ${reason}`, ephemeral: true });
    } catch (error) {
      console.error('Error kicking user:', error);
      await interaction.editReply({ content: 'An error occurred while kicking the user.', ephemeral: true });
    }
  },
};

/**********************************************************
 * @INFO
 * Bot Coded by PHV#3071 | CJ#0007 (__cj__) | https://discord.gg/YeHzYykQHd
 * @INFO
 * YouTube: UNKNOWN PHV | https://www.youtube.com/@phvdev04/
 * @INFO
 * Do Not Remove Credits | You can Make Modifications in command files if you find a Potential error.
 * @INFO
 *********************************************************/