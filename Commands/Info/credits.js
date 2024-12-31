const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('devinfo')
    .setDescription('Displays developer info and bot details.'),

  async execute(interaction) {
    // Main embed
    const mainEmbed = new EmbedBuilder()
      .setTitle('About PHV#3071')
      .setDescription(
        `Hello, Myself **PHV#3071**(.ultrondev).\n\n` +
        `✨ **Thank you for using this code!**\n` +
        `🤖 This is a **Multipurpose Discord Bot** I created using **Discord.js V14**.\n\n` +
        `⭐ Please consider giving a star to the repository and 🧡 donating with the links below!`
      )
      .setColor(0x000000);

    // Buttons for links
    const buttons = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel('YouTube')
        .setStyle(ButtonStyle.Link)
        .setURL('https://youtube.com/PHV08'),
      new ButtonBuilder()
        .setLabel('Discord Server')
        .setStyle(ButtonStyle.Link)
        .setURL('https://discord.gg/PHV08'),
      new ButtonBuilder()
        .setLabel('GitHub')
        .setStyle(ButtonStyle.Link)
        .setURL('https://github.com/PHV08'),
      new ButtonBuilder()
        .setLabel('Projects')
        .setCustomId('projects') // Interactive button for projects
        .setStyle(ButtonStyle.Primary)
    );

    // Send initial message
    await interaction.reply({ embeds: [mainEmbed], components: [buttons] });
  },
};

// Event for handling button interactions
module.exports.buttonHandler = async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === 'projects') {
    const projectsEmbed = new EmbedBuilder()
      .setTitle('Other Projects')
      .setDescription(
        `1️⃣ **[Python Music](https://github.com/PHV08/Python-Music):**\n` +
        `A Simple Discord Music Bot made in Python.\n\n` +
        `2️⃣ **[AI-Chatbot](https://github.com/PHV08/Dicord-Ai-chatbot.git):**\n` +
        `A chatbot requiring **no API key** to run.\n\n` +
        `Find more on our Discord server!`
      )
      .setColor(0x000000);

    await interaction.update({ embeds: [projectsEmbed], components: [] });
  }
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
