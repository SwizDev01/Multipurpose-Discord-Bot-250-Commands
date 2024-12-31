const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('listbans')
    .setDescription('List all banned members of the guild.')
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  async execute(interaction) {
    
    await interaction.deferReply();

    try {
      
      const bans = await interaction.guild.bans.fetch();

      if (bans.size === 0) {
        return interaction.editReply('There are no banned members in this guild.');
      }

      
      const embed = new EmbedBuilder()
        .setTitle('Banned Members')
        .setColor(0x000000)
        .setTimestamp()
        .setFooter({ text: 'Servers Banned Users List', iconURL: interaction.client.user.displayAvatarURL() });

    
      bans.forEach(ban => {
        embed.addFields({ name: ban.user.tag, value: `ID: ${ban.user.id}\nReason: ${ban.reason || 'No reason provided'}` });
      });

      
      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      console.error(`Failed to fetch bans: ${error}`);
      await interaction.editReply('There was an error fetching the banned members list.');
    }
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