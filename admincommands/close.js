const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if (!message.member.roles.cache.has(`${process.env.TICKETSTAFF}`)) return message.reply("You're Not an Ticket Staff so you can't do this.");

    const categoryID = process.env.TICKETID;

    if (message.channel.parendId == categoryID) {

        var embedTicket = new discord.MessageEmbed()
            .setTitle("Ticket, " + message.channel.name)
            .setColor(process.env.COLLOR)
            .setImage(process.env.BANNER)
            .setDescription("This ticket is closed!")
            .setFooter("Ticket closed");

        var ticketLogging = message.member.guild.channels.cache.find(channel => channel.id === process.env.ADMINLOGS);
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