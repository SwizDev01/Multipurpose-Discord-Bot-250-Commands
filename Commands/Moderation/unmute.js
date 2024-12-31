const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unmute')
    .setDescription('Remove the timeout from a user.')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('Select the user to unmute.')
        .setRequired(true)),

  permissionsRequired: ['MODERATE_MEMBERS'],
  botPermissions: ['MODERATE_MEMBERS'],

  async execute(interaction) {
    const targetUser = interaction.options.getUser('target');

    await interaction.deferReply();

    if (!interaction.guild) {
      await interaction.editReply({ content: 'This command can only be used in a server.', ephemeral: true });
      return;
    }

    const botMember = interaction.guild.members.cache.get(interaction.client.user.id);

    if (!botMember.permissions.has(PermissionFlagsBits.ModerateMembers)) {
      await interaction.editReply({ content: 'I don\'t have the necessary permissions to remove timeouts. I require `MODERATE_MEMBERS` permission.', ephemeral: true });
      return;
    }

    if (!interaction.member.permissions.has(PermissionFlagsBits.ModerateMembers)) {
      await interaction.editReply({ content: 'You do not have permission to use this command.', ephemeral: true });
      return;
    }

    const memberToUnmute = interaction.guild.members.cache.get(targetUser.id);

    if (!memberToUnmute) {
      await interaction.editReply({ content: 'The specified user is not in the server.', ephemeral: true });
      return;
    }

    try {
      await memberToUnmute.timeout(null); 

      const unmuteInfoEmbed = {
        color: 0x00ff00,
        title: ':white_check_mark: User Unmuted',
        fields: [
          { name: 'Unmuted User', value: `${targetUser.tag} (${targetUser.id})`, inline: true },
          { name: 'Moderator', value: `${interaction.user.tag} (${interaction.user.id})`, inline: true },
        ],
        timestamp: new Date(),
      };

      try {
        await interaction.user.send({ embeds: [unmuteInfoEmbed] });
      } catch (error) {
        console.error('Error sending DM to moderator:', error);
      }

      
      try {
        await targetUser.send({ embeds: [unmuteInfoEmbed] });
      } catch (error) {
        console.error('Error sending DM to unmuted user:', error);
      }

      await interaction.editReply({ content: `Successfully removed timeout for ${targetUser.tag}.`, ephemeral: true });
    } catch (error) {
      console.error('Error unmuting user:', error);
      await interaction.editReply({ content: 'An error occurred while removing the timeout.', ephemeral: true });
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