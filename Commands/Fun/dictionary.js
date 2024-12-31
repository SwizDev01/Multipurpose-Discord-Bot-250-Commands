const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dictionary')
    .setDescription('Gives the definition of a word.')
    .addStringOption(option =>
      option
        .setName('word')
        .setDescription('The word you want to define.')
        .setRequired(true)
    ),
  async execute(interaction) {
    const word = interaction.options.getString('word');

    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const definition = response.data[0]?.meanings[0]?.definitions[0]?.definition;

      if (!definition) {
        return interaction.reply(`❌ No definition found for **${word}**.`);
      }

      await interaction.reply(`📖 **${word}**: ${definition}`);
    } catch (error) {
      console.error('Error fetching definition:', error);
      await interaction.reply('❌ Could not fetch the definition. Please try again later.');
    }
  },
};
