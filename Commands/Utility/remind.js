const { SlashCommandBuilder } = require('discord.js');
const ms = require('ms');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('remind')
    .setDescription('Set a reminder.')
    .addStringOption(option =>
      option.setName('time')
        .setDescription('The duration after which you want to be reminded (e.g., 10s, 5m, 1h).')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('message')
        .setDescription('The reminder message.')
        .setRequired(true)),
  async execute(interaction) {
    const time = interaction.options.getString('time');
    const reminderMessage = interaction.options.getString('message');
    const duration = ms(time);

    if (isNaN(duration) || duration < 1000) {
      return interaction.reply({ content: 'Please provide a valid duration (e.g., 10s, 5m, 1h).', ephemeral: true });
    }

    await interaction.reply(`Got it! I will remind you in ${time}.`);

    setTimeout(() => {
      interaction.user.send(`⏰ **Reminder:** ${reminderMessage}`).catch(error => {
        console.error(`Could not send reminder DM to ${interaction.user.tag}:`, error);
      });
    }, duration);
  },
};

/**********************************************************
 * @INFO
 * Bot Coded by PHV#3071 | CJ#0007 (__cj__) | https://discord.gg/YeHzYykQHd
 * @INFO
 * YouTube: UNKNOWN PHV | https://www.youtube.com/@phvdev04/
 * @INFO
 * Do Not Remove Credits | You can Make Modifications in command files if you find a Potential error.
 * @INFO
 *********************************************************/