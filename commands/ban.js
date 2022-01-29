const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if (!message.member.roles.cache.has(`${process.env.ADMINROLL}`)) return message.reply("You're Not an ADMIN so you can't do this.");

    //(prefix)kick naam reden

    if (!message.guild.me.permissions.has("BAN_MEMBERS")) return message.reply("I have no right to Ban anyone.");

    if (!args[0]) return message.reply("You must specify a person.");

    if (!args[1]) return message.reply("You must indicate why you want to Ban the person.");

    //try catch

    var banUser = message.guild.members.cache.get(message.mentions.users.first().id || message.guild.members.get(args[0]).id)

    if (!banUser) return message.reply("I can't find anyone in the server with this name");

    if (banUser.roles.cache.has(`${process.env.ADMINROLL}`)) return message.reply("You can't Ban a ADMIN!");

    var reason = args.slice(1).join(" ");

    var embedPrompt = new discord.MessageEmbed()
        .setColor(process.env.WARNCOLLOR)
        .setTitle("Are you sure you want to do this Ban?")
        .setDescription(`Do you want to Ban ${banUser} ?`)
        .setTimestamp()

    var embedBan = new discord.MessageEmbed()
        .setColor(process.env.BANCOLLOR)
        .setDescription(`Banned:** ${banUser} (${banUser.id})
        **Banned By:** ${message.author}
        **Reason:** ${reason}`)
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
                    return message.channel.send(`Something went wrong with Banning ${banUser}`);

                });

                message.channel.send({ embeds: [embedBan] });

            } else if(emojiDetails.emoji.name === "❌") {

                msg.delete();

                message.channel.send(`You have chosen to dont Ban ${banUser}.`).then(msg => {
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
    discription: "This is a command to ban people from the server."
}