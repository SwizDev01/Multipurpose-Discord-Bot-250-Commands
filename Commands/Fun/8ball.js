const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('Ask the magic 8-ball a question!')
    .addStringOption(option =>
      option.setName('question')
        .setDescription('Ask any yes or no question')
        .setRequired(true)),

  async execute(interaction) {
    const question = interaction.options.getString('question');

    // 50 possible 8ball responses
    const responses = [
      "Yes, definitely.",
      "No, absolutely not.",
      "Maybe, but don’t count on it.",
      "Without a doubt.",
      "Ask again later.",
      "Yes, but only if you work for it.",
      "I don’t think so.",
      "My sources say no.",
      "Yes, in your dreams.",
      "You may rely on it.",
      "Absolutely not.",
      "Definitely yes.",
      "The outlook is not good.",
      "Yes, it’s certain.",
      "You can count on it.",
      "Don’t count on it.",
      "Very doubtful.",
      "Ask me again when I’m in a better mood.",
      "It is certain.",
      "The stars say no.",
      "Yes, but you need to act now.",
      "Outlook good.",
      "Better not tell you now.",
      "It is decidedly so.",
      "I have my doubts.",
      "Yes, but only if you believe.",
      "Don’t hold your breath.",
      "The answer is unclear.",
      "Yes, but be careful.",
      "My reply is no.",
      "I wouldn’t bet on it.",
      "Yes, but it’s complicated.",
      "No, but I’m sorry.",
      "It’s not looking good.",
      "Of course!",
      "Chances are slim.",
      "The future looks bright.",
      "I’m not sure about that.",
      "Yes, but it depends on you.",
      "I wouldn’t count on it.",
      "Yes, if you take action.",
      "It’s a mystery.",
      "No way.",
      "You’ll get an answer soon.",
      "I’m afraid not.",
      "Try again later.",
      "Things are looking up.",
      "Very likely.",
      "No, not really.",
      "I believe so.",
      "It’s not looking promising."
    ];

    // Randomly pick a response
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    // Send the response back to the user
    await interaction.reply({
      content: `🎱 **8Ball says:** ${randomResponse}`,
      ephemeral: false,
    });
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