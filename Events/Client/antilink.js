module.exports = {
  name: 'messageCreate',
  async execute(message) {
    const { antiLinkGuildId } = require('../../config.json');

   
    if (!antiLinkGuildId || antiLinkGuildId !== message.guild.id) return;

    
    if (message.author.bot) return;

    
    const linkRegex = /(https?:\/\/[^\s]+)/g;

    
    if (linkRegex.test(message.content) && !message.member.permissions.has('ManageGuild')) {
      try {
        await message.delete();
        const warningMessage = await message.channel.send({
          content: `❌ <@${message.author.id}>, you are not allowed to send links in this server.`,
        });

    
        setTimeout(() => {
          warningMessage.delete().catch((error) => {
            console.error(`Failed to delete warning message: ${error.message}`);
          });
        }, 2000);
      } catch (error) {
        console.error(`Failed to handle a link message: ${error.message}`);
      }
    }
  },
};

/**********************************************************
 * @INFO
 * Bot Coded by PHV#3071 (.ultrondev) | https://discord.gg/YeHzYykQHd
 * @INFO
 * YouTube: UNKNOWN PHV | https://www.youtube.com/@phvdev04/
 * @INFO
 * Do Not Remove Credits | You can Make Modifications in command files if you find a Potential error.
 * @INFO
 *********************************************************/