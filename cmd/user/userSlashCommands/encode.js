const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Client } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("encode")
    .setDescription("Base64")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("Wat will je encode?")
        .setRequired(true)
    ),

  async execute(client, interaction) {
    const Input = interaction.options.getString("input");

    var base64_encode = btoa(Input);

    let encode = base64_encode;

    const embed = new MessageEmbed()
      .setTitle("Encode Base64.")
      .setDescription(`Hier is je Encode verzie van je input.`)
      .addField(
        `${interaction.user.username} Je encorde bericht: `,
        `${encode}`
      )
      .setColor(process.env.COLLOR)
      .setThumbnail(process.env.LOGO)
      .setImage(process.env.BANNER)
      .setTimestamp()
      .setFooter(`Encode Base64`);

    interaction.reply({ embeds: [embed], ephemeral: true });
  },
};
