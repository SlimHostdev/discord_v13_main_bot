const discord = require("discord.js");
//File server
const fs = require("fs");
//Taal van de bot
const language = JSON.parse(fs.readFileSync(`./language/${process.env.LANGUAGE}.json`, "utf-8"));

module.exports.run = async (client, message, args) => {

    var botEmbed = new discord.MessageEmbed()
        .setTitle(`${language.cmd_serverinfo_title}`)
        .setDescription(`${language.cmd_serverinfo_disc}`)
        .setColor(process.env.COLLOR)
        .setThumbnail(process.env.LOGO)
        .setImage(process.env.BANNER)
        .setTimestamp()
        .setFooter(`${language.cmd_serverinfo_footer}`)
        .addFields(
            { name: `${language.cmd_serverinfo_bot_name}`, value: client.user.username },
            { name: `${language.cmd_serverinfo_joint}`, value: message.member.joinedAt.toString() },
            { name: `${language.cmd_serverinfo_members}`, value: message.guild.memberCount.toString() }
        )

    return message.channel.send({ embeds: [botEmbed] }).then(msg => {
        message.delete()
        setTimeout(() => msg.delete(), 10000);
    });

}

module.exports.help = {
    name: "serverinfo",
    category: "info",
    discription: language.cmd_serverinfo_disc
}