const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('afk')
        .setDescription('Set your AFK status')
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('Reason for being AFK')
                .setRequired(false)
        ),
    async execute(interaction) {
        const reason = interaction.options.getString('reason') || 'AFK';
        const afkMap = interaction.client.afkMap;

        afkMap.set(interaction.user.id, { reason, timestamp: Date.now() });

        await interaction.reply({
            content: `:zzz: You are now AFK: **${reason}**`,
            ephemeral: true
        });
    },
};
