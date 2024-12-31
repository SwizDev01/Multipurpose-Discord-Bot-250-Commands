const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serverhealth')
    .setDescription('Displays real-time statistics about the server\'s health.'),

  async execute(interaction) {
    await interaction.deferReply();

    const guild = interaction.guild;

    // Fetch data
    const totalMembers = guild.memberCount;
    const onlineMembers = guild.members.cache.filter(member => member.presence?.status === 'online').size;
    const textChannels = guild.channels.cache.filter(ch => ch.type === 0).size; // Type 0 = Text
    const voiceChannels = guild.channels.cache.filter(ch => ch.type === 2).size; // Type 2 = Voice

    // Example usage stats (these should be fetched dynamically if you have tracking)
    const activeTextChannels = Math.floor(Math.random() * textChannels); // Replace with actual tracking logic
    const activeVoiceChannels = Math.floor(Math.random() * voiceChannels); // Replace with real data

    const embed = new EmbedBuilder()
      .setColor('#00ff99')
      .setTitle('🌟 Server Health Report')
      .setDescription('Here’s the current activity snapshot of your server:')
      .addFields(
        { name: 'Total Members', value: `${totalMembers}`, inline: true },
        { name: 'Online Members', value: `${onlineMembers}`, inline: true },
        { name: 'Text Channels', value: `${textChannels}`, inline: true },
        { name: 'Voice Channels', value: `${voiceChannels}`, inline: true },
        { name: 'Active Text Channels', value: `${activeTextChannels}`, inline: true },
        { name: 'Active Voice Channels', value: `${activeVoiceChannels}`, inline: true }
      )
      .setTimestamp()
      .setFooter({ text: 'Server Health Data' });

    await interaction.editReply({ embeds: [embed] });
  },
};
