const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('calculator')
    .setDescription('A simple calculator with buttons.'),

  async execute(interaction) {
    await interaction.deferReply();

    let expression = '';

    const embed = new EmbedBuilder()
      .setTitle('🧮 Calculator')
      .setDescription('**Results will be displayed here**')
      .setColor('#2f3136');

    const buttons = createCalculatorButtons();

    const message = await interaction.editReply({
      embeds: [embed],
      components: buttons,
    });

    const collector = message.createMessageComponentCollector({
      filter: (i) => i.user.id === interaction.user.id,
      time: 60000, // Timeout after 1 minute
    });

    collector.on('collect', async (i) => {
      if (i.customId === 'clear') {
        expression = '';
      } else if (i.customId === 'delete') {
        expression = expression.slice(0, -1);
      } else if (i.customId === 'equals') {
        try {
          expression = eval(expression).toString(); // Perform calculation
        } catch {
          expression = 'Error';
        }
      } else {
        expression += i.customId;
      }

      embed.setDescription(`\`\`\`\n${expression || 'Results will be displayed here'}\n\`\`\``);

      await i.update({
        embeds: [embed],
        components: buttons,
      });
    });

    collector.on('end', async () => {
      await interaction.editReply({
        components: [],
      });
    });
  },
};

function createCalculatorButtons() {
  const buttonData = [
    ['clear', '(', ')', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', 'delete', 'equals'],
  ];

  return buttonData.map((row) => {
    const actionRow = new ActionRowBuilder();
    row.forEach((label) => {
      let buttonStyle = ButtonStyle.Secondary;
      if (label === 'clear') buttonStyle = ButtonStyle.Danger;
      else if (label === 'equals') buttonStyle = ButtonStyle.Success;
      else if (['+', '-', '*', '/', 'delete'].includes(label)) buttonStyle = ButtonStyle.Primary;

      actionRow.addComponents(
        new ButtonBuilder()
          .setCustomId(label)
          .setLabel(getButtonLabel(label))
          .setStyle(buttonStyle)
      );
    });
    return actionRow;
  });
}

function getButtonLabel(customId) {
  const symbols = {
    clear: 'AC',
    delete: '⌫',
    equals: '=',
    '/': '÷',
    '*': '×',
  };
  return symbols[customId] || customId;
}
