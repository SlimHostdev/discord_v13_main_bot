const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if (!message.member.roles.cache.has(`${process.env.ADMINROLL}`)) return message.reply("Je Bend Geen ADMIN dus je kan dit niet doen.");

    var botEmbed = new discord.MessageEmbed()
        .setTitle("Pong !!!!!!")
        .setDescription("Dit is een command om de bot te testen")
        .setColor(process.env.COLLOR)
        .setThumbnail(process.env.LOGO)
        //.setImage(''process.env.INFO'')
        .setTimestamp()
        .setFooter("ping command")
        .addFields(
            { name: "Bot Naam", value: client.user.username }
        )

    return message.channel.send({ embeds: [botEmbed] });

}

module.exports.help = {
    name: "ping",
    category: "admin",
    discription: "Dit is een command om de bot te testen."
}