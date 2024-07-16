const { SlashCommandBuilder } = require("@discordjs/builders");
const { Client, MessageEmbed } = require("discord.js");

const discord = require("discord.js");
// Bestandssysteem
const fs = require("fs");
//.env config
//require('dotenv-flow').config();
// Taal van de bot
const language = JSON.parse(
  fs.readFileSync(`./language/${process.env.LANGUAGES}.json`, "utf-8")
);
const package = JSON.parse(fs.readFileSync(`./package.json`, "utf-8"));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("botinfo")
    .setDescription("Toont informatie over de bot."),
  async execute(client, interaction) {
    const embed = new MessageEmbed()
      .setTitle("Botinformatie")
      .setDescription("Hier is wat informatie over de bot:")
      .setColor("#0099ff")
      .addField("Name", `<@${process.env.BOTID}>`)
      .addField("ID", `${process.env.BOTID}`)
      .addField("Author", `${package.author}`)
      .addField("GitHub", `${package.gitrepo}`)
      .addField(`Bot Speed`, `${client.ws.ping} ms.`);

    await interaction.reply({ embeds: [embed], ephemeral: true });
  },
};