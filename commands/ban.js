const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if (!message.member.roles.cache.has(`${process.env.ADMINROLL}`)) return message.reply("Je Bend Geen ADMIN dus je kan dit niet doen.");

    //(prefix)kick naam reden

    if (!message.guild.me.permissions.has("BAN_MEMBERS")) return message.reply("Ik heb niet de recht om iemand te Verbannan.");

    if (!args[0]) return message.reply("Je moet een persoon opgeven.");

    if (!args[1]) return message.reply("Je moet aangeven waarom je de persoon wilt Verbannan.");

    //try catch

    var banUser = message.guild.members.cache.get(message.mentions.users.first().id || message.guild.members.get(args[0]).id)

    if (!banUser) return message.reply("Ik kan niemand in de server vinden met deze naam");

    if (banUser.roles.cache.has(`${process.env.ADMINROLL}`)) return message.reply("Je kan geen ADMIN Verbannan!");

    var reason = args.slice(1).join(" ");

    var embedPrompt = new discord.MessageEmbed()
        .setColor(process.env.WARNCOLLOR)
        .setTitle("Weet je zeeker dat je deze ban will uit voeren?")
        .setDescription(`Wil je ${banUser} Verbannan?`)
        .setTimestamp()

    var embedBan = new discord.MessageEmbed()
        .setColor(process.env.BANCOLLOR)
        .setDescription(`Verbannan:** ${banUser} (${banUser.id})
        **Verbannan Door:** ${message.author}
        **Reden:** ${reason}`)
        .setFooter(message.member.displayName)
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

                banUser.ban({reason: reason}).catch(err => {

                    if (err) 
                    console.log(err);
                    return message.channel.send(`Er is iets fout ge gaan met het Verbannan van ${banUser}`);

                });

                message.channel.send({ embeds: [embedBan] });

            } else if(emojiDetails.emoji.name === "❌") {

                msg.delete();

                message.channel.send(`Je heb gekozen om ${banUser} niet te Verbannan.`).then(msg => {
                    message.delete()
                    setTimeout(() => msg.delete(), 5000);
                });

            }
        });
    });
}

module.exports.help = {
    name: "ban",
    category: "admin",
    discription: "Dit is een command om mensen uit de server te Verbannan."
}