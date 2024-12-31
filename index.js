/**********************************************************
 * @INFO
 * Bot Coded by PHV#3071 (.ultrondev) | https://discord.gg/YeHzYykQHd
 * @INFO
 * YouTube: UNKNOWN PHV | https://www.youtube.com/@phvdev04/
 * @INFO
 * Do Not Remove Credits | You can Make Modifications in command files if you find a Potential error.
 * @INFO
 *********************************************************/

require('dotenv').config();
const { Client, GatewayIntentBits, REST, Routes, Collection, EmbedBuilder, ActivityType } = require('discord.js');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const config = require('./config.json');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildBans,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

client.commands = new Collection();
client.gameInstances = new Map();
client.afkMap = new Map();

async function loadCommands() {
  const commandsPath = path.resolve(__dirname, './Commands');
  const commandFolders = fs.readdirSync(commandsPath);

  const commands = [];
  for (const folder of commandFolders) {
    const folderPath = path.join(commandsPath, folder);
    const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
      const command = require(`./Commands/${folder}/${file}`);
      if (command?.data && command?.execute) {
        client.commands.set(command.data.name, command);
        commands.push(command.data.toJSON());
      }
    }
  }

  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

  try {
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
    console.log(chalk.green('[Commands] Commands Loaded'));
  } catch (error) {
    console.error(chalk.red('[Commands] Error Loading Commands:'), error);
  }
}

function loadEvents() {
  const eventsPath = path.resolve(__dirname, './Events/Client');
  const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

  for (const file of eventFiles) {
    const event = require(`./Events/Client/${file}`);
    if (event.once) client.once(event.name, (...args) => event.execute(...args));
    else client.on(event.name, (...args) => event.execute(...args));
  }

  console.log(chalk.cyan('[Events] Events Loaded'));
}

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isButton()) return;

  const buttonHandler = client.buttons.get(interaction.customId);
  if (!buttonHandler) {
    console.warn(chalk.yellow(`[Buttons] No handler for: ${interaction.customId}`));
    return interaction.reply({
      content: 'This button has no functionality assigned yet.',
      ephemeral: true,
    });
  }

  try {
    await buttonHandler.execute(interaction);
  } catch (error) {
    console.error(chalk.red(`[Buttons] Error handling button: ${interaction.customId}`), error);
    await interaction.reply({
      content: 'An error occurred while processing this button interaction.',
      ephemeral: true,
    });
  }
});

client.once('ready', () => {
  console.log(chalk.magenta('[Client] Logged in as'), chalk.white(client.user.tag));

  client.user.setPresence({
    activities: [{ name: config.presence.name, type: ActivityType[config.presence.type] }],
    status: 'online',
  });

  console.log(chalk.black.bgWhite('Made with ♥️ by PHV DEVELOPMENT'));
});

process.on('uncaughtException', async (error) => {
  console.error(chalk.red('[Error] Uncaught Exception:'), error.message);
});

process.on('unhandledRejection', async (error) => {
  console.error(chalk.red('[Error] Unhandled Rejection:'), error);
});

(async () => {
  try {
    console.log(chalk.blue('[Discord] Connecting to Discord...'));
    await loadCommands();
    loadEvents();
    await client.login(process.env.TOKEN);
    console.log(chalk.green('[Discord] Connected to Discord'));
  } catch (error) {
    console.error(chalk.red('[Error] Initialization Error:'), error);
  }
})();


/**********************************************************
 * @INFO
 * Bot Coded by PHV#3071 (.ultrondev) | https://discord.gg/YeHzYykQHd
 * @INFO
 * YouTube: UNKNOWN PHV | https://www.youtube.com/@phvdev04/
 * @INFO
 * Do Not Remove Credits | You can Make Modifications in command files if you find a Potential error.
 * @INFO
 *********************************************************/