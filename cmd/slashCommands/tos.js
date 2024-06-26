const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, Client } = require('discord.js');
 
module.exports = {
 
    data: new SlashCommandBuilder()
        .setName("tos")
        .setDescription("kop of munt")
        .addStringOption(option =>
            option.setName("input")
                .setDescription("kop, munt, or Scissors")
                .setRequired(true)
        ),

    async execute(client, interaction) {
        const Input = interaction.options.getString('input');
    
		const getUserChoice = userInput => {

  userInput = userInput.toLowerCase();

  if (userInput === 'kop' || userInput === 'munt' ) {
    return userInput;
  } else if (userInput === 'viper') {
    return userInput;
  } else {
    return `${userInput} Is geen geldige input!`;
  }
};

let randomNumber = Math.floor(Math.random() * 2);

const getComputerChoice = randomNumber => {

  switch (randomNumber) {
  case 0:
    return 'kop';
    break;
  case 1:
    return 'munt';
    break;
  }

};

let UserChoice = getUserChoice(Input);
let computerChoice = getComputerChoice(randomNumber);

const determineWinner = (UserChoice, computerChoice) => {

  if (UserChoice === computerChoice) {
    return 'Je heb gewonnen!';
  };
  
  if (UserChoice === 'kop') {
    if (computerChoice === 'munt') {
    return 'Helaas het is munt';
  } else if (UserChoice === 'munt') {
    if (computerChoice === 'kop'){
        return 'Helaas het is kop';
    }
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
        .setTitle('TOS.')
        .setDescription(`Lets see yor luk.`)
		.addField(`${interaction.user.username} kiest voor: `, `${Input}`)
        .addField(`Winnar:`, `${getWin(uitslag)}`)
        .setColor(process.env.COLLOR)
        .setThumbnail(process.env.LOGO)
        .setImage(process.env.BANNER)
        .setTimestamp()
        .setFooter(`TOS command`);

      interaction.reply({ embeds: [embed], ephemeral: false });
    }
}
