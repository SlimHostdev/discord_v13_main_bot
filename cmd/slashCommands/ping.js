const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Controleert de ping van de bot.'),
    async execute(interaction) {
        const m = await interaction.reply('Ping?');

        const pingEmbed = new MessageEmbed()
            .setTitle('Ping')
            .setDescription('Dit is de ping van de bot.')
            .setColor(process.env.COLLOR)
            .setThumbnail(process.env.LOGO)
            .setImage(process.env.BANNER)
            .setTimestamp()
            .setFooter('Bedankt voor het gebruik van het commando.')
            .addFields(
                { name: 'Bot Naam', value: interaction.client.user.username },
                { name: 'Latency', value: `${m.createdTimestamp - interaction.createdTimestamp}ms` }
            );

        await interaction.editReply({ embeds: [pingEmbed] });
    },
};
