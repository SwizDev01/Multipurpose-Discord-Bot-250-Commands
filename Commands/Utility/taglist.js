const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('tag-list')
    .setDescription('Lists all available tags.'),
  async execute(interaction) {
    const tagsData = JSON.parse(fs.readFileSync(tagsPath, 'utf8'));

    const tagNames = Object.keys(tagsData.tags);

    if (tagNames.length === 0) {
      return interaction.reply('❌ There are no tags available.');
    }

    await interaction.reply(`📜 Available Tags:\n${tagNames.map(tag => `- **${tag}**`).join('\n')}`);
  },
};
