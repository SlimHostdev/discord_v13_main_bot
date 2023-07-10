const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('serverinfo')
        .setDescription('Toont informatie over de server.'),
    async execute(interaction) {
        const botEmbed = new MessageEmbed()
            .setTitle('Serverinformatie')
            .setDescription('Dit is de informatie over de server.')
            .setColor(process.env.COLLOR)
            .setThumbnail(process.env.LOGO)
            .setImage(process.env.BANNER)
            .setTimestamp()
            .setFooter('Bedankt voor het gebruik van het commando.')
            .addField('Bot Naam', interaction.client.user.username)
            .addField('Lid sinds', interaction.member.joinedAt.toString())
            .addField('Aantal leden', interaction.guild.memberCount.toString());

        return interaction.reply({ embeds: [botEmbed] });
    },
};
