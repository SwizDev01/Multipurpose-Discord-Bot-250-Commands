const { Events } = require('discord.js');
const fs = require('fs');
const path = require('path');

// Path to warnings data file
const warningsPath = path.resolve(__dirname, '../../Data/warnings.json');

let warnings = {};
if (fs.existsSync(warningsPath)) {
  warnings = JSON.parse(fs.readFileSync(warningsPath, 'utf8'));
}

module.exports = {
  name: Events.MessageCreate,
  async execute(message) {
    if (message.author.bot) return;

    const guildId = message.guild.id;
    const userWarnings = warnings[guildId]?.[message.author.id] || [];

    if (userWarnings.length >= 3) {
      try {
        await message.reply(
          `⚠️ You have ${userWarnings.length} warnings. Further infractions may result in stricter actions.`
        );
      } catch (error) {
        console.error('Error sending warning message:', error);
      }
    }
  },
};
