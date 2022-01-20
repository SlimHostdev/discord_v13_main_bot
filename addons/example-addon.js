const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var botEmbed = new discord.MessageEmbed()
        .setTitle("exsempel addon !!!!!!")
        .setDescription("Dit is een command om de addons te testen")
        .setColor(process.env.COLLOR)
        .setThumbnail(process.env.LOGO)
        //.setImage(''process.env.INFO'')
        .setTimestamp()
        .setFooter("exsempel addon command")

    return message.channel.send({ embeds: [botEmbed] }).then(msg => {
        message.delete()
        setTimeout(() => msg.delete(), 10000);
    });

}

module.exports.help = {
    name: "exsempel",
    category: "add ons",
    discription: "Dist is een voorbeeld code voor addons."
}