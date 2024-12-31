const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('roll')
        .setDescription('Rolls a dice and returns a random number.'),

    async execute(interaction) {
        const result = Math.floor(Math.random() * 6) + 1;
        await interaction.reply(`You rolled a ${result}!`);
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