const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const tagsPath = path.resolve(__dirname, '../../tags.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('tag-create')
    .setDescription('Creates a custom tag.')
    .addStringOption(option =>
      option
        .setName('name')
        .setDescription('The name of the tag.')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('content')
        .setDescription('The content of the tag.')
        .setRequired(true)
    ),
  async execute(interaction) {
    const tagName = interaction.options.getString('name').toLowerCase();
    const tagContent = interaction.options.getString('content');

    const tagsData = JSON.parse(fs.readFileSync(tagsPath, 'utf8'));

    if (tagsData.tags[tagName]) {
      return interaction.reply(`❌ A tag with the name **${tagName}** already exists.`);
    }

    tagsData.tags[tagName] = tagContent;

    fs.writeFileSync(tagsPath, JSON.stringify(tagsData, null, 2));
    await interaction.reply(`✅ Tag **${tagName}** has been created.`);
  },
};
