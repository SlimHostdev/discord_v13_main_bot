const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var botEmbed = new discord.MessageEmbed()
        .setTitle("Server Info command")
        .setDescription("Hier vindje veel info van deze server")
        .setColor(process.env.COLLOR)
        .setThumbnail(process.env.LOGO)
        //.setImage(''process.env.INFO'')
        .setTimestamp()
        .setFooter("serverinfo command")
        .addFields(
            { name: "Bot Naam", value: client.user.username },
            { name: "Je bent de server gejoint op", value: message.member.joinedAt.toString() },
            { name: "Totaal members", value: message.guild.memberCount.toString() }
        )

    return message.channel.send({ embeds: [botEmbed] }).then(msg => {
        message.delete()
        setTimeout(() => msg.delete(), 10000);
    });

}

module.exports.help = {
    name: "serverinfo",
    category: "info",
    discription: "Hier vindje veel info van deze server."
}