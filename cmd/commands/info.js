const discord = require("discord.js");
//File server
const fs = require("fs");
//Main Data
const packege = JSON.parse(fs.readFileSync("./package.json", "utf-8"));
//Taal van de bot
const language = JSON.parse(fs.readFileSync(`./language/${process.env.LANGUAGE}.json`, "utf-8"));

module.exports.run = async (client, message, args) => {

    var botEmbed = new discord.MessageEmbed()
        .setTitle(`${language.cmd_info_title}`)
        .setDescription(`${language.cmd_info_disc}`)
        .setColor(process.env.COLLOR)
        .setThumbnail(process.env.LOGO)
        .setImage(process.env.BANNER)
        .setTimestamp()
        .setFooter(`${language.cmd_info_footer}`)
        .addField(`${language.cmd_info_bot_name}`, client.user.username)
        .addFields(
            { name: `${language.cmd_info_bot_prefix}`, value: process.env.PREFFIX },
            { name: `${language.cmd_info_bot_author}`, value: `${packege.author}` },
            { name: `${language.cmd_info_bot_host}`, value: `${packege.slimhost}` }
        )

        const row = new discord.MessageActionRow().addComponents(

            new discord.MessageButton()
            .setLabel("Host")
            .setStyle("LINK")
            .setEmoji("📡")
            .setURL(`${packege.slimhost}`)
    
        );

    return message.channel.send({ embeds: [botEmbed], components: [row] }).then(msg => {
        message.delete()
        setTimeout(() => msg.delete(), 10000);
    });

}

module.exports.help = {
    name: "info",
    category: "info",
    discription: language.cmd_info_disc
}