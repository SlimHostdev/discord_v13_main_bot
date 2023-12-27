const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fs = require("fs");
const language = JSON.parse(fs.readFileSync(`./language/${process.env.LANGUAGES}.json`, "utf-8"));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Waarschuw een gebruiker.')
        .addUserOption(option =>
            option.setName('gebruiker')
                .setDescription('De gebruiker die gewaarschuwd moet worden')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reden')
                .setDescription('De reden voor de waarschuwing')
                .setRequired(true)),
    async execute(client, interaction) {
        const { options } = interaction;
        const warnUser = options.getUser('gebruiker');
        const reason = options.getString('reden');

        if (!interaction.member.roles.cache.has(process.env.ADMINROLL)) {
            return interaction.reply('Je hebt niet de vereiste rol om dit commando te gebruiken!');
        }

        // Voer de rest van de logica uit voor het waarschuwen van de gebruiker

        const embed = new MessageEmbed()
        .setColor(process.env.WARNCOLLOR)
        .setThumbnail(process.env.LOGO)
        .setImage(process.env.BANNER)
        .setFooter(interaction.member.displayName, interaction.author.displayAvatarURL)
        .setTimestamp()
        .setDescription(`**${language.cmd_warn_warn}** <@${warnUser.id}> (${warnUser.id})
        **${language.cmd_warn_reason}** ${reason}`)
        .addField(`${language.cmd_warn_number_warn} `, warns[warnUser.id].warns.toString());

        interaction.reply({ embeds: [embed], ephemeral: true });

        interaction.reply(`Gebruiker ${warnUser.username} is gewaarschuwd. Reden: ${reason}`);
    },
};
