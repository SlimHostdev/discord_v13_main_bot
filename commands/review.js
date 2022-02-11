const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    //comaand opbouw met bericht en aantal sterren.

    const amountStarts = args[0];

    if(!amountStarts || amountStarts < 1 || amountStarts > 5) return message.reply("Please indicate a number of stars from 1 to 5");

    const messageReview = args.splice(1,args.length).join(" ") || `**No Message Provided**`;

    const reviewChannel = message.member.guild.channels.cache.get(process.env.REVIEWCHAT);

    if(!reviewChannel) return message.reply("No Review Channel has been set up yet.");

    var stars = "";

    for(var i = 0; i < amountStarts; i++) {

        stars += ":star: ";

    }

    message.delete();

    const review = new discord.MessageEmbed()
    .setTitle(`${message.member.displayName}'s review! 🎉`)
    .setFooter(message.member.displayName, message.author.displayAvatarURL)
    .setColor(process.env.REVIEWCOLLOR)
    .setThumbnail(process.env.LOGO)
    .setImage(process.env.BANNER)
    .setTimestamp()
    .addField("Stars:", `${stars}`)
    .addField("Review:", `${messageReview}`);

    const sucsesEmbed = new discord.MessageEmbed()
    .setTitle(`${message.member.displayName} Thank you for your review! 🎉`)
    .setFooter(message.member.displayName, message.author.displayAvatarURL)
    .setColor(process.env.REVIEWCOLLOR)
    .setThumbnail(process.env.LOGO)
    .setImage(process.env.BANNER)
    .setTimestamp()
    .setFooter("review command")
    .addField("Review Chat:", `<#${process.env.REVIEWCHAT}>`)

    message.channel.send({ embeds: [sucsesEmbed] }).then(msg => {
        message.delete()
        setTimeout(() => msg.delete(), 10000);
    });

    return reviewChannel.send({ embeds: [review] });

}

module.exports.help = {
    name: "review",
    category: "general",
    discription: "This is a command to give a review."
}