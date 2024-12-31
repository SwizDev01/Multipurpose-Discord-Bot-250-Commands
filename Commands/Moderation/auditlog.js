const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('audit')
    .setDescription('View recent moderation actions.'),

  async execute(interaction) {
    if (!interaction.member.permissions.has('VIEW_AUDIT_LOG')) {
      return interaction.reply({
        content: 'You do not have permission to view the audit log.',
        ephemeral: true,
      });
    }

    const auditLogs = await interaction.guild.fetchAuditLogs({ limit: 10 });
    const logEntries = auditLogs.entries.map(entry => {
      return `\`${entry.action}\` by **${entry.executor.tag}** on **${entry.target.tag || entry.target.id}** at **${entry.createdAt.toUTCString()}**`;
    });

    await interaction.reply({
      content: `**Recent Audit Log Actions:**\n${logEntries.join('\n')}`,
      ephemeral: true,
    });
  },
};
