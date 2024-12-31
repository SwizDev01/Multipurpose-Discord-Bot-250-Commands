const { EmbedBuilder } = require('discord.js'); 
const chalk = require('chalk');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    // Handle button interactions
    if (interaction.isButton()) {
      const customId = interaction.customId;

      // Handle the "projects" button
      if (customId === 'projects') {
        const projectsEmbed = new EmbedBuilder()
          .setTitle('PHV Projects')
          .setColor(0x000000)
          .setDescription(
            `**Python Music**\n[GitHub Repository](https://github.com/PHV08/Python-Music)\nA simple Discord music bot made in Python.\n\n` +
            `**AI Chatbot**\n[GitHub Repository](https://github.com/PHV08/Dicord-Ai-chatbot.git)\nA chatbot that requires no API key to run.\n\n` +
            `Find more projects on our Discord server!`
          );

        await interaction.update({
          embeds: [projectsEmbed],
          components: interaction.message.components, // Retain buttons
        });
        return;
      }
    }

    // Handle command interactions
    if (interaction.isCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);

      if (!command) {
        console.log(chalk.red(`Unknown command: ${interaction.commandName}`));
        return;
      }

      // Command execution log
      console.log(
        chalk.blue(`[${new Date().toLocaleTimeString()}] Executing command: ${interaction.commandName}`)
      );

      // Check bot permissions
      if (command.botPermissions) {
        const botPermissions = command.botPermissions.filter(permission =>
          !interaction.guild.members.me.permissions.has(permission)
        );

        if (botPermissions.length > 0) {
          return interaction.reply({
            content: `I am missing the following permissions to execute this command: ${botPermissions.join(', ')}`,
            ephemeral: true,
          });
        }
      }

      // Check user permissions
      if (command.permissionsRequired) {
        const missingPermissions = command.permissionsRequired.filter(permission =>
          !interaction.member.permissions.has(permission)
        );

        if (missingPermissions.length > 0) {
          return interaction.reply({
            content: `You are missing the following permissions to use this command: ${missingPermissions.join(', ')}`,
            ephemeral: true,
          });
        }
      }

      // Cooldown handling
      if (!interaction.client.cooldowns) {
        interaction.client.cooldowns = new Map();
      }

      const { cooldowns } = interaction.client;
      const cooldownAmount = (command.cooldown || 3) * 1000; // Default cooldown is 3 seconds

      if (!cooldowns.has(command.data.name)) {
        cooldowns.set(command.data.name, new Map());
      }

      const timestamps = cooldowns.get(command.data.name);
      const now = Date.now();

      if (timestamps.has(interaction.user.id)) {
        const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount;

        if (now < expirationTime) {
          const timeLeft = ((expirationTime - now) / 1000).toFixed(1);
          return interaction.reply({
            content: `Please wait ${timeLeft} more second(s) before using the \`${interaction.commandName}\` command.`,
            ephemeral: true,
          });
        }
      }

      timestamps.set(interaction.user.id, now);
      setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount);

      // Try executing the command
      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(
          chalk.red(`Error executing command ${interaction.commandName}:`),
          error.stack || error.message
        );

        // Notify the user of the issue without revealing internal details
        if (interaction.replied || interaction.deferred) {
          await interaction.followUp({
            content: 'An unexpected error occurred while executing this command.',
            ephemeral: true,
          });
        } else {
          await interaction.reply({
            content: 'An unexpected error occurred while executing this command.',
            ephemeral: true,
          });
        }
      }
    }
  },
};
