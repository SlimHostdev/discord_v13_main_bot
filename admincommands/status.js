const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if (!message.member.roles.cache.has(`${process.env.ADMINROLL}`)) return message.reply("You're Not an ADMIN so you can't do this.");

    var statusTxt = args.join(" ");

    client.user.setPresence({

        status: "DND",
        activities: [
            {
                name: statusTxt
            }
        ]

    });

    return message.channel.send(`**The bot status has changed to:** ${statusTxt}`).then(msg => {
        message.delete()
        setTimeout(() => msg.delete(), 10000);
    });

}

module.exports.help = {
    name: "status",
    category: "admin",
    discription: "This is a command to change the bot's status."
}