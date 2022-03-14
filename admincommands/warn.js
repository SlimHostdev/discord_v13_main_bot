const discord = require("discord.js");
//File server
const fs = require("fs");
//Taal van de bot
const language = JSON.parse(fs.readFileSync(`./language/${process.env.LANGUAGE}.json`, "utf-8"));

module.exports.run = async (client, message, args) => {

    if (!message.member.roles.cache.has(`${process.env.ADMINROLL}`)) return message.reply(`${language.no_admin}`);

    if (!args[0]) return message.reply(`${language.not_specify}`);

    if (!args[1]) return message.reply(`${language.cmd_warn_no_reason}`);

    var warnUser = message.guild.members.cache.get(message.mentions.users.first().id || message.guild.members.get(args[0]).id)

    var reason = args.slice(1).join(" ");

    if (!warnUser) return message.reply(`${language.cant_find_user}`);

    if (warnUser.roles.cache.has(`${process.env.ADMINROLL}`)) return message.reply(`${language.cmd_warn_cant_warn_admin}`);

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
        .setDescription(`**${language.cmd_warn_warn}** <@${warnUser.id}> (${warnUser.id})
        **${language.cmd_warn_by}** ${message.author}
        **${language.cmd_warn_reason}** ${reason}`)
        .addField(`${language.cmd_warn_number_warn} `, warns[warnUser.id].warns.toString());

    const channel = message.member.guild.channels.cache.get(`${process.env.MODCHAT}`);

    if (!channel) return;

    channel.send({ embeds: [warnEmbed] });

    if (warns[warnUser.id].warns == 3) {

        var mes = new discord.MessageEmbed()
            .setThumbnail(process.env.LOGO)
            .setImage(process.env.BANNER)
            .setDescription(`${language.cmd_warn_watch_out} ` + warnUser.user.username)
            .setColor(process.env.WARNCOLLOR)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .addField(`${language.cmd_warn_msg}`, `${language.cmd_warn_one_more}`);

        message.channel.send({ embeds: [mes] });

    } else if (warns[warnUser.id].warns == 4) {

        message.guild.members.ban(warnUser, { reason: reason });
        message.channel.send(`${warnUser} ${language.cmd_warn_ban}`);

        var banEmbed = new discord.MessageEmbed()
            .setThumbnail(process.env.LOGO)
            .setImage(process.env.BANNER)
            .setColor(process.env.BANCOLLOR)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(`**${language.cmd_ban_banned_disc}** <@${warnUser.id}> (${warnUser.id})
        **${language.cmd_ban_banned_reason}** ${language.cmd_warn_ban}`)
            .addField(`${language.cmd_warn_number_warn}`, warns[warnUser.id].warns.toString());

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
    discription: language.cmd_warn_disc
}