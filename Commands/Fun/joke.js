const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('joke')
        .setDescription('Get a random joke'),
    async execute(interaction) {
        try {
            const response = await axios.get('https://official-joke-api.appspot.com/random_joke');
            const jokeData = response.data;

            const embed = {
                title: 'Random Joke',
                description: `${jokeData.setup}\n${jokeData.punchline}`,
                color: 0x0099ff,
            };

            await interaction.reply({ embeds: [embed] });
        } catch (error) {
            console.error('Error fetching joke:', error);
            const errEmbed = {
                color: 0xe74c3c,
                description: 'Failed to fetch joke. Please try again later.',
            };
            await interaction.reply({ embeds: [errEmbed] }).catch(error => { return; });
        }
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