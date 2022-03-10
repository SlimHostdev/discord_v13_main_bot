const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    //Log chat
    const adminlog = message.member.guild.channels.cache.get(process.env.ADMINLOGS);
    
    if (!message.member.roles.cache.has(`${process.env.ADMINROLL}`)) return message.reply("You're Not an ADMIN so you can't do this.");

    //(prefix)kick naam reden

    if (!message.guild.me.permissions.has("KICK_MEMBERS")) return message.reply("I have no right to kick anyone.");

    if (!args[0]) return message.reply("You must specify a person.");

    if (!args[1]) return message.reply("You have to indicate why you want to kick the person.");

    //try catch

    var kickUser = message.guild.members.cache.get(message.mentions.users.first().id || message.guild.members.get(args[0]).id)

    if (!kickUser) return message.reply("I can't find anyone in the server with this name");

    if (kickUser.roles.cache.has(`${process.env.ADMINROLL}`)) return message.reply("You can't kick ADMIN!");

    var reason = args.slice(1).join(" ");

    var embedPrompt = new discord.MessageEmbed()
        .setColor(process.env.WARNCOLLOR)
        .setThumbnail(process.env.LOGO)
        .setImage(process.env.BANNER)
        .setTitle("Are you sure you want to perform this kick?")
        .setDescription(`Do you want to kick ${kickUser} ?`)
        .setTimestamp()

    var embedKick = new discord.MessageEmbed()
        .setColor(process.env.BANCOLLOR)
        .setThumbnail(process.env.LOGO)
        .setImage(process.env.BANNER)
        .setDescription(`**kicked:** ${kickUser} (${kickUser.id})
        **Kicked By:** ${message.author}
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

                    if (kickUser.roles.cache.has(`${process.env.ADMINROLL}`))
                    return message.reply("You can't kick ADMIN!");

                    kickUser.kick(reason).catch(err => {

                        if (err) 
                        console.log(err);
                        return message.channel.send(`Something went wrong while kicking ${kickUser}`).then(msg => {
                            message.delete()
                            setTimeout(() => msg.delete(), 5000);
                        });

                    });

                    return adminlog.send({ embeds: [embedKick] });
                    
                case "No":
                    
                    msg.delete();

                    message.channel.send(`You have chosen to dont Kick ${kickUser} .`).then(msg => {
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
    name: "kick",
    category: "admin",
    discription: "This is a command to kick people out of the server."
}