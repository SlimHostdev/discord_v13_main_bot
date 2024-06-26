const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('close')
        .setDescription('Sluit het ticket.')
        .addStringOption(option =>
            option.setName('reason')
                .setDescription('De reden voor het sluiten van het ticket.')
                .setRequired(true)),
    async execute(interaction) {
        // Controleren of de gebruiker de juiste permissies heeft
        if (!interaction.member.roles.cache.has(process.env.TICKETSTAFF)) {
            return interaction.reply('Alleen ticketmedewerkers kunnen dit commando gebruiken!');
        }

        const categoryID = process.env.TICKETID;

        const reason = interaction.options.getString('reason');

        if (interaction.channel.parentId === categoryID) {
            await interaction.channel.delete();

            const embedTicket = new MessageEmbed()
                .setTitle('Ticket Gesloten')
                .setColor(process.env.COLLOR)
                .setImage(process.env.BANNER)
                .setDescription('Dit ticket is gesloten.')
                .addFields(
                    { name: 'Ticket Naam', value: interaction.channel.name, inline: false },
                    { name: 'Gesloten door', value: interaction.user.username, inline: false },
                    { name: 'Reden', value: reason, inline: false }
                )
                .setTimestamp()
                .setFooter('Bedankt voor uw aanvraag.');

            const ticketLogging = interaction.guild.channels.cache.get(process.env.TICKETLOGS);
            if (ticketLogging) {
                await ticketLogging.send({ embeds: [embedTicket] });
            }

            return interaction.reply('Het ticket is succesvol gesloten!');
        } else {
            return interaction.reply('Dit commando kan alleen worden gebruikt in een ticketkanaal.');
        }
    },
};
