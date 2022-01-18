const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var botEmbed = new discord.MessageEmbed()
        .setTitle("Info command")
        .setDescription("Hier vindje veel info van de bot")
        .setColor(process.env.COLLOR)
        .setThumbnail(process.env.LOGO)
        //.setImage(''process.env.INFO'')
        .setTimestamp()
        .setFooter("info command")
        .addField("Bot Naam", client.user.username)
        .addFields(
            { name: "Bot Prefix", value: process.env.PREFFIX },
            { name: "Bot Dev", value: "𝕭𝖗𝖞𝖆𝖓#6694" },
            { name: "Bot Host", value: 'https://SlimHost.nl' }
        )

    return message.channel.send({ embeds: [botEmbed] }).then(msg => {
        message.delete()
        setTimeout(() => msg.delete(), 10000);
    });

}

module.exports.help = {
    name: "info",
    category: "info",
    discription: "Hier vindje veel info van de bot."
}