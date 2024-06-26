const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("review")
    .setDescription("Schrijf een review.")
    .addIntegerOption((option) =>
      option
        .setName("stars")
        .setDescription("Het aantal sterren dat je wilt geven.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("Het bericht van de review.")
        .setRequired(true)
    ),

  async execute(client, interaction) {
    const reviewMessage = interaction.options.getString("message");

    const reviewChannel = interaction.guild.channels.cache.get(
      process.env.REVIEWCHAT
    );

    if (!reviewChannel) {
      return interaction.reply("De reviewkanalen zijn niet ingesteld.");
    }

    const amountStars = interaction.options.getInteger("stars");

    let stars = "";
    for (let i = 0; i < amountStars; i++) {
      stars += "⭐ ";
    }

    const reviewEmbed = new MessageEmbed()
      .setTitle(`${interaction.member.displayName} - Review`)
      .setColor(process.env.REVIEWCOLLOR)
      .setThumbnail(process.env.LOGO)
      .setImage(process.env.BANNER)
      .setTimestamp()
      .addField("Sterren", stars)
      .addField("Bericht", reviewMessage);

    const successEmbed = new MessageEmbed()
      .setTitle(`${interaction.member.displayName} - Bedankt voor je review!`)
      .setColor(process.env.REVIEWCOLLOR)
      .setThumbnail(process.env.LOGO)
      .setImage(process.env.BANNER)
      .setTimestamp()
      .setFooter("Bedankt voor het schrijven van een review!")
      .addField("Reviewkanaal", `<#${process.env.REVIEWCHAT}>`);

    await reviewChannel.send({ embeds: [reviewEmbed] });
    await interaction.reply({ embeds: [successEmbed] });
  },
};
