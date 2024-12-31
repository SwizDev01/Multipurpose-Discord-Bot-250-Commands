const { SlashCommandBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const tagsPath = path.resolve(__dirname, '../../tags.json');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('tag-delete')
    .setDescription('Deletes a custom tag.')
    .addStringOption(option =>
      option
        .setName('name')
        .setDescription('The name of the tag to delete.')
        .setRequired(true)
    ),
  async execute(interaction) {
    const tagName = interaction.options.getString('name').toLowerCase();

    const tagsData = JSON.parse(fs.readFileSync(tagsPath, 'utf8'));

    if (!tagsData.tags[tagName]) {
      return interaction.reply(`❌ No tag found with the name **${tagName}**.`);
    }

    delete tagsData.tags[tagName];
    fs.writeFileSync(tagsPath, JSON.stringify(tagsData, null, 2));
    await interaction.reply(`✅ Tag **${tagName}** has been deleted.`);
  },
};

