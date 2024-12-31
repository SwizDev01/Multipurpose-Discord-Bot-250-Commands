const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Check the bot latency, API latency, and uptime.'),
  async execute(interaction) {
    const start = Date.now();

    // Send initial reply to measure bot latency
    const reply = await interaction.reply({
      content: 'Calculating latency...',
      fetchReply: true,
    });

    // Calculate latencies
    const botLatency = reply.createdTimestamp - interaction.createdTimestamp;
    const apiLatency = Math.round(interaction.client.ws.ping);

    // Bot uptime
    const uptime = process.uptime();
    const days = Math.floor(uptime / 86400);
    const hours = Math.floor((uptime % 86400) / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    const uptimeString = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    // Create embed
    const embed = new EmbedBuilder()
      .setColor('Random')
      .setTitle('🏓 Pong!')
      .setDescription('Here are the current bot and API latencies:')
      .addFields(
        { name: '🤖 Bot Latency', value: `${botLatency}ms`, inline: true },
        { name: '🌐 API Latency', value: `${apiLatency}ms`, inline: false }
      )
      .setFooter({
        text: `Requested by ${interaction.user.tag}`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();

    // Edit reply with embed
    await interaction.editReply({ content: null, embeds: [embed] });
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