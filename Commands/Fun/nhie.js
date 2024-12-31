const { SlashCommandBuilder } = require('discord.js');

// Array of Never Have I Ever prompts
const nhiePrompts = [
  "1. Never have I ever faked sick from work.",
  "2. Never have I ever gone skinny dipping.",
  "3. Never have I ever cheated on a partner.",
  "4. Never have I ever cheated on a test.",
  "5. Never have I ever marched in a protest.",
  "6. Never have I ever overdrafted my bank account.",
  "7. Never have I ever eaten someone else's lunch from the office fridge.",
  "8. Never have I ever played strip poker.",
  "9. Never have I ever smoked a joint.",
  "10. Never have I ever peed in a pool.",
  "11. Never have I ever tried hard drugs.",
  "12. Never have I ever fallen asleep in public.",
  "13. Never have I ever fallen asleep at work.",
  "14. Never have I ever lied on my resume.",
  "15. Never have I ever drunk-dialed my ex.",
  "16. Never have I ever dropped acid.",
  "17. Never have I ever had a one-night stand.",
  "18. Never have I ever read a partner's text messages.",
  "19. Never have I ever read a partner's emails.",
  "20. Never have I ever been hospitalized for something other than giving birth or being born.",
  "21. Never have I ever sang in public.",
  "22. Never have I ever played a musical instrument.",
  "23. Never have I ever gone snowboarding.",
  "24. Never have I ever gone skiing.",
  "25. Never have I ever traveled to a foreign country.",
  "26. Never have I ever learned a foreign language.",
  "27. Never have I ever sent a stranger a drink.",
  "28. Never have I ever accepted a drink from a stranger.",
  "29. Never have I ever lied about my income.",
  "30. Never have I ever gotten busy in a public place.",
  "31. Never have I ever been nude in public.",
  "32. Never have I ever dated or hooked up with someone 10 years older.",
  "33. Never have I ever dated or hooked up with someone 5 years younger.",
  "34. Never have I ever texted or taken a call at the movies.",
  "35. Never have I ever convinced a friend to dump a partner.",
  "36. Never have I ever convinced a partner to dump a friend.",
  "37. Never have I ever been someone else's alibi.",
  "38. Never have I ever hopped a turnstile.",
  "39. Never have I ever snitched on someone else at work.",
  "40. Never have I ever donated an organ.",
  "41. Never have I ever lied to a law enforcement officer.",
  "42. Never have I ever been a maid of honor.",
  "43. Never have I ever been a best man.",
  "44. Never have I ever called a partner the wrong name.",
  "45. Never have I ever thought a friend's baby was ugly.",
  "46. Never have I ever won more than $50 gambling.",
  "47. Never have I ever lost more than $50 gambling.",
  "48. Never have I ever gone vegan.",
  "49. Never have I ever used a fake ID.",
  "50. Never have I ever lied about my age.",
  "51. Never have I ever had a lucid dream.",
  "52. Never have I ever campaigned for a political candidate.",
  "53. Never have I ever had chicken pox.",
  "54. Never have I ever flashed someone.",
  "55. Never have I ever mooned someone.",
  "56. Never have I ever lied to my best friend.",
  "57. Never have I ever had a road rage incident.",
  "58. Never have I ever cut in line on purpose.",
  "59. Never have I ever held a grudge longer than a year.",
  "60. Never have I ever blabbed something I swore to secrecy.",
  "61. Never have I ever ruined someone else's vacation.",
  "62. Never have I ever chipped a tooth.",
  "63. Never have I ever tried a fad diet.",
  "64. Never have I ever cut my own hair.",
  "65. Never have I ever been awake for 24 straight hours or more.",
  "66. Never have I ever accidentally said 'I love you' to someone.",
  "67. Never have I ever cried or flirted my way out of a ticket.",
  "68. Never have I ever snooped through a friend's room, cabinets or property.",
  "69. Never have I ever gotten busy in a car.",
  "70. Never have I ever worked with someone I couldn't stand.",
  "71. Never have I ever had a friend with benefits.",
  "72. Never have I ever eaten food that broke the five-second rule.",
  "73. Never have I ever spent an entire day watching reality TV.",
  "74. Never have I ever sent nudes.",
  "75. Never have I ever received nudes."
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nhie')
    .setDescription('Get a random "Never Have I Ever" prompt.'),

  async execute(interaction) {
    try {
      // Get a random prompt from the array
      const prompt = nhiePrompts[Math.floor(Math.random() * nhiePrompts.length)];

      const embed = {
        title: 'Never Have I Ever',
        description: prompt,
        color: 0x0099ff,
      };

      await interaction.reply({ embeds: [embed] });
    } catch (error) {
      console.error('Error fetching NHIE prompt:', error);
      const errEmbed = {
        color: 0xe74c3c,
        description: 'Failed to fetch NHIE prompt. Please try again later.',
      };
      await interaction.reply({ embeds: [errEmbed] }).catch(err => console.error('Error sending error message:', err));
    }
  },
};

/**********************************************************
 * @INFO
 * Bot Coded by PHV DEVELOPMENT | https://discord.gg/YeHzYykQHd
 * @INFO
 * YouTube: UNKNOWN PHV | https://www.youtube.com/@phvdev04/
 * @INFO
 * Do Not Remove Credits | You can Make Modifications in command files if you find a Potential error.
 * @INFO
 *********************************************************/