const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    if (!interaction.isStringSelectMenu()) return;

    if (interaction.customId === 'help-menu') {
      const selectedCategory = interaction.values[0];
      let commandsList = '';

      // Define commands for each category
      const categories = {
        antinuke: ['`Antibot`', '`Antilink`'],
        utility: ['`addrole`', '`Poll`', '`Purge`', '`Tagcreate`', '`Tag-delete`', '`Tag-list`', '`remind`', '`remove-role`', '`slowmode`'],
        fun: ['`8ball`','`calculator`','`cat`','`coinflip`','`dadjjoke`','`dictionary`','`dog`','`joke`','`nhie`','`pi`','`quote`','`roll`','`say`','`ship`','`snake`','`trivia`' ],
        moderation: ['`Kick`', '`Ban`', '`Timeout`', '`lock-Channel`', '`unmute`', '`warn`', '`lock-channel`', '`unlock-channel`', '`chearwarns`','`checkwarns`','`auditlog`','`listbans`','`massban`','`softban`','`nick`','`log`','`clone`','`clear-roles`'],
        info: ['`credits`', '`serverinfo`', '`support`', '`userinfo`', '`invite`','`serverhealth`'],
      };

      // Get the commands for the selected category
      commandsList = categories[selectedCategory]?.join(', ') || 'No commands available.';

      // Create a new embed to show the commands
      const commandsEmbed = new EmbedBuilder()
        .setTitle(`${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Commands`)
        .setDescription(commandsList)
        .setColor(0x000000)
        .setFooter({ text: `Made with ♥️ by PHV DEVELOPMENT`, iconURL: interaction.user.displayAvatarURL() })
        .setTimestamp();

      // Update the interaction with the new embed
      await interaction.update({ embeds: [commandsEmbed] });
    }
  },
};
