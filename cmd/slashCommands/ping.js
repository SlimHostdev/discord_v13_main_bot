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
        .setTitle(`${language.cmd_ping_title}`)
        .setDescription(`${language.cmd_ping_disc}`)
        .setColor(process.env.COLLOR)
        .setThumbnail(process.env.LOGO)
        .setImage(process.env.BANNER)
        .setTimestamp()
        .setFooter(`${language.cmd_ping_footer}`)
        .addFields(
            { name: `${language.cmd_ping_name}`, value: client.user.username },
            { name: `${language.cmd_ping_latency}`, value: `${m.createdTimestamp - message.createdTimestamp}ms.`}
        );

        interaction.reply({ embeds: [embed], ephemeral: true });
    }
}
