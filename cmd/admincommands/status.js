const discord = require("discord.js");
//File server
const fs = require("fs");
//Taal van de bot
const language = JSON.parse(fs.readFileSync(`./language/${process.env.LANGUAGE}.json`, "utf-8"));


module.exports.run = async (client, message, args) => {

    if (!message.member.roles.cache.has(`${process.env.ADMINROLL}`)) return message.reply(`${language.no_admin}`);

    var statusTxt = args.join(" ");

    client.user.setPresence({

        status: "DND",
        activities: [
            {
                name: statusTxt
            }
        ]

    });

    return message.channel.send(`${language.cmd_status_msg} ${statusTxt}`).then(msg => {
        message.delete()
        setTimeout(() => msg.delete(), 10000);
    });

}

module.exports.help = {
    name: "status",
    category: "admin",
    discription: language.cmd_status_disc
}