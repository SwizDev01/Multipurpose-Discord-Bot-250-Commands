function formatDuration(ms) {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day(s), ${hours % 24} hour(s)`;
  if (hours > 0) return `${hours} hour(s), ${minutes % 60} minute(s)`;
  if (minutes > 0) return `${minutes} minute(s), ${seconds % 60} second(s)`;
  return `${seconds} second(s)`;
}

module.exports = {
  name: 'messageCreate',
  async execute(message) {
      const { client, author, mentions } = message;

      // Ignore bots
      if (author.bot) return;

      const afkMap = client.afkMap;

      // Remove AFK if the user sends a message
      if (afkMap.has(author.id)) {
          const afkInfo = afkMap.get(author.id);
          const timeAway = Date.now() - afkInfo.timestamp;
          afkMap.delete(author.id);

          const duration = formatDuration(timeAway);

          await message.reply({
              content: `:wave: Welcome back, ${author.username}! You were AFK for **${duration}**.`,
              ephemeral: true
          });
      }

      // Notify users who mention someone who's AFK
      if (mentions.users.size > 0) {
          mentions.users.forEach(async (user) => {
              if (afkMap.has(user.id)) {
                  const afkInfo = afkMap.get(user.id);
                  const timeAway = Date.now() - afkInfo.timestamp;
                  const duration = formatDuration(timeAway);

                  await message.reply({
                      content: `:zzz: **${user.username}** is currently AFK: **${afkInfo.reason}** (AFK for **${duration}**).`,
                      ephemeral: true
                  });
              }
          });
      }
  },
};
