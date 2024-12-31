const chalk = require('chalk');

module.exports = {
  name: 'messageCreate',
  async execute(message) {
    // Ignore bot messages
    if (message.author.bot) return;

    // Set your prefix here
    const prefix = '!';

    // Check if the message starts with the prefix
    if (!message.content.startsWith(prefix)) return;

    // Remove the prefix and split the message into args
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Check if the command exists in the collection
    const command = message.client.commands.get(commandName);

    if (!command) {
      console.log(chalk.red(`Command ${commandName} not found!`));
      return;
    }

    try {
      // Execute the command
      console.log(chalk.blue(`Executing command: ${commandName}`));
      await command.execute(message, args);
    } catch (error) {
      console.error(chalk.red(`Error executing command ${commandName}:`), error);
      await message.reply('There was an error while executing this command!');
    }
  },
};
