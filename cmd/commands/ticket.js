const discord = require("discord.js");
//File server
const fs = require("fs");
//Taal van de bot
const language = JSON.parse(fs.readFileSync(`./language/${process.env.LANGUAGE}.json`, "utf-8"));

module.exports.run = async (client, message, args) => {

    const categoryID = process.env.TICKETID;

    var userName = message.author.username;

    var userDiscriminator = message.author.discriminator;

    var reason = args.join(" ");
    if (!reason) return message.channel.send(`${language.cmd_ticket_no_msg}`).then(msg => {
        message.delete()
        setTimeout(() => msg.delete(), 10000);
    });

    var ticketBestaat = false;

    message.guild.channels.cache.forEach((channel) => {

        if (channel.name == userName.toLowerCase() + "-" + userDiscriminator) {

            message.channel.send(`${language.cmd_ticket_open_ticket}`).then(msg => {
                message.delete()
                setTimeout(() => msg.delete(), 10000);
            });

            ticketBestaat = true;

            return;

        }

    });

    if (ticketBestaat) return;

    message.guild.channels.create(userName.toLowerCase() + "-" + userDiscriminator, { type: "text" }).then((createChan) => {

        createChan.setParent(categoryID).then((settedParent) => {

            // Perms zodat iedereen niets kan lezen.
            settedParent.permissionOverwrites.edit(message.guild.roles.cache.find(x => x.name === "@everyone"), {

                SEND_MESSAGES: false,
                VIEW_CHANNEL: false

            });

            // READ_MESSAGE_HISTORY Was vroeger READ_MESSAGES
            // Perms zodat de gebruiker die het command heeft getypt alles kan zien van zijn ticket.
            settedParent.permissionOverwrites.edit(message.author.id, {
                VIEW_CHANNEL: true,
                CREATE_INSTANT_INVITE: false,
                READ_MESSAGE_HISTORY: true,
                SEND_MESSAGES: true,
                ATTACH_FILES: true,
                CONNECT: true,
                ADD_REACTIONS: true
            });

            // Perms zodat de gebruikers die admin zijn alles kunnen zien van zijn ticket.
            settedParent.permissionOverwrites.edit(message.guild.roles.cache.find(x => x.id === `${process.env.TICKETSTAFF}`), {
                VIEW_CHANNEL: true,
                CREATE_INSTANT_INVITE: false,
                READ_MESSAGE_HISTORY: true,
                SEND_MESSAGES: true,
                ATTACH_FILES: true,
                CONNECT: true,
                ADD_REACTIONS: true
            });

            let today = new Date();
            let dd = String(today.getDate()).padStart(2, '0'); // Nul toevoegen als het bv. 1 is -> 01
            let mm = String(today.getMonth() + 1).padStart(2, '0');
            let yyyy = today.getFullYear();
            today = `${dd}/${mm}/${yyyy}`;

            let embedParent = new discord.MessageEmbed()
                .setAuthor(message.author.username, message.author.displayAvatarURL({ size: 4096 }))
                .setColor(process.env.COLLOR)
                .setImage(process.env.BANNER)
                .setTitle(`${language.cmd_ticket_new}`)
                .addFields(
                    { name: `${language.cmd_ticket_create_at}`, value: today, inline: false },
                    { name: `${language.cmd_ticket_msg}`, value: reason, inline: false }
                );

            message.channel.send(`${language.cmd_ticket_create}`).then(msg => {
                message.delete()
                setTimeout(() => msg.delete(), 10000);
            });

            settedParent.send({ embeds: [embedParent] });

        }).catch(err => {
            message.channel.send(`${language.cmd_ticket_err}`)
        })

    }).catch(err => {
        message.channel.send(`${language.cmd_ticket_err}`)
    });

}

module.exports.help = {
    name: "ticket",
    category: "general",
    discription: language.cmd_ticket_disc
}