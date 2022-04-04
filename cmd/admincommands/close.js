const discord = require("discord.js");
//File server
const fs = require("fs");
//Taal van de bot
const language = JSON.parse(fs.readFileSync(`./language/${process.env.LANGUAGE}.json`, "utf-8"));

module.exports.run = async (client, message, args) => {

    if (!message.member.roles.cache.has(`${process.env.TICKETSTAFF}`)) return message.reply(`${language.no_ticket_staff}`).then(msg => {
        message.delete()
        setTimeout(() => msg.delete(), 10000);
    });

    const categoryID = process.env.TICKETID;

    var reason = args.join(" ");
    if (!reason) return message.channel.send(`${language.cmd_close_no_reason}`).then(msg => {
        message.delete()
        setTimeout(() => msg.delete(), 10000);
    });

    if (message.channel.parentId == categoryID) {

        message.channel.delete();

        var embedTicket = new discord.MessageEmbed()
            .setTitle(`${language.cmd_close_title}`)
            .setColor(process.env.COLLOR)
            .setImage(process.env.BANNER)
            .setDescription(`${language.cmd_close_disc_close}`)
            .addFields(
                { name: `${language.cmd_close_name_close}`, value: message.channel.name, inline: false },
                { name: `${language.cmd_close_by_close}`, value: message.author.username, inline: false },
                { name: `${language.cmd_close_reason_close}`, value: reason, inline: false }
            )
            .setTimestamp()
            .setFooter(`${language.cmd_close_footer_close}`);

        var ticketLogging = message.member.guild.channels.cache.find(channel => channel.id === process.env.TICKETLOGS);
        if (!ticketLogging) return message.reply(`${language.cmd_close_no_ticketlog}`).then(msg => {
            message.delete()
            setTimeout(() => msg.delete(), 10000);
        });

        return ticketLogging.send({ embeds: [embedTicket] });

    } else {
        return message.channel.send(`${language.cmd_close_not_in_ticket}`).then(msg => {
            message.delete()
            setTimeout(() => msg.delete(), 10000);
        });
    }

}

module.exports.help = {
    name: "close",
    category: "admin",
    discription: language.cmd_close_disc
}