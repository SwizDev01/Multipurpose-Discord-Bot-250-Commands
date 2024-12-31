const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('trivia')
    .setDescription('Play a trivia game with multiple categories.'),

  async execute(interaction) {
    await interaction.deferReply();

    try {
      // Fetch question from OpenTDB API
      const response = await axios.get('https://opentdb.com/api.php?amount=1&type=multiple');
      const trivia = response.data.results[0];
      const question = trivia.question.replace(/&#039;/g, "'").replace(/&quot;/g, '"');
      const correctAnswer = trivia.correct_answer;
      const wrongAnswers = trivia.incorrect_answers;

      // Randomize button order
      const options = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);

      // Create buttons for answers
      const buttons = options.map((answer, index) => 
        new ButtonBuilder()
          .setCustomId(`answer_${index}`)
          .setLabel(answer)
          .setStyle(ButtonStyle.Primary)
      );

      const row = new ActionRowBuilder().addComponents(buttons);

      // Embed for trivia question
      const triviaEmbed = new EmbedBuilder()
        .setColor('Gold')
        .setTitle('🎉 Trivia Question')
        .setDescription(`**Category:** ${trivia.category}\n**Question:** ${question}`)
        .setFooter({ text: 'Select the correct answer below!' });

      const message = await interaction.editReply({ embeds: [triviaEmbed], components: [row] });

      // Collector for button interaction
      const collector = message.createMessageComponentCollector({ time: 15000 });

      collector.on('collect', async (buttonInteraction) => {
        if (buttonInteraction.user.id !== interaction.user.id) {
          return buttonInteraction.reply({ content: 'This is not your trivia game!', ephemeral: true });
        }

        const selectedAnswer = buttonInteraction.component.label;

        if (selectedAnswer === correctAnswer) {
          await buttonInteraction.update({
            content: `🎉 Correct! The answer is **${correctAnswer}**.`,
            components: [],
          });
        } else {
          await buttonInteraction.update({
            content: `❌ Incorrect! The correct answer was **${correctAnswer}**.`,
            components: [],
          });
        }

        collector.stop();
      });

      collector.on('end', (collected, reason) => {
        if (reason === 'time') {
          interaction.editReply({ content: `⏰ Time's up! The correct answer was **${correctAnswer}**.`, components: [] });
        }
      });
    } catch (error) {
      console.error('Error fetching trivia question:', error);
      await interaction.editReply('Failed to fetch trivia question. Please try again later.');
    }
  },
};
