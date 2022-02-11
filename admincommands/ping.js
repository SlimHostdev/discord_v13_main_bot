const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if (!message.member.roles.cache.has(`${process.env.ADMINROLL}`)) return message.reply("You're Not an ADMIN so you can't do this.");

    var botEmbed = new discord.MessageEmbed()
        .setTitle("Pong !!!!!!")
        .setDescription("This is a command to test the bot")
        .setColor(process.env.COLLOR)
        .setThumbnail(process.env.LOGO)
        .setImage(process.env.BANNER)
        .setTimestamp()
        .setFooter("ping command")
        .addFields(
            { name: "Bot Name", value: client.user.username }
        )

    return message.channel.send({ embeds: [botEmbed] }).then(msg => {
        message.delete()
        setTimeout(() => msg.delete(), 10000);
    });

}

module.exports.help = {
    name: "ping",
    category: "admin",
    discription: "This is a command to test the bot."
}