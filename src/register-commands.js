if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const { REST, Routes, ApplicationCommandOptionType } = require('discord.js')

const commands = [
  {
    name: 'hey',
    description: 'Replies with hey!',
  },
  {
    name: 'download',
    description: 'Download source file',
  },
  {
    name: 'add',
    description: 'Add two numbers',
    options: [
      {
        name: 'first-number', // cannot put whitespace
        description: 'The first number',
        type: ApplicationCommandOptionType.Number,
        choices: [
          { name: 'one', value: 1 },
          { name: 'two', value: 2 },
          { name: 'three', value: 3 },
        ],
        required: true,
      },
      {
        name: 'second-number',
        description: 'The second number',
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
    ],
  },
  {
    name: 'embed',
    description: 'Send embed message!',
  },
]

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN)

;(async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    )
    console.log('Slash commands were registed successfully.')
  } catch (error) {
    console.log(`There was an error: ${error}`)
  }
})()
