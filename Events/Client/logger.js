const { AuditLogEvent, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'allLogs',
    once: false,

    async execute(client) {
        const configPath = path.join(__dirname, '../../Data/modlogs.json');
        if (!fs.existsSync(configPath)) return;

        const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

        client.on('guildBanAdd', async (ban) => {
            const guildConfig = config[ban.guild.id];
            if (!guildConfig || !guildConfig.logChannel) return;

            const logChannel = ban.guild.channels.cache.get(guildConfig.logChannel);
            if (!logChannel) return;

            const embed = new EmbedBuilder()
                .setTitle('User Banned')
                .setDescription(`**User:** ${ban.user.tag} (${ban.user.id})`)
                .setColor('Red')
                .setTimestamp();

            logChannel.send({ embeds: [embed] });
        });

        client.on('guildBanRemove', async (ban) => {
            const guildConfig = config[ban.guild.id];
            if (!guildConfig || !guildConfig.logChannel) return;

            const logChannel = ban.guild.channels.cache.get(guildConfig.logChannel);
            if (!logChannel) return;

            const embed = new EmbedBuilder()
                .setTitle('User Unbanned')
                .setDescription(`**User:** ${ban.user.tag} (${ban.user.id})`)
                .setColor('Green')
                .setTimestamp();

            logChannel.send({ embeds: [embed] });
        });

        client.on('guildMemberRemove', async (member) => {
            const guildConfig = config[member.guild.id];
            if (!guildConfig || !guildConfig.logChannel) return;

            const logChannel = member.guild.channels.cache.get(guildConfig.logChannel);
            if (!logChannel) return;

            const logs = await member.guild.fetchAuditLogs({ limit: 1, type: AuditLogEvent.MemberKick });
            const kickLog = logs.entries.first();

            if (!kickLog || kickLog.target.id !== member.id) return;

            const { executor, reason } = kickLog;

            const embed = new EmbedBuilder()
                .setTitle('User Kicked')
                .setDescription(`**User:** ${member.user.tag} (${member.user.id})`)
                .addFields(
                    { name: 'Executor', value: executor.tag, inline: true },
                    { name: 'Reason', value: reason || 'No reason provided', inline: true }
                )
                .setColor('Orange')
                .setTimestamp();

            logChannel.send({ embeds: [embed] });
        });

        client.on('messageDelete', async (message) => {
            if (message.author.bot) return;

            const guildConfig = config[message.guild.id];
            if (!guildConfig || !guildConfig.logChannel) return;

            const logChannel = message.guild.channels.cache.get(guildConfig.logChannel);
            if (!logChannel) return;

            const embed = new EmbedBuilder()
                .setTitle('Message Deleted')
                .setDescription(`**Author:** ${message.author.tag}\n**Channel:** ${message.channel.name}`)
                .addFields({ name: 'Content', value: message.content || 'No content' })
                .setColor('Yellow')
                .setTimestamp();

            logChannel.send({ embeds: [embed] });
        });

        client.on('messageUpdate', async (oldMessage, newMessage) => {
            if (oldMessage.author.bot || oldMessage.content === newMessage.content) return;

            const guildConfig = config[oldMessage.guild.id];
            if (!guildConfig || !guildConfig.logChannel) return;

            const logChannel = oldMessage.guild.channels.cache.get(guildConfig.logChannel);
            if (!logChannel) return;

            const embed = new EmbedBuilder()
                .setTitle('Message Edited')
                .setDescription(`**Author:** ${oldMessage.author.tag}\n**Channel:** ${oldMessage.channel.name}`)
                .addFields(
                    { name: 'Old Content', value: oldMessage.content || 'No content' },
                    { name: 'New Content', value: newMessage.content || 'No content' }
                )
                .setColor('Blue')
                .setTimestamp();

            logChannel.send({ embeds: [embed] });
        });
    },
};
