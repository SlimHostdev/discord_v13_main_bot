const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Client } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("highroll")
    .setDescription(
      "Dit is een cmd die 2 random dobelsteenen gooit en daar een totaal van geeft."
    ),

  async execute(client, interaction) {
    let randomNumber1 = Math.floor(Math.random() * 5);

    const dobelsteen_1 = (randomNumber1) => {
      switch (randomNumber1) {
        case 0:
          return "⚀";
          break;
        case 1:
          return "⚁";
          break;
        case 2:
          return "⚂";
          break;
        case 3:
          return "⚃";
          break;
        case 4:
          return "⚄";
          break;
        case 5:
          return "⚅";
          break;
      }
    };

    let stone_number_1 = randomNumber1 + 1;
    let stone_1 = dobelsteen_1(randomNumber1);

    let randomNumber2 = Math.floor(Math.random() * 5);

    const dobelsteen_2 = (randomNumber2) => {
      switch (randomNumber2) {
        case 0:
          return "⚀";
          break;
        case 1:
          return "⚁";
          break;
        case 2:
          return "⚂";
          break;
        case 3:
          return "⚃";
          break;
        case 4:
          return "⚄";
          break;
        case 5:
          return "⚅";
          break;
      }
    };

    let stone_number_2 = randomNumber2 + 1;
    let stone_2 = dobelsteen_2(randomNumber2);

    let total = stone_number_1 + stone_number_2;

    const embed = new MessageEmbed()
      .setTitle("highroll.")
      .setDescription(`Lets see yor luk.`)
      .addField(`Dobbelsteen 1:`, `**${stone_1} ${stone_number_1}**`)
      .addField(`Dobbelsteen 2:`, `**${stone_2} ${stone_number_2}**`)
      .addField(`Total:`, `${total}`)
      .setColor(process.env.COLLOR)
      .setThumbnail(process.env.LOGO)
      .setImage(process.env.BANNER)
      .setTimestamp()
      .setFooter(`highroll command`);

    interaction.reply({ embeds: [embed], ephemeral: false });
  },
};
