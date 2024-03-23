const { ApplicationCommandOptionType } = require('discord.js')
const games = require('./../../../data/games.json')
const path = require('path')

module.exports = {
  name: 'download',
  description: 'Download game that we play!',
  options: [
    {
      type: ApplicationCommandOptionType.String,
      name: 'name',
      description: 'Choose a game that you want to download!',
      required: true,
      choices: [
        { name: 'Palworld', value: 'Palworld' },
        { name: 'Sea of Thieves', value: 'Sea of Thieves' },
        { name: 'Valheim', value: 'Valheim' },
      ],
    },
  ],
  // devOnly: Boolean,
  // testOnly: true,
  // options: Object[],
  // deleted: Boolean,

  callback: (client, interaction) => {
    let game = games.find(
      (game) => game.title == interaction.options.get('name').value
    )

    if (game) {
      const embed = {
        title: game.title,
        color: parseInt(game.color), // Embed color in hexadecimal
        description: game.description,
        image: {
          url: game.image,
        },
        timestamp: new Date(),
      }

      interaction.reply({
        embeds: [embed],
        files: [path.join(__dirname, './../../../', game.file)],
      })
    } else {
      interaction.reply(
        `We don't play ${interaction.options.get('name').value}`
      )
    }
  },
}
