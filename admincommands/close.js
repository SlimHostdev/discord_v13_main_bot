const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if (!message.member.roles.cache.has(`${process.env.TICKETSTAFF}`)) return message.reply("You're Not an Ticket Staff so you can't do this.").then(msg => {
        message.delete()
        setTimeout(() => msg.delete(), 10000);
    });

    const categoryID = process.env.TICKETID;

    var reason = args.join(" ");
    if (!reason) return message.channel.send("You must give a reason for closeing the ticket!").then(msg => {
        message.delete()
        setTimeout(() => msg.delete(), 10000);
    });

    if (message.channel.parentId == categoryID) {

        message.channel.delete();

        var embedTicket = new discord.MessageEmbed()
            .setTitle("Ticket closed!")
            .setColor(process.env.COLLOR)
            .setImage(process.env.BANNER)
            .setDescription("This ticket is closed!")
            .addFields(
                { name: "Ticket Name:", value: message.channel.name, inline: false },
                { name: "Ticket Clost By:", value: message.author.username, inline: false },
                { name: "Reason:", value: reason, inline: false }
            )
            .setTimestamp()
            .setFooter("Ticket closed");

        var ticketLogging = message.member.guild.channels.cache.find(channel => channel.id === process.env.TICKETLOGS);
        if (!ticketLogging) return message.reply("There is no ADMIN LOGS ID in .env yet \n Ask the dev or host to add this").then(msg => {
            message.delete()
            setTimeout(() => msg.delete(), 10000);
        });

        return ticketLogging.send({ embeds: [embedTicket] });

    } else {
        return message.channel.send("You can only do this in a ticket channel!").then(msg => {
            message.delete()
            setTimeout(() => msg.delete(), 10000);
        });
    }

}

module.exports.help = {
    name: "close",
    category: "admin",
    discription: "This is a command to close a ticket."
}