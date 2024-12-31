const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('quote')
        .setDescription('Provides a random quote'),

    async execute(interaction) {
        try {
            const response = await axios.get('https://api.quotable.io/random');
            const quote = response.data.content;
            await interaction.reply(quote);
        } catch (error) {
            console.error(error);
            await interaction.reply('Error fetching quote.');
        }
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