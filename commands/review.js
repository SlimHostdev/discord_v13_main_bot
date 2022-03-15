const discord = require("discord.js");
//File server
const fs = require("fs");
//Taal van de bot
const language = JSON.parse(fs.readFileSync(`./language/${process.env.LANGUAGE}.json`, "utf-8"));

module.exports.run = async (client, message, args) => {

    //comaand opbouw met bericht en aantal sterren.

    const amountStarts = args[0];

    if(!amountStarts || amountStarts < 1 || amountStarts > 5) return message.reply(`${language.cmd_review_no_stars}`);

    const messageReview = args.splice(1,args.length).join(" ") || `**${language.cmd_review_no_msg}**`;

    const reviewChannel = message.member.guild.channels.cache.get(process.env.REVIEWCHAT);

    if(!reviewChannel) return message.reply(`${language.cmd_review_no_channel}`);

    var stars = "";

    for(var i = 0; i < amountStarts; i++) {

        stars += ":star: ";

    }

    message.delete();

    const review = new discord.MessageEmbed()
    .setTitle(`${message.member.displayName}${language.cmd_review_title}`)
    .setFooter(message.member.displayName, message.author.displayAvatarURL)
    .setColor(process.env.REVIEWCOLLOR)
    .setThumbnail(process.env.LOGO)
    .setImage(process.env.BANNER)
    .setTimestamp()
    .addField(`${language.cmd_review_stars}`, `${stars}`)
    .addField(`${language.cmd_review_msg}`, `${messageReview}`);

    const sucsesEmbed = new discord.MessageEmbed()
    .setTitle(`${message.member.displayName} ${language.cmd_review_tnx}`)
    .setFooter(message.member.displayName, message.author.displayAvatarURL)
    .setColor(process.env.REVIEWCOLLOR)
    .setThumbnail(process.env.LOGO)
    .setImage(process.env.BANNER)
    .setTimestamp()
    .setFooter(`${language.cmd_review_footer}`)
    .addField(`${language.cmd_review_channel}`, `<#${process.env.REVIEWCHAT}>`)

    message.channel.send({ embeds: [sucsesEmbed] }).then(msg => {
        message.delete()
        setTimeout(() => msg.delete(), 10000);
    });

    return reviewChannel.send({ embeds: [review] });

}

module.exports.help = {
    name: "review",
    category: "general",
    discription: language.cmd_review_disc
}