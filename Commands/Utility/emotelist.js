const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('emotelist')
    .setDescription('List all emojis available in the server.'),

  async execute(interaction) {
    const emojis = interaction.guild.emojis.cache;

    if (emojis.size === 0) {
      return interaction.reply('There are no emojis in this server.');
    }

    const staticEmojis = emojis.filter(emoji => !emoji.animated).map(e => e.toString()).join(' ') || 'None';
    const animatedEmojis = emojis.filter(emoji => emoji.animated).map(e => e.toString()).join(' ') || 'None';

    const emojiEmbed = new EmbedBuilder()
      .setColor('Blue')
      .setTitle('😄 Server Emojis')
      .addFields(
        { name: 'Static Emojis', value: staticEmojis, inline: false },
        { name: 'Animated Emojis', value: animatedEmojis, inline: false }
      )
      .setFooter({ text: `Total Emojis: ${emojis.size}` });

    await interaction.reply({ embeds: [emojiEmbed] });
  },
};
