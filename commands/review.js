const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    //comaand opbouw met bericht en aantal sterren.

    const amountStarts = args[0];

    if(!amountStarts || amountStarts < 1 || amountStarts > 5) return message.reply("Geef een aantal sterren aan van 1 t.e.m. 5");

    const messageReview = args.splice(1,args.length).join(" ") || `**Geen Bericht Mee gegeven**`;

    const reviewChannel = message.member.guild.channels.cache.get(process.env.REVIEWCHAT);

    if(!reviewChannel) return message.reply("Er is nog geen Review Channel ingesteld.");

    var stars = "";

    for(var i = 0; i < amountStarts; i++) {

        stars += ":star: ";

    }

    message.delete();

    const review = new discord.MessageEmbed()
    .setTitle(`${message.member.displayName}'S' review! 🎉`)
    .setFooter(message.member.displayName, message.author.displayAvatarURL)
    .setColor(process.env.REVIEWCOLLOR)
    .setThumbnail(process.env.LOGO)
    .setTimestamp()
    .addField("Sterren:", `${stars}`)
    .addField("Review:", `${messageReview}`);

    const sucsesEmbed = new discord.MessageEmbed()
    .setTitle(`${message.member.displayName} Bedankt voor jou review! 🎉`)
    .setFooter(message.member.displayName, message.author.displayAvatarURL)
    .setColor(process.env.REVIEWCOLLOR)
    .setThumbnail(process.env.LOGO)
    .setTimestamp()
    .setFooter("review command")
    .addField("Review Chat:", `<#${process.env.REVIEWCHAT}>`)

    message.channel.send({ embeds: [sucsesEmbed] });

    return reviewChannel.send({ embeds: [review] });

}

module.exports.help = {
    name: "review",
    category: "general",
    discription: "Dit is een command om een review te geven."
}