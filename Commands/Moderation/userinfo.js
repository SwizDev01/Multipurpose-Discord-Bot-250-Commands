const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('userinfo')
    .setDescription('Displays information about a user.')
    .addUserOption(option =>
      option.setName('target').setDescription('The user to get information about').setRequired(true)
    ),
  async execute(interaction) {
    const user = interaction.options.getUser('target');
    const member = interaction.guild.members.cache.get(user.id);

    const embed = new EmbedBuilder()
      .setTitle(`${user.tag}'s Information`)
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))
      .addFields(
        { name: 'Username', value: user.username, inline: true },
        { name: 'Tag', value: `#${user.discriminator}`, inline: true },
        { name: 'ID', value: user.id, inline: true },
        { name: 'Joined Server', value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:F>`, inline: true },
        { name: 'Created Account', value: `<t:${Math.floor(user.createdTimestamp / 1000)}:F>`, inline: true },
        { name: 'Roles', value: member.roles.cache.map(role => role.name).join(', ') || 'None', inline: false }
      )
      .setColor('Blue')
      .setTimestamp();

    await interaction.reply({ embeds: [embed] });
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