const discord = require("discord.js");
//File server
const fs = require("fs");
//Taal van de bot
const language = JSON.parse(fs.readFileSync(`./language/${process.env.LANGUAGES}.json`, "utf-8"));

module.exports.run = async (client, message, args) => {

    //Log chat
    const adminlog = message.member.guild.channels.cache.get(process.env.ADMINLOGS);
    
    if (!message.member.roles.cache.has(`${process.env.ADMINROLL}`)) return message.reply(`${language.no_admin}`);

    //(prefix)ban naam reden

    if (!message.guild.me.permissions.has("BAN_MEMBERS")) return message.reply(`${language.cmd_ban_no_purm}`);

    if (!args[0]) return message.reply(`${language.not_specify}`);

    if (!args[1]) return message.reply(`${language.cmd_ban_no_reason}`);

    //try catch

    var banUser = message.guild.members.cache.get(message.mentions.users.first().id || message.guild.members.get(args[0]).id)

    if (!banUser) return message.reply(`${language.cant_find_user}`);

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
        .setDescription(`**${language.cmd_ban_banned_disc}** ${banUser} (${banUser.id})
        **${language.cmd_ban_banned_by}** ${message.author}
        **${language.cmd_ban_banned_reason}** ${reason}`)
        .setFooter(message.member.displayName)
        .setTimestamp();

    const row = new discord.MessageActionRow().addComponents(

        new discord.MessageButton()
        .setCustomId("Yes")
        .setLabel(`${language.yes}`)
        .setStyle("SUCCESS")
        .setEmoji("✅"),

        new discord.MessageButton()
        .setCustomId("No")
        .setLabel(`${language.no}`)
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
            return interaction.reply(`${language.cant_use}`);
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
                    return message.reply(`${language.cmd_ban_cant_ban_admin}`);

                    msg.delete();

                    banUser.ban({reason: reason}).catch(err => {
    
                        if (err) 
                        console.log(err);
                        return message.channel.send(`${language.cmd_ban_err} ${banUser}`);
    
                    });

                    return adminlog.send({ embeds: [embedBan] });
                    
                case "No":
                    
                    msg.delete();

                    message.channel.send(`${language.cmd_ban_dont_ban} ${banUser}.`).then(msg => {
                        message.delete()
                        setTimeout(() => msg.delete(), 5000);
                    });

                    return 
                default:
                    return interactionButton.reply(`${language.no_functionality}`);
            }
        });
    });

}

module.exports.help = {
    name: "ban",
    category: "admin",
    discription: language.cmd_ban_disc
}