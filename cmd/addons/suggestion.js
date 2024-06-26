const discord = require("discord.js");
//File server
const fs = require("fs");
//Setings of the addon
const suggestion = JSON.parse(fs.readFileSync(`./src/addons/suggestion.json`, "utf-8"));

module.exports.run = async (client, message, args) => {

    const msg_suggestion = args.splice(0,args.length).join(" ");

    if(!msg_suggestion) return message.reply(`**${suggestion.no_msg}**`).then(msg => {
        message.delete()
        setTimeout(() => msg.delete(), 10000);
    });

    const suggestionChannel = message.member.guild.channels.cache.get(suggestion.channel);

    if(!suggestionChannel) return message.reply(`${suggestion.no_channel}`).then(msg => {
        message.delete()
        setTimeout(() => msg.delete(), 10000);
    });

    const Embed = new discord.MessageEmbed()
    .setTitle(`${suggestion.title} ${message.member.displayName}`)
    .setFooter(message.member.displayName, message.author.displayAvatarURL)
    .setColor(process.env.COLLOR)
    .setThumbnail(process.env.LOGO)
    .setImage(process.env.BANNER)
    .setTimestamp()
    .addField(`${suggestion.msg}`, `${msg_suggestion}`);

    const sucsesEmbed = new discord.MessageEmbed()
    .setTitle(`${suggestion.title} ${message.member.displayName}`)
    .setFooter(message.member.displayName, message.author.displayAvatarURL)
    .setColor(process.env.COLLOR)
    .setThumbnail(process.env.LOGO)
    .setImage(process.env.BANNER)
    .setTimestamp()
    .setFooter(`${suggestion.footer}`)
    .addField(`${suggestion.suggestion_chat}`, `${suggestionChannel}`)

    message.channel.send({ embeds: [sucsesEmbed] }).then(msg => {
        message.delete()
        setTimeout(() => msg.delete(), 10000);
    });

    return suggestionChannel.send({ embeds: [Embed] }).then(async msg => {
 
        let reactions = ["✅", "❌"];
     
        // We gaan iedere reactie meegegeven onder de reactie en deze daar plaatsen.
        for (const reaction of reactions) {
            await msg.react(reaction);
        }
     
    });
    

}

module.exports.help = {
    name: "suggestion",
    category: "add ons",
    discription: suggestion.cmd_suggestion_disc
}