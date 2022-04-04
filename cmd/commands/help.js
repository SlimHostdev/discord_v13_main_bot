const discord = require("discord.js");
//File server
const fs = require("fs");
//Taal van de bot
const language = JSON.parse(fs.readFileSync(`./language/${process.env.LANGUAGE}.json`, "utf-8"));

module.exports.run = async (client, message, args) => {

    try {

        //Prefix oproepen uit .env
        var prefix = process.env.PREFFIX;

        //Main info
        var respons = "**Help Commands**\r\n\n";
        var general = "**__General__**\n";
        var info = "\n**__Info__**\n";
        var addons = "\n**__Addons Commands__**\n";

        //Discription
        var generald = `***__General  ${language.disc}__***\n`;
        var infod = `\n***__Info ${language.disc}__***\n`;
        var addonsd = `\n***___Addons ${language.disc}__***\n`;


        client.commands.forEach(command => {

            switch (command.help.category) {

                case "general":
                    general += `${prefix} ${command.help.name}\r\n`;
                    generald += `${command.help.discription}\r\n`;
                    break;
                case "info":
                    info += `${prefix} ${command.help.name}\r\n`;
                    infod += `${command.help.discription}\r\n`;
                    break;
                case "add ons":
                    addons += `${prefix} ${command.help.name}\r\n`;
                    addonsd += `${command.help.discription}\r\n`;
                    break;
            }

        });

        //Main Embed
        var botEmbed = new discord.MessageEmbed()
            .setTitle(respons)
            .setDescription(`${language.cmd_help_disc}`)
            .setColor(process.env.COLLOR)
            .setThumbnail(process.env.LOGO)
            .setImage(process.env.BANNER)
            .setTimestamp()
            .setFooter(`${language.cmd_help_footer}`)
            .addField(info, infod)
            .addField(general, generald)
            .addField(addons, addonsd)

        //Error Embed
        var errorEmbed = new discord.MessageEmbed()
            .setTitle(`${language.err_title}`)
            .setDescription(`${language.err_disc}`)
            .setColor(process.env.COLLOR)
            .setThumbnail(process.env.LOGO)
            .setImage(process.env.BANNER)
            .setTimestamp()
            .setFooter(`${language.cmd_help_footer}`)
            .addField(`${language.err_field1}`, `${language.err_field2}`)

        message.channel.send({ embeds: [botEmbed] }).then(msg => {
            message.delete()
            setTimeout(() => msg.delete(), 10000);
        })

    } catch (error) {
        message.reply({ embeds: [errorEmbed] });
    }

}

module.exports.help = {
    name: "help",
    category: "info",
    discription: language.cmd_help_disc
}