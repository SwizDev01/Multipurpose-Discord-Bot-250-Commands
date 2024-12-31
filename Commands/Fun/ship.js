const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ship')
    .setDescription('Check the compatibility between two users.')
    .addUserOption(option =>
      option.setName('user1')
        .setDescription('Select the first user.')
        .setRequired(true))
    .addUserOption(option =>
      option.setName('user2')
        .setDescription('Select the second user.')
        .setRequired(true)),

  async execute(interaction) {
    const user1 = interaction.options.getUser('user1');
    const user2 = interaction.options.getUser('user2');

    const compatibility = Math.floor(Math.random() * 101); // Random percentage
    const description = compatibility > 70
      ? 'A perfect match! 💖'
      : compatibility > 40
      ? 'Could work out! 💞'
      : 'Not looking good... 💔';

    const embed = {
      title: `Compatibility between ${user1.username} and ${user2.username}`,
      description: `${compatibility}% - ${description}`,
      color: 0xff69b4,
    };

    await interaction.reply({ embeds: [embed] });
  },
};
