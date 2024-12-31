const { SlashCommandBuilder } = require('discord.js');
const axios = require('axios');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('github')
    .setDescription('Fetch GitHub repository or user details.')
    .addStringOption(option =>
      option.setName('query')
        .setDescription('Enter a GitHub username or repo (e.g., username/repo).')
        .setRequired(true)),

  async execute(interaction) {
    const query = interaction.options.getString('query');
    await interaction.deferReply();

    const apiUrl = query.includes('/')
      ? `https://api.github.com/repos/${query}`
      : `https://api.github.com/users/${query}`;

    try {
      const response = await axios.get(apiUrl);
      const data = response.data;

      const embed = query.includes('/')
        ? {
            title: data.full_name,
            url: data.html_url,
            description: data.description || 'No description provided.',
            fields: [
              { name: 'Stars', value: `${data.stargazers_count}`, inline: true },
              { name: 'Forks', value: `${data.forks_count}`, inline: true },
              { name: 'Language', value: data.language || 'Not specified', inline: true },
            ],
            color: 0x24292e,
          }
        : {
            title: data.name || data.login,
            url: data.html_url,
            description: data.bio || 'No bio provided.',
            fields: [
              { name: 'Public Repos', value: `${data.public_repos}`, inline: true },
              { name: 'Followers', value: `${data.followers}`, inline: true },
              { name: 'Following', value: `${data.following}`, inline: true },
            ],
            color: 0x24292e,
          };

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error('Error fetching GitHub details:', error);
      await interaction.editReply('Could not fetch GitHub details. Please check the username/repo and try again.');
    }
  },
};
