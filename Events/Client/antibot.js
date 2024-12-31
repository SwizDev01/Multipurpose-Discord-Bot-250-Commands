const { Events, UserFlags, EmbedBuilder } = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: Events.GuildMemberAdd,
  async execute(member) {
    const guildId = member.guild.id;

    
    if (config.antiBotGuildId !== guildId) return;

   
    if (!member.user.bot) return;

    try {
     
      const userFlags = await member.user.fetchFlags();

     
      if (!userFlags.has(UserFlags.VerifiedBot)) {
        await member.kick('Unverified bot detected. Antibot feature is enabled.');
        console.log(`Kicked unverified bot: ${member.user.tag}`);
      }
    } catch (error) {
      
      const admin = member.guild.members.cache.find((m) =>
        m.permissions.has('Administrator')
      );

      if (admin) {
        const embed = new EmbedBuilder()
          .setTitle('Antibot Warning')
          .setDescription(
            `Error! I couldn't kick the bot **${member.user.tag}** as it has a higher role than me.`
          )
          .addFields({
            name: 'Suggestion',
            value: 'Please make sure my role stays at the top for better functionality.',
          })
          .setColor(0xff0000)
          .setTimestamp();

        await admin.send({ embeds: [embed] }).catch((err) => {
          console.error(`Failed to DM admin: ${err.message}`);
        });
      }
      console.error(`Failed to kick bot: ${member.user.tag}`, error.message);
    }
  },
};
