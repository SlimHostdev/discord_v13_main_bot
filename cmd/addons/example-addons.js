const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var botEmbed = new discord.MessageEmbed()
        .setTitle("exsempel addon !!!!!!")
        .setDescription("This is a command to test the addons")
        .setColor(process.env.COLLOR)
        .setThumbnail(process.env.LOGO)
        .setImage(process.env.BANNER)
        .setTimestamp()
        .setFooter("example addon command")

    return message.channel.send({ embeds: [botEmbed] }).then(msg => {
        message.delete()
        setTimeout(() => msg.delete(), 10000);
    });

}

module.exports.help = {
    name: "example",
    category: "add ons",
    discription: "Dist is an example code for addons."
}