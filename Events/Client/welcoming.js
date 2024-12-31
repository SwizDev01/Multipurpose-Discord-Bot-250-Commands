const { EmbedBuilder } = require('discord.js');
const config = require('../../config.json');

module.exports = {
  name: 'guildMemberAdd',
  async execute(member) {
    const welcomeChannelId = config.welcomeChannelId;

    
    if (!welcomeChannelId || welcomeChannelId.trim() === '') {
      console.log('Welcome system is not configured. Skipping welcome event.');
      return;
    }

    const channel = member.guild.channels.cache.get(welcomeChannelId);

 
    if (!channel) {
      console.error(`Channel with ID ${welcomeChannelId} does not exist.`);
      return;
    }

  
    setTimeout(async () => {
      try {
       
        await channel.send({
          content: `Welcome to the server, ${member}!`,
          embeds: [
            new EmbedBuilder()
              .setColor(0x000000) 
              .setTitle(`Welcome to ${member.guild.name}, ${member.user.username}!`)
              .setDescription('Hope you like your stay.')
              .setImage('https://media.giphy.com/media/xUPGGDNsLvqsBOhuU0/giphy.gif') 
              .setFooter({ text: 'Welcome Management.' })
              .setTimestamp(),
          ],
        });
      } catch (error) {
        console.error('Error sending welcome message:', error);
      }
    }, 60000); 
  },
};
