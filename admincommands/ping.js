const discord = require("discord.js");
//File server
const fs = require("fs");

module.exports.run = async (client, message, args) => {

    //Taal van de bot
    const language = JSON.parse(fs.readFileSync(`./locale/${process.env.LANGUAGE}.json`, "utf-8"));

    if (!message.member.roles.cache.has(`${process.env.ADMINROLL}`)) return message.reply("You're Not an ADMIN so you can't do this.");

    var botEmbed = new discord.MessageEmbed()
        .setTitle(`${language.cmd_ping_title}`)
        .setDescription(`${language.cmd_ping_disc}`)
        .setColor(process.env.COLLOR)
        .setThumbnail(process.env.LOGO)
        .setImage(process.env.BANNER)
        .setTimestamp()
        .setFooter(`${language.cmd_ping_footer}`)
        .addFields(
            { name: `${language.cmd_ping_name}`, value: client.user.username }
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