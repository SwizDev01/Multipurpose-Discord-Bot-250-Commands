const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const gridSize = 7; // Size of the grid

module.exports = {
  data: new SlashCommandBuilder()
    .setName('snake')
    .setDescription('Play the Snake game in Discord!'),

  async execute(interaction) {
    let snake = [{ x: 3, y: 3 }]; // Starting position of the snake
    let apple = spawnApple(snake);
    let direction = { x: 0, y: 1 }; // Default movement direction (down)
    let score = 0;

    await interaction.deferReply();

    const snakeEmbed = createGameEmbed(snake, apple, score);
    const gameButtons = createGameButtons();
    const message = await interaction.editReply({
      embeds: [snakeEmbed],
      components: [gameButtons],
    });

    const collector = message.createMessageComponentCollector({ time: 60000 });

    collector.on('collect', async (buttonInteraction) => {
      if (buttonInteraction.user.id !== interaction.user.id) {
        return buttonInteraction.reply({ content: 'This is not your game!', ephemeral: true });
      }

      const move = buttonInteraction.customId;

      // Update direction based on button press
      if (move === 'up' && direction.x !== 1) direction = { x: -1, y: 0 };
      if (move === 'down' && direction.x !== -1) direction = { x: 1, y: 0 };
      if (move === 'left' && direction.y !== 1) direction = { x: 0, y: -1 };
      if (move === 'right' && direction.y !== -1) direction = { x: 0, y: 1 };

      // Move the snake
      const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

      // Check for game over
      if (
        newHead.x < 0 ||
        newHead.x >= gridSize ||
        newHead.y < 0 ||
        newHead.y >= gridSize ||
        snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
      ) {
        collector.stop('gameover');
        return buttonInteraction.update({ content: `Game Over! Your score was **${score}**.`, components: [] });
      }

      snake.unshift(newHead);

      // Check if apple is eaten
      if (newHead.x === apple.x && newHead.y === apple.y) {
        score++;
        apple = spawnApple(snake);
      } else {
        snake.pop();
      }

      // Update the game message
      const updatedEmbed = createGameEmbed(snake, apple, score);
      await buttonInteraction.update({ embeds: [updatedEmbed], components: [createGameButtons()] });
    });

    collector.on('end', async (_, reason) => {
      if (reason === 'time') {
        await interaction.editReply({ content: `⏰ Time's up! Your score was **${score}**.`, components: [] });
      }
    });
  },
};

// Function to create the game grid and embed
function createGameEmbed(snake, apple, score) {
  let grid = Array.from({ length: gridSize }, () => Array(gridSize).fill('⬛'));

  snake.forEach(segment => (grid[segment.x][segment.y] = '🟩'));
  grid[apple.x][apple.y] = '🍎';

  const display = grid.map(row => row.join('')).join('\n');

  return new EmbedBuilder()
    .setColor('Green')
    .setTitle('🐍 Snake Game')
    .setDescription(display)
    .addFields({ name: 'Score', value: `${score}`, inline: true })
    .setFooter({ text: 'Use the buttons to move the snake!' });
}

// Function to spawn the apple at a random location
function spawnApple(snake) {
  let position;
  do {
    position = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
  } while (snake.some(segment => segment.x === position.x && segment.y === position.y));
  return position;
}


function createGameButtons() {
  return new ActionRowBuilder().addComponents(
    new ButtonBuilder().setCustomId('up').setLabel('⬆️').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('left').setLabel('⬅️').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('down').setLabel('⬇️').setStyle(ButtonStyle.Primary),
    new ButtonBuilder().setCustomId('right').setLabel('➡️').setStyle(ButtonStyle.Primary),
  );
}
