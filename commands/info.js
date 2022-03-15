const discord = require("discord.js");
//File server
const fs = require("fs");
//Main Data
const packege = JSON.parse(fs.readFileSync("./package.json", "utf-8"));
//Taal van de bot
const language = JSON.parse(fs.readFileSync(`./language/${process.env.LANGUAGE}.json`, "utf-8"));

module.exports.run = async (client, message, args) => {

    var botEmbed = new discord.MessageEmbed()
        .setTitle("Info command")
        .setDescription("Here you will find a lot of info from the bot")
        .setColor(process.env.COLLOR)
        .setThumbnail(process.env.LOGO)
        .setImage(process.env.BANNER)
        .setTimestamp()
        .setFooter("info command")
        .addField("Bot Naam", client.user.username)
        .addFields(
            { name: "Bot Prefix", value: process.env.PREFFIX },
            { name: "Bot Dev", value: `${packege.author}` },
            { name: "Bot Host", value: `${packege.slimhost}` }
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
    discription: "Here you will find a lot of info from the bot."
}