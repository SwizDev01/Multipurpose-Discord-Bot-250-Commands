const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('support')
    .setDescription('Get the support server link for the bot.'),

  async execute(interaction) {
    const supportEmbed = new EmbedBuilder()
      .setColor(0x00FF00)
      .setTitle('Support Server')
      .setDescription('Create a ticket in the support server for bugs/reports regarding the bot.')
      .setTimestamp();

    const supportButton = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel('Join Support Server')
        .setStyle(ButtonStyle.Link)
        .setURL('https://discord.gg/your-support-server-link') 
    );

    await interaction.reply({ embeds: [supportEmbed], components: [supportButton], ephemeral: true });
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