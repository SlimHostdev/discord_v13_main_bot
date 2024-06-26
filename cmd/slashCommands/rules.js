const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

const discord = require("discord.js");
// Bestandssysteem
const fs = require("fs");
//CMD Setings!
const setings = JSON.parse(fs.readFileSync(`./src/addons/rules.json`, 'utf-8'));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rules')
        .setDescription(setings.cmd_disc),
    async execute(client, interaction) {
        // Controleren of de gebruiker een serverbeheerder is
        if (!interaction.member.permissions.has('ADMINISTRATOR')) {
            interaction.reply({ content: setings.cmd_no_admin, ephemeral: true });
            return;
        }

        //List of rolles
        const options = [
            {
                label: "Accept The Rules",
                value: "402256243554648065",
                emoji: "✅"
            }
        ];

        const row = new discord.MessageActionRow()
            .addComponents(
            new discord.MessageSelectMenu()
                .setCustomId("rules-menu")
                .setMinValues(0) //Minimum keuzes
                .setMaxValues(1) //Maximum keuzes
                .setPlaceholder(setings.name)
                .addOptions(options)
            );

        var embed = new discord.MessageEmbed()
            .setTitle(setings.name)
            .setDescription(setings.disc)
			.addField(" ", setings.rule_1)
			.addField(" ", setings.rule_2)
			.addField(" ", setings.rule_3)
			.addField(" ", setings.rule_4)
			.addField(" ", setings.rule_5)
            .addField(" ", setings.info)
            .setColor(process.env.COLLOR)
            .setThumbnail(process.env.LOGO)
            .setImage(process.env.BANNER)
            .setTimestamp()
            .setFooter(setings.name)

        interaction.reply({ embeds: [embed], components: [row] });
    }
}
