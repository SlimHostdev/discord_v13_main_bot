const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const discord = require("discord.js");
// Bestandssysteem
const fs = require("fs");
// Taal van de bot
const language = JSON.parse(fs.readFileSync(`./language/${process.env.LANGUAGES}.json`, 'utf-8'));

module.exports = {

    data: new SlashCommandBuilder()
        .setName('ping2')
        .setDescription("Dit is een Test CMD."),
    async execute(client, interaction) {
        const embed = new MessageEmbed()
            .setTitle('Ping')
            .setDescription(`${language.Slashcmd_ping_msg} ${client.ws.ping} ms.`)
            .setColor('#0099ff');

        interaction.reply({ embeds: [embed], ephemeral: true });
    }
}
