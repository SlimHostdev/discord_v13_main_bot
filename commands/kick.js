const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if (!message.member.roles.cache.has(`${process.env.ADMINROLL}`)) return message.reply("Je Bend Geen ADMIN dus je kan dit niet doen.");

    //(prefix)kick naam reden

    if (!message.guild.me.permissions.has("KICK_MEMBERS")) return message.reply("Ik heb niet de recht om iemand te kicken.");

    if (!args[0]) return message.reply("Je moet een persoon opgeven.");

    if (!args[1]) return message.reply("Je moet aangeven waarom je de persoon wilt kicken.");

    //try catch

    var kickUser = message.guild.members.cache.get(message.mentions.users.first().id || message.guild.members.get(args[0]).id)

    if (!kickUser) return message.reply("Ik kan niemand in de server vinden met deze naam");

    if (kickUser.roles.cache.has(`${process.env.ADMINROLL}`)) return message.reply("Je kan geen ADMIN kicken!");

    var reason = args.slice(1).join(" ");

    var embedPrompt = new discord.MessageEmbed()
        .setColor(process.env.WARNCOLLOR)
        .setTitle("Weet je zeeker dat je deze kick will uit voeren?")
        .setDescription(`Wil je ${kickUser} kicken?`)
        .setTimestamp()

    var embedKick = new discord.MessageEmbed()
        .setColor(process.env.BANCOLLOR)
        .setDescription(`Gekickt:** ${kickUser} (${kickUser.id})
        **Gekickt Door:** ${message.author}
        **Reden:** ${reason}`)
        .setFooter(message.member.displayname)
        .setTimestamp();

    message.channel.send({ embeds: [embedPrompt] }).then(async msg => {

        let authorID = message.author.id;
        let time = 30;
        let reactions = ["✅", "❌"];

        // We gaan eerst de tijd * 1000 doen zodat we seconden uitkomen.
        time *= 1000;

        // We gaan iedere reactie meegegeven onder de reactie en deze daar plaatsen.
        for (const reaction of reactions) {
            await msg.react(reaction);
        }

        // Als de emoji de juiste emoji is die men heeft opgegeven en als ook de auteur die dit heeft aangemaakt er op klikt
        // dan kunnen we een bericht terug sturen.
        const filter = (reaction, user) => {
            return reactions.includes(reaction.emoji.name) && user.id === authorID;
        };

        // We kijken als de reactie juist is, dus met die filter en ook het aantal keren en binnen de tijd.
        // Dan kunnen we bericht terug sturen met dat icoontje dat is aangeduid.
        msg.awaitReactions({ filter, max: 1, time: time }).then(collected => {
            var emojiDetails = collected.first();


            if(emojiDetails.emoji.name === "✅") {

                msg.delete();

                kickUser.kick(reason).catch(err => {

                    if (err) 
                    console.log(err);
                    return message.channel.send(`Er is iets fout ge gaan met het Kicken van ${kickUser}`);

                });

                message.channel.send({ embeds: [embedKick] });

            } else if(emojiDetails.emoji.name === "❌") {

                msg.delete();

                message.channel.send(`Je heb gekozen om ${kickUser} niet te kicken.`).then(msg => {
                    message.delete()
                    setTimeout(() => msg.delete(), 5000);
                });

            }
        });
    });
}

module.exports.help = {
    name: "kick",
    category: "admin",
    discription: "Dit is een command om mensen uit de server te kicken."
}