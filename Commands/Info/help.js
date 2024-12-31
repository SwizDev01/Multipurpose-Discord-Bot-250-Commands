const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Shows the help menu for the bot.'),
  async execute(interaction) {
    const botName = interaction.client.user.username;

    // Help Menu Embed
    const helpEmbed = new EmbedBuilder()
      .setTitle('Bot Help Menu')
      .setDescription(`Hello <@${interaction.user.id}>, Myself **${botName}**! I have different types of categories and commands to help you entertained and also manage your server! My categories are:

- **Antinuke**
- **Utility**
- **Fun**
- **Moderation**
- **Info**

Click on the drop menu below to check out my commands!`)
      .setColor(0x0000ff)
      .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL() })
      .setTimestamp();

    // Dropdown Menu
    const selectMenu = new StringSelectMenuBuilder()
      .setCustomId('help-menu')
      .setPlaceholder('Choose a category')
      .addOptions([
        {
          label: 'Antinuke',
          value: 'antinuke',
        },
        {
          label: 'Utility',
          value: 'utility',
        },
        {
          label: 'Fun',
          value: 'fun',
        },
        {
          label: 'Moderation',
          value: 'moderation',
        },
        {
          label: 'Info',
          value: 'info',
        },
      ]);

    const menuRow = new ActionRowBuilder().addComponents(selectMenu);

    // Buttons
    const buttonsRow = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel('Discord Support')
        .setStyle(ButtonStyle.Link)
        .setURL('https://discord.gg/KCJBVaFGj5'),
      new ButtonBuilder()
        .setLabel('YouTube')
        .setStyle(ButtonStyle.Link)
        .setURL('https://www.youtube.com/@phvdev04'),
      new ButtonBuilder()
        .setLabel('Source')
        .setStyle(ButtonStyle.Link)
        .setURL('https://github.com/PHV08')
    );

    
    await interaction.reply({
      embeds: [helpEmbed],
      components: [menuRow, buttonsRow],
    });
  },
};
