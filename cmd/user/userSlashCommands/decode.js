const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Client } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("decode")
    .setDescription("Base64")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("Wat will je decode?")
        .setRequired(true)
    ),

  async execute(client, interaction) {
    const Input = interaction.options.getString("input");

    const getUserChoice = (userInput) => {
      var base64_decode = atob(userInput);

      return base64_decode;
    };

    let decode = getUserChoice(base64_decode);

    const embed = new MessageEmbed()
      .setTitle("decode Base64.")
      .setDescription(`Hier is je decode verzie van je input.`)
      .addField(
        `${interaction.user.username} Je encorde bericht: `,
        `${decode}`
      )
      .setColor(process.env.COLLOR)
      .setThumbnail(process.env.LOGO)
      .setImage(process.env.BANNER)
      .setTimestamp()
      .setFooter(`decode Base64`);

    interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
