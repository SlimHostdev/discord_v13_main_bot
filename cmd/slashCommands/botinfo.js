const { SlashCommandBuilder } = require('@discordjs/builders');
const { Client, MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('botinfo')
    .setDescription('Toont informatie over de bot.'),
  async execute(interaction) {
    const botUser = client.user;

    const embed = new MessageEmbed()
      .setTitle('Botinformatie')
      .setDescription('Hier is wat informatie over de bot:')
      .setColor('#0099ff')
      .addField('Naam', botUser.username)
      .addField('Tag', botUser.tag)
      .addField('ID', botUser.id)
      .addField('Gemaakt op', botUser.createdAt.toDateString());

    await interaction.reply({ embeds: [embed] });
  },
};
