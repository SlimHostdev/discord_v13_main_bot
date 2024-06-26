const discord = require("discord.js");
//File server
const fs = require("fs");
//Addon notifications
const notification = JSON.parse(fs.readFileSync(`./src/addons/notification.json`, "utf-8"));

module.exports.run = async (client, message, args) => {

    if (!message.member.roles.cache.has(`${process.env.ADMINROLL}`)) return message.reply(`${notification.no_admin}`).then(msg => {
        message.delete()
        setTimeout(() => msg.delete(), 10000);
    });

    const msg_notification = args.splice(0,args.length).join(" ");

    if(!msg_notification) return message.reply(`**${notification.no_msg}**`).then(msg => {
        message.delete()
        setTimeout(() => msg.delete(), 10000);
    });

    const notificationChannel = message.member.guild.channels.cache.get(notification.channel);

    if(!notificationChannel) return message.reply(`${notification.no_channel}`).then(msg => {
        message.delete()
        setTimeout(() => msg.delete(), 10000);
    });

    const Embed = new discord.MessageEmbed()
    .setTitle(`${notification.title} ${message.member.displayName}`)
    .setFooter(message.member.displayName, message.author.displayAvatarURL)
    .setColor(process.env.COLLOR)
    .setThumbnail(process.env.LOGO)
    .setImage(process.env.BANNER)
    .setTimestamp()
    .addField(`${notification.msg}`, `${msg_notification}`);

    const sucsesEmbed = new discord.MessageEmbed()
    .setTitle(`${notification.title} ${message.member.displayName}`)
    .setFooter(message.member.displayName, message.author.displayAvatarURL)
    .setColor(process.env.COLLOR)
    .setThumbnail(process.env.LOGO)
    .setImage(process.env.BANNER)
    .setTimestamp()
    .setFooter(`${notification.footer}`)
    .addField(`${notification.notification_chat}`, `${notificationChannel}`)

    message.channel.send({ embeds: [sucsesEmbed] }).then(msg => {
        message.delete()
        setTimeout(() => msg.delete(), 10000);
    });

    return notificationChannel.send({ embeds: [Embed] });
    

}

module.exports.help = {
    name: "notification",
    category: "admin",
    discription: notification.cmd_notification_disc
}