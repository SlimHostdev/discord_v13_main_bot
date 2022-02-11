const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var botEmbed = new discord.MessageEmbed()
        .setTitle("Server Info command")
        .setDescription("Here you will find a lot of information about this server")
        .setColor(process.env.COLLOR)
        .setThumbnail(process.env.LOGO)
        .setImage(process.env.BANNER)
        .setTimestamp()
        .setFooter("serverinfo command")
        .addFields(
            { name: "Bot Name", value: client.user.username },
            { name: "You have joined the server on", value: message.member.joinedAt.toString() },
            { name: "Total members", value: message.guild.memberCount.toString() }
        )

    return message.channel.send({ embeds: [botEmbed] }).then(msg => {
        message.delete()
        setTimeout(() => msg.delete(), 10000);
    });

}

module.exports.help = {
    name: "serverinfo",
    category: "info",
    discription: "Here you will find a lot of information about this server."
}