const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Client } = require('discord.js');
 
module.exports = {
 
    data: new SlashCommandBuilder()
        .setName("rps")
        .setDescription("Rock, Paper, or Scissors!")
        .addStringOption(option =>
            option.setName("input")
                .setDescription("Rock, Paper, or Scissors")
                .setRequired(true)
        ),

    async execute(client, interaction) {
        const Input = interaction.options.getString('input');
    
		const getUserChoice = userInput => {

  userInput = userInput.toLowerCase();

  if (userInput === 'rock' || userInput === 'paper' || userInput === 'scissors' ) {
    return userInput;
  } else if (userInput === 'viper') {
    return userInput;
  } else {
    return `${userInput} Is geen geldige input!`;
  }
};

let randomNumber = Math.floor(Math.random() * 3);

const getComputerChoice = randomNumber => {

  switch (randomNumber) {
  case 0:
    return 'rock';
    break;
  case 1:
    return 'paper';
    break;
  case 2:
    return 'scissors';
    break;
  }

};

let UserChoice = getUserChoice(Input);
let computerChoice = getComputerChoice(randomNumber);

const determineWinner = (UserChoice, computerChoice) => {

  if (UserChoice === computerChoice) {
    return 'The game is a tie!';
  };
  
  if (UserChoice === 'rock') {
    if (computerChoice === 'paper') {
    return 'The bot won!';
  } else {
    return 'You won!';
    }
  };

  if (UserChoice === 'paper') {
    if (computerChoice === 'scissors') {
    return 'The bot won!';
  } else {
      return 'You won!';
    }
  };

  if (UserChoice === 'scissors') {
    if (computerChoice === 'rock') {
    return 'The bot won!';
  } else {
      return 'You won!';
    }
  };

  if (UserChoice === 'viper') {
    return 'Nice cheat you won!'
  };

}

let win = determineWinner(UserChoice, computerChoice);

const uitslag = win === undefined;

const getWin = uitslag => {

  switch (uitslag) {
  case true:
    return `${Input} Is geen geldige invoer!`;
    break;
  case false:
    return win;
    break;
  }

};

        const embed = new MessageEmbed()
        .setTitle('RPS.')
        .setDescription(`Lets see your luk.`)
		.addField(`${interaction.user.username} kiest voor: `, `${Input}`)
		.addField(`${client.user.username} kiest voor: `, `${computerChoice}`)
        .addField(`Winnar:`, `${getWin(uitslag)}`)
        .setColor(process.env.COLLOR)
        .setThumbnail(process.env.LOGO)
        .setImage(process.env.BANNER)
        .setTimestamp()
        .setFooter(`RPS command`);

      interaction.reply({ embeds: [embed], ephemeral: false });
    }
}
