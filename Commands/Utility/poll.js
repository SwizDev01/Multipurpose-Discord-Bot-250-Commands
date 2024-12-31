const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('poll')
    .setDescription('Creates a poll with custom options and sends it to a specified channel.')
    .addStringOption(option =>
      option.setName('question').setDescription('The poll question').setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('options')
        .setDescription('Comma-separated poll options (2-10 options)')
        .setRequired(true)
    )
    .addChannelOption(option =>
      option
        .setName('channel')
        .setDescription('The channel to send the poll to')
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      // Immediately acknowledge the interaction
      await interaction.deferReply({ ephemeral: true });

      // Check if the user has Manage Server permission
      if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
        return interaction.editReply({
          content: '❌ You do not have permission to use this command.',
        });
      }

      const question = interaction.options.getString('question');
      const options = interaction.options.getString('options').split(',').map(opt => opt.trim());
      const targetChannel = interaction.options.getChannel('channel');

      // Validate options length
      if (options.length < 2 || options.length > 10) {
        return interaction.editReply({
          content: '❌ You must provide between 2 and 10 options.',
        });
      }

      // Ensure the specified channel is a text channel
      if (!targetChannel.isTextBased()) {
        return interaction.editReply({
          content: '❌ The specified channel is not a text-based channel.',
        });
      }

      // Build the poll embed
      const embed = new EmbedBuilder()
        .setTitle('📊 Poll')
        .setDescription(`**${question}**\n\n${options.map((opt, idx) => `${idx + 1}. ${opt}`).join('\n')}`)
        .setColor('Blue')
        .setFooter({ text: `Poll created by ${interaction.user.tag}` })
        .setTimestamp();

      // Send the embed to the target channel
      const pollMessage = await targetChannel.send({ embeds: [embed] });

      // React with numbers for the options
      const numberEmojis = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
      for (let i = 0; i < options.length; i++) {
        await pollMessage.react(numberEmojis[i]);
      }

      // Confirm poll creation
      await interaction.editReply({
        content: `✅ Poll created successfully in ${targetChannel}.`,
      });
    } catch (error) {
      console.error('Error creating poll:', error);
      if (interaction.deferred || interaction.replied) {
        await interaction.editReply({
          content: '❌ There was an error creating the poll.',
        });
      }
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