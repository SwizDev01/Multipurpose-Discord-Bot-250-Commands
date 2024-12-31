const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('dadjoke')
    .setDescription('Fetch a random dad joke.'),

  async execute(interaction) {
    await interaction.deferReply();

    try {
      const response = await axios.get('https://icanhazdadjoke.com/', {
        headers: { Accept: 'application/json' },
      });

      const joke = response.data.joke;
      await interaction.editReply(joke);
    } catch (error) {
      console.error('Error fetching dad joke:', error);
      await interaction.editReply('Could not fetch a dad joke at the moment. Please try again later.');
    }
  },
};
