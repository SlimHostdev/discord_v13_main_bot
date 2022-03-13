const discord = require("discord.js");
//File server
const fs = require("fs");
//Taal van de bot
const language = JSON.parse(fs.readFileSync(`./locale/${process.env.LANGUAGE}.json`, "utf-8"));

module.exports.run = async (client, message, args) => {

    //Log chat
    const adminlog = message.member.guild.channels.cache.get(process.env.ADMINLOGS);
    
    if (!message.member.roles.cache.has(`${process.env.ADMINROLL}`)) return message.reply(`${language.no_admin}`);

    //(prefix)ban naam reden

    if (!message.guild.me.permissions.has("BAN_MEMBERS")) return message.reply(`${language.cmd_ban_no_purm}`);

    if (!args[0]) return message.reply(`${language.cmd_ban_no_specify}`);

    if (!args[1]) return message.reply(`${language.cmd_ban_no_reason}`);

    //try catch

    var banUser = message.guild.members.cache.get(message.mentions.users.first().id || message.guild.members.get(args[0]).id)

    if (!banUser) return message.reply(`${language.cmd_ban_cant_find_user}`);

    if (banUser.roles.cache.has(`${process.env.ADMINROLL}`)) return message.reply(`${language.cmd_ban_cant_ban_admin}`);

    var reason = args.slice(1).join(" ");

    var embedPrompt = new discord.MessageEmbed()
        .setThumbnail(process.env.LOGO)
        .setColor(process.env.WARNCOLLOR)
        .setImage(process.env.BANNER)
        .setTitle(`${language.cmd_ban_sure_title}`)
        .setDescription(`${language.cmd_ban_sure_disc} ${banUser} ${language.cmd_ban_sure_disc2}?`)
        .setTimestamp()

    var embedBan = new discord.MessageEmbed()
        .setThumbnail(process.env.LOGO)
        .setColor(process.env.BANCOLLOR)
        .setImage(process.env.BANNER)
        .setDescription(`Banned:** ${banUser} (${banUser.id})
        **Banned By:** ${message.author}
        **Reason:** ${reason}`)
        .setFooter(message.member.displayName)
        .setTimestamp();

    const row = new discord.MessageActionRow().addComponents(

        new discord.MessageButton()
        .setCustomId("Yes")
        .setLabel("Yes")
        .setStyle("SUCCESS")
        .setEmoji("✅"),

        new discord.MessageButton()
        .setCustomId("No")
        .setLabel("No")
        .setStyle("DANGER")
        .setEmoji("⚠️")

    );

    message.channel.send({ embeds: [embedPrompt], components: [row] }).then(async msg => {

        let authorID = message.author.id;
        let time = 30;

        // We gaan eerst de tijd * 1000 doen zodat we seconden uitkomen.
        time *= 1000;

        // We maken een filter aan die nakijkt als het dezelfde gebruiker 
        // is die het bericht heeft aangemaakt.
        const filter = (interaction) => {
            if (interaction.user.id === authorID) return true;
            return interaction.reply("You can't use this.");
        }
    
        // We maken een component collector aan die er voor zal zorgen dat we de knoppen kunnen opvangen.
        // We voegen de filter er aan toe en geven mee dat men enkel maar max één knop kan indrukken.
        const collector = message.channel.createMessageComponentCollector({
            filter,
            max: 1,
            time: time
        });
    
        // Als men een knop heeft ingdrukt zal dit worden opgeroepen.
        // Deze zal de CustomID ophalen van de knop en hier kan men deze dan
        // gaan vergelijken in eventueel een switch case om zo een desbtreffende actie te doen.
        collector.on("collect", (interactionButton) => {
    
            const id = interactionButton.customId;
    
            switch (id) {
                case "Yes":
                    
                    msg.delete();

                    if (banUser.roles.cache.has(`${process.env.ADMINROLL}`))
                    return message.reply("You can't ban ADMIN!");

                    msg.delete();

                    banUser.ban({reason: reason}).catch(err => {
    
                        if (err) 
                        console.log(err);
                        return message.channel.send(`Something went wrong with Banning ${banUser}`);
    
                    });

                    return adminlog.send({ embeds: [embedBan] });
                    
                case "No":
                    
                    msg.delete();

                    message.channel.send(`You have chosen to dont Ban ${banUser}.`).then(msg => {
                        message.delete()
                        setTimeout(() => msg.delete(), 5000);
                    });

                    return 
                default:
                    return interactionButton.reply("This button has no functionality yet.");
            }
        });
    });

}

module.exports.help = {
    name: "ban",
    category: "admin",
    discription: "This is a command to ban people from the server."
}