const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');
const config = require('../../config.json'); 

module.exports = {
  data: new SlashCommandBuilder()
    .setName('checklogs')
    .setDescription('Check the status of the logging system for the server'),
  async execute(interaction) {
  
    if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
      return interaction.reply({
        content: '❌ You do not have the required permissions to use this command. (Manage Server)',
        ephemeral: true,
      });
    }

    const logs = config.LOGGING;

    const statuses = {
      MemberLogs: logs.memberLogs ? '✅' : '❌',
      ChannelLogs: logs.channelLogs ? '✅' : '❌',
      MessageLogs: logs.messageLogs ? '✅' : '❌',
      RoleLogs: logs.roleLogs ? '✅' : '❌',
    };

    const embed = new EmbedBuilder()
      .setTitle('Logging System Status')
      .setColor(0x00ff00) // Green
      .setDescription('Here is the status of your logging channels and systems:')
      .addFields(
        {
          name: 'Member Logs',
          value: `${statuses.MemberLogs} ${logs.memberLogs ? `<#${logs.memberLogs}>` : 'Not Configured'}`,
          inline: false,
        },
        {
          name: 'Channel Logs',
          value: `${statuses.ChannelLogs} ${logs.channelLogs ? `<#${logs.channelLogs}>` : 'Not Configured'}`,
          inline: false,
        },
        {
          name: 'Message Logs',
          value: `${statuses.MessageLogs} ${logs.messageLogs ? `<#${logs.messageLogs}>` : 'Not Configured'}`,
          inline: false,
        },
        {
          name: 'Role Logs',
          value: `${statuses.RoleLogs} ${logs.roleLogs ? `<#${logs.roleLogs}>` : 'Not Configured'}`,
          inline: false,
        }
      )
      .setFooter({ text: 'Configure the logging channels in your config.json file' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
