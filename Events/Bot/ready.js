const chalk = require('chalk');

module.exports = {
  once: true,
  name: 'ready',
  execute(client) {
    console.log(chalk.red('[Commands] Loaded'));
    console.log(chalk.yellow('[Events] Loaded'));
    console.log(chalk.green(`Logged in as ${client.user.tag}`));
    console.log(chalk.green('Connected to Discord.'));
  },
};
