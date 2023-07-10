const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const packege = require('./package.json');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('info')
        .setDescription('Toont informatie over de bot.'),
    async execute(interaction) {
        const botEmbed = new MessageEmbed()
            .setTitle('Bot Informatie')
            .setDescription('Dit is informatie over de bot.')
            .setColor(process.env.COLLOR)
            .setThumbnail(process.env.LOGO)
            .setImage(process.env.BANNER)
            .setTimestamp()
            .setFooter('Bedankt voor het gebruik van het commando.')
            .addField('Bot Naam', interaction.client.user.username)
            .addFields(
                { name: 'Bot Prefix', value: process.env.PREFFIX },
                { name: 'Bot Auteur', value: `${packege.author}` },
                { name: 'Bot Host', value: `${packege.slimhost}` },
            );

        const row = new MessageActionRow().addComponents(
            new MessageButton()
                .setLabel('Host')
                .setStyle('LINK')
                .setEmoji('📡')
                .setURL(`${packege.slimhost}`)
        );

        await interaction.reply({ embeds: [botEmbed], components: [row] });
    },
};
