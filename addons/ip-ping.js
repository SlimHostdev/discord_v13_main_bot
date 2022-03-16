const discord = require("discord.js");
//IP Ping
var ping = require('ping');
//Setings
const addons_setings = JSON.parse(fs.readFileSync("./src/addons/ipping.json", "utf-8"));
//IP Ping Host
var hosts = [`${addons_setings.ip}`];
//File server
const fs = require("fs");
//Taal van de bot
const language = JSON.parse(fs.readFileSync(`./language/${process.env.LANGUAGE}.json`, "utf-8"));
const addons_language = JSON.parse(fs.readFileSync(`./language/addons/ipping/${process.env.LANGUAGE}.json`, "utf-8"));


module.exports.run = async (client, message, args) => {

    //    if (!message.member.roles.cache.has(`${process.env.ADMINROLL}`)) return message.reply(`${language.no_admin}`);

    for (let host of hosts) {
        // WARNING: -i 2 argument may not work in other platform like windows
        let res = await ping.promise.probe(host, {
            timeout: 10,
            extra: ['-i', '2'],
        });
        console.log(res);
    }

    var botEmbed = new discord.MessageEmbed()
        .setTitle(`${addons_language.cmd_ipping_title}`)
        .setDescription(`${addons_language.cmd_ipping_disc}`)
        .setColor(process.env.COLLOR)
        .setThumbnail(process.env.LOGO)
        .setImage(process.env.BANNER)
        .setTimestamp()
        .setFooter(`${addons_language.cmd_ipping_footer}`)
        .addField(`${addons_language.cmd_ipping_info}`, res)

    return message.channel.send({ embeds: [botEmbed] }).then(msg => {
        message.delete()
        setTimeout(() => msg.delete(), 10000);
    });

}

module.exports.help = {
    name: "ipping",
    category: "add ons",
    discription: addons_language.cmd_ipping_disc
}