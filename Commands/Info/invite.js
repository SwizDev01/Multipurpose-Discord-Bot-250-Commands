const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('invite')
    .setDescription('Get the invite link for the bot.'),

  async execute(interaction) {
    const inviteEmbed = new EmbedBuilder()
      .setColor(0x00FF00)
      .setTitle('Invite the Bot')
      .setDescription('Click the button below to invite the bot to your server.')
      .setTimestamp();

    const inviteButton = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel('Invite Bot')
        .setStyle(ButtonStyle.Link)
        .setURL('https://discord.com/oauth2/authorize?client_id=1183434269922701342&permissions=1086023269631&scope=bot%20applications.commands')
    );

    await interaction.reply({ embeds: [inviteEmbed], components: [inviteButton], ephemeral: true });
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