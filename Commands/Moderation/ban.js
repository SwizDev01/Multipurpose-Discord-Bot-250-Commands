const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban a user from the server.')
    .addUserOption(option =>
      option.setName('target')
        .setDescription('Select the user to ban.')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('Specify the reason for banning the user.')
        .setRequired(false)),

  permissionsRequired: ['BAN_MEMBERS'],
  botPermissions: ['BAN_MEMBERS'],

  async execute(interaction) {
    const targetUser = interaction.options.getUser('target');
    const reason = interaction.options.getString('reason') || 'No reason provided';

    await interaction.deferReply();

    if (!interaction.guild) {
      await interaction.editReply({ content: 'This command can only be used in a server.', ephemeral: true });
      return;
    }

    const botMember = interaction.guild.members.cache.get(interaction.client.user.id);

    if (!botMember.permissions.has(PermissionFlagsBits.BanMembers)) {
      await interaction.editReply({ content: 'I don\'t have necessary permissions to ban members. I require `BAN_MEMBERS` permission.', ephemeral: true });
      return;
    }

    if (!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) {
      await interaction.editReply({ content: 'You do not have permission to use this command.', ephemeral: true });
      return;
    }

    const bannedMember = interaction.guild.members.cache.get(targetUser.id);

    try {
      await interaction.guild.members.ban(targetUser.id, { reason });

      const banInfoEmbed = {
        color: 0xff0000,
        title: ':hammer: User Banned',
        fields: [
          { name: 'Banned User', value: `${targetUser.tag} (${targetUser.id})`, inline: true },
          { name: 'Moderator', value: `${interaction.user.tag} (${interaction.user.id})`, inline: true },
          { name: 'Reason', value: reason },
        ],
        timestamp: new Date(),
      };

      
      try {
        const modDM = await interaction.user.send({ embeds: [banInfoEmbed] });
      } catch (error) {
        console.error('Error sending DM to moderator:', error);
      }

      
      try {
        const bannedUserDM = await targetUser.send({ embeds: [banInfoEmbed] });
        console.log(`Banned user DM sent: ${bannedUserDM.url}`);
      } catch (error) {
        console.error('Error sending DM to banned user:', error);
      }

      await interaction.editReply({ content: `Successfully banned ${targetUser.tag}. Reason: ${reason}`, ephemeral: true });
    } catch (error) {
      console.error('Error banning user:', error);
      await interaction.editReply({ content: 'An error occurred while banning the user.', ephemeral: true });
    }
  },
};

/**********************************************************
 * @INFO
 * Bot Coded by PHV DEVELOPMENT | https://discord.gg/YeHzYykQHd
 * @INFO
 * YouTube: UNKNOWN PHV | https://www.youtube.com/@phvdev04/
 * @INFO
 * Do Not Remove Credits | You can Make Modifications in command files if you find a Potential error.
 * @INFO
 *********************************************************/
