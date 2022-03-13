const discord = require("discord.js");
//File server
const fs = require("fs");
//Taal van de bot
const language = JSON.parse(fs.readFileSync(`./locale/${process.env.LANGUAGE}.json`, "utf-8"));

module.exports.run = async (client, message, args) => {

    if (!message.member.roles.cache.has(`${process.env.ADMINROLL}`)) return message.reply(`${language.no_admin}`);

    if (!args[0]) return message.reply(`${language.not_specify}`);

    if (!args[1]) return message.reply(`${language.cmd_warn_no_reason}`);

    var warnUser = message.guild.members.cache.get(message.mentions.users.first().id || message.guild.members.get(args[0]).id)

    var reason = args.slice(1).join(" ");

    if (!warnUser) return message.reply(`${language.cant_find_user}`);

    if (warnUser.roles.cache.has(`${process.env.ADMINROLL}`)) return message.reply("You can't give a warm to an ADMIN!");

    const warns = JSON.parse(fs.readFileSync("./data/warnings.json", "UTF8"));

    if (!warns[warnUser.id]) warns[warnUser.id] = {
        warns: 0
    }

    warns[warnUser.id].warns++;

    var warnEmbed = new discord.MessageEmbed()
        .setColor(process.env.WARNCOLLOR)
        .setThumbnail(process.env.LOGO)
        .setImage(process.env.BANNER)
        .setFooter(message.member.displayName, message.author.displayAvatarURL)
        .setTimestamp()
        .setDescription(`**Warn:** <@${warnUser.id}> (${warnUser.id})
        **Warning by:** ${message.author}
        **Reasons: ** ${reason}`)
        .addField("Number of warnings", warns[warnUser.id].warns.toString());

    const channel = message.member.guild.channels.cache.get(`${process.env.MODCHAT}`);

    if (!channel) return;

    channel.send({ embeds: [warnEmbed] });

    if (warns[warnUser.id].warns == 3) {

        var mes = new discord.MessageEmbed()
            .setThumbnail(process.env.LOGO)
            .setImage(process.env.BANNER)
            .setDescription("WATCH OUT " + warnUser.user.username)
            .setColor(process.env.WARNCOLLOR)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .addField("Message", "One more warm and you're banned!!");

        message.channel.send({ embeds: [mes] });

    } else if (warns[warnUser.id].warns == 4) {

        message.guild.members.ban(warnUser, { reason: reason });
        message.channel.send(`${warnUser} got banned by the bot for too many warns`);

        var banEmbed = new discord.MessageEmbed()
            .setThumbnail(process.env.LOGO)
            .setImage(process.env.BANNER)
            .setColor(process.env.BANCOLLOR)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(`**BANNED:** <@${warnUser.id}> (${warnUser.id})
        **Reasons: ** got banned by the bot for too many warns`)
            .addField("number of warnings", warns[warnUser.id].warns.toString());

        const banchannel = message.member.guild.channels.cache.get(`${process.env.ADMINLOGS}`);

        if (!banchannel) return;

        banchannel.send({ embeds: [banEmbed] });

    }

    fs.writeFile("./data/warnings.json", JSON.stringify(warns), (err) => {
        if (err) console.log(err);
    });


}

module.exports.help = {
    name: "warn",
    category: "admin",
    discription: "This is a warn command."
}