const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('cat')
        .setDescription('Sends a random cat picture or GIF.'),

    async execute(interaction) {
        const response = await axios.get('https://api.thecatapi.com/v1/images/search');
        await interaction.reply(response.data[0].url);
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