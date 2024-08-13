const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Client } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("encode")
    .setDescription("Base64")
    .addStringOption((option) =>
      option
        .setName("input")
        .setDescription("Wat wil je encrypten?")
        .setRequired(true)
    ),

  async execute(client, interaction) {
    const Input = interaction.options.getString("input");

    var base64_encode = btoa(Input);

    let encode = base64_encode;

    const embed = new MessageEmbed()
      .setTitle("Encode Base64.")
      .setDescription(`Dit is het encrypted bericht`)
      .addField(
        `${interaction.user.username} Je encrypted bericht:`,
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
