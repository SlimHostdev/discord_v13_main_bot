const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Toont informatie over de server.'),
  
  async execute(interaction) {
    const guild = interaction.guild;

    const embed = new MessageEmbed()
      .setTitle('Serverinformatie')
      .setDescription(`Hier is wat informatie over de server **${guild.name.toString()}**:`)
      .setColor('#0099ff')
      .addField('Eigenaar', `**!! COMING SOON !!**`)
      .addField('Aantal Leden', guild.memberCount.toString())
      .addField('Aangemaakt Op', guild.createdAt.toDateString())
      .addField('Region', guild.region);

    await interaction.reply({ embeds: [embed] });
  },
};