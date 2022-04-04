const discord = require("discord.js");
//File server
const fs = require("fs");
//Taal van de bot
const language = JSON.parse(fs.readFileSync(`./language/${process.env.LANGUAGE}.json`, "utf-8"));


module.exports.run = async (client, message, args) => {

    if (!message.member.roles.cache.has(`${process.env.ADMINROLL}`)) return message.reply("You're Not an ADMIN so you can't do this.");

    try {

        //Prefix oproepen uit .env
        var prefix = process.env.PREFFIX;

        var respons = "**Admin Help Commands**\r\n\n";
        var admin = "\n**__Admin__**\n";
        var admind = `\n***__${language.cmd_adminhelp_discriptions}__***\n`;


        client.commands.forEach(command => {

            switch (command.help.category) {

                case "admin":
                    admin += `${prefix} ${command.help.name}\r\n`;
                    admind += `${command.help.discription}\r\n`;
                    break;

            }

        });

        var botEmbed = new discord.MessageEmbed()
            .setTitle(respons)
            .setDescription(`${language.cmd_adminhelp_disc}`)
            .setColor(process.env.COLLOR)
            .setThumbnail(process.env.LOGO)
            .setImage(process.env.BANNER)
            .setTimestamp()
            .setFooter(`${language.cmd_adminhelp_footer}`)
            .addField(admin, admind)

        var errorEmbed = new discord.MessageEmbed()
            .setTitle(`${language.err_title}`)
            .setDescription(`${language.err_disc}`)
            .setColor(process.env.COLLOR)
            .setThumbnail(process.env.LOGO)
            .setImage(process.env.BANNER)
            .setTimestamp()
            .setFooter(`${language.cmd_adminhelp_footer}`)
            .addField(`${language.err_field1}`, `${language.err_field2}`)

        message.author.send({ embeds: [botEmbed] })

    } catch (error) {
        message.reply({ embeds: [errorEmbed] });
    }

}

module.exports.help = {
    name: "adminhelp",
    category: "admin",
    discription: language.cmd_adminhelp_disc
}