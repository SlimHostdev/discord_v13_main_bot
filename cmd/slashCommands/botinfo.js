const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, MessageEmbed } = require('discord.js');

const discord = require("discord.js");
// Bestandssysteem
const fs = require("fs");
// Taal van de bot
const language = JSON.parse(fs.readFileSync(`./language/${process.env.LANGUAGES}.json`, 'utf-8'));

module.exports = {
  data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription('Toont informatie over de bot.'),
  async execute(client, interaction) {

    const embed = new MessageEmbed()
      .setTitle('Botinformatie')
      .setDescription('Hier is wat informatie over de bot:')
      .setColor('#0099ff')
      .addField('Naam', client.user.username)
      .addField(`${language.Slashcmd_ping_msg} ${client.ws.ping} ms.`)
      .addField('Gemaakt op', botUser.createdAt.toDateString());

    await interaction.reply({ embeds: [embed] });
  },
};
