const discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (client, message, args) => {

    if (!message.member.roles.cache.has(`${process.env.ADMINROLL}`)) return message.reply("Je Bend Geen ADMIN dus je kan dit niet doen.");

    if (!args[0]) return message.reply("Je moet een persoon opgeven.");

    if (!args[1]) return message.reply("Je moet aangeven waarom je de persoon warnt.");

    var warnUser = message.guild.members.cache.get(message.mentions.users.first().id || message.guild.members.get(args[0]).id)

    var reason = args.slice(1).join(" ");

    if (!warnUser) return message.reply("Ik kan niemand in de server vinden met deze naam");

    if (warnUser.roles.cache.has(`${process.env.ADMINROLL}`)) return message.reply("Je kan geen warn aan een ADMIN geven!");

    const warns = JSON.parse(fs.readFileSync("./data/warnings.json", "UTF8"));

    if (!warns[warnUser.id]) warns[warnUser.id] = {
        warns: 0
    }

    warns[warnUser.id].warns++;

    var warnEmbed = new discord.MessageEmbed()
        .setColor(process.env.WARNCOLLOR)
        .setFooter(message.member.displayName, message.author.displayAvatarURL)
        .setTimestamp()
        .setDescription(`**Gewarnd:** <@${warnUser.id}> (${warnUser.id})
        **Warning door:** ${message.author}
        **Redenen: ** ${reason}`)
        .addField("Aantal warns", warns[warnUser.id].warns.toString());

    const channel = message.member.guild.channels.cache.get(`${process.env.MODCHAT}`);

    if (!channel) return;

    channel.send({ embeds: [warnEmbed] });

    if (warns[warnUser.id].warns == 3) {

        var mes = new discord.MessageEmbed()
            .setDescription("PAS OP " + warnUser.user.username)
            .setColor(process.env.WARNCOLLOR)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .addField("Bericht", "Nog één warn en je hebt een ban!!");

        message.channel.send({ embeds: [mes] });

    } else if (warns[warnUser.id].warns == 4) {

        message.guild.members.ban(warnUser, { reason: reason });
        message.channel.send(`${warnUser} is verbannen door de bot wegens te veel warns`);

        var banEmbed = new discord.MessageEmbed()
            .setColor(process.env.BANCOLLOR)
            .setFooter(message.member.displayName, message.author.displayAvatarURL)
            .setTimestamp()
            .setDescription(`**Geband:** <@${warnUser.id}> (${warnUser.id})
        **Redenen: ** is verbannen door de bot wegens te veel warns`)
            .addField("Aantal warns", warns[warnUser.id].warns.toString());

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
    discription: "Dit is een warn command."
}