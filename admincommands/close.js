const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if (!message.member.roles.cache.has(`${process.env.TICKETSTAFF}`)) return message.reply("You're Not an Ticket Staff so you can't do this.").then(msg => {
        message.delete()
        setTimeout(() => msg.delete(), 10000);
    });

    const categoryID = process.env.TICKETID;

    if (message.channel.parentId == categoryID) {

        message.channel.delete();

        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0'); // Nul toevoegen als het bv. 1 is -> 01
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        today = `${dd}/${mm}/${yyyy}`;

        var embedTicket = new discord.MessageEmbed()
            .setTitle("Ticket, " + message.channel.name)
            .setColor(process.env.COLLOR)
            .setImage(process.env.BANNER)
            .setDescription("This ticket is closed!")
            .setField("Ticket Name: " + message.channel.name)
            .setField("Ticket Clost By: " + message.author)
            .setFooter("Ticket closed -" + today);

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