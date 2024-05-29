const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const discord = require("discord.js");
// Bestandssysteem
const fs = require("fs");
// Taal van de bot
const language = JSON.parse(fs.readFileSync(`./language/${process.env.LANGUAGES}.json`, 'utf-8'));
//CMD Setings!
const setings = JSON.parse(fs.readFileSync(`./src/addons/kleur.json`, 'utf-8'));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kleur')
        .setDescription(setings.cmd_disc),
    async execute(client, interaction) {
        // Controleren of de gebruiker een serverbeheerder is
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            interaction.reply({ content: setings.cmd_no_admin, ephemeral: true });
            return;
        }

        //List of collor rolles
        const options = [
            {
                label: "Rood",
                value: "774409433597345833",
                emoji: "🟥"
            },
            {
                label: "Groen",
                value: "774409426718556181",
                emoji: "🟩"
            },
            {
                label: "Blouw",
                value: "774410190845247508",
                emoji: "🟦"
            },
            {
                label: "Oranje",
                value: "823913602553348128",
                emoji: "🟧"
            },
            {
                label: "Rolze",
                value: "838811881363210280",
                emoji: "🟪"
            }
        ];

        const row = new discord.MessageActionRow()
            .addComponents(
            new discord.MessageSelectMenu()
                .setCustomId("kleur-menu")
                .setMinValues(0) //Minimum keuzes
                .setMaxValues(1) //Maximum keuzes
                .setPlaceholder(setings.name)
                .addOptions(options)
            );

        var embed = new discord.MessageEmbed()
            .setTitle(setings.name)
            .setDescription(setings.disc)
            .setColor(process.env.COLLOR)
            .setThumbnail(process.env.LOGO)
            .setImage(process.env.BANNER)
            .setTimestamp()
            .setFooter(setings.name)

        interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
    }
}
