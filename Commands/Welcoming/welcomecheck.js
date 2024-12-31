const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const config = require('../../config.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('greetstatus')
    .setDescription('Checks if the welcome system is configured.'),
  async execute(interaction) {
    const welcomeChannelId = config.welcomeChannelId;

    if (!welcomeChannelId) {
      return interaction.reply({
        content: '❌ The welcome system is not configured. Please add a channel ID to the config.json file.',
        ephemeral: true,
      });
    }

    const channel = interaction.guild.channels.cache.get(welcomeChannelId);

    if (!channel) {
      return interaction.reply({
        content: `❌ The channel with ID ${welcomeChannelId} does not exist in this server.`,
        ephemeral: true,
      });
    }

    // Send confirmation
    const embed = new EmbedBuilder()
      .setColor(0x000000) // Black color
      .setTitle('Welcome System Configuration')
      .setDescription(`✅ The welcome system is configured for the channel: ${channel}.`)
      .setFooter({ text: 'Welcome Management, configure the modifications in events/client/welcoming' })
      .setTimestamp();

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
