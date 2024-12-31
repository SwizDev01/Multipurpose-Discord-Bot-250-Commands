const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Displays information about the server.'),
  async execute(interaction) {
    const { guild } = interaction;

    if (!guild) {
      return interaction.reply({
        content: '❌ This command can only be used in a server.',
        ephemeral: true,
      });
    }

    const totalMembers = guild.memberCount;
    const serverOwner = await guild.fetchOwner();
    const creationDate = `<t:${Math.floor(guild.createdTimestamp / 1000)}:D>`;
    const totalRoles = guild.roles.cache.size;
    const totalChannels = guild.channels.cache.size;
    const boosts = guild.premiumSubscriptionCount || 0; // Number of server boosts
    const voiceChannels = guild.channels.cache.filter(c => c.type === 2).size; // Count of voice channels

    const embed = new EmbedBuilder()
      .setTitle(`${guild.name} - Server Info`)
      .setThumbnail(guild.iconURL({ dynamic: true, size: 512 }))
      .setDescription(
        `**Total Members:** ${totalMembers}\n` +
        `**Server Owner:** ${serverOwner.user.tag}\n` +
        `**Creation Date:** ${creationDate}\n` +
        `**Roles:** ${totalRoles}\n` +
        `**Channels:** ${totalChannels} (Voice: ${voiceChannels})\n` +
        `**Boosts:** ${boosts}`
      )
      .setColor(0x00aeff)
      .setFooter({ text: `Server ID: ${guild.id}` })
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
  },
};
