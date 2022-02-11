const discord = require("discord.js");

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
        var generald = "***__General  Description__***\n";
        var infod = "\n***__Info Description__***\n";
        var addonsd = "\n***___Addons Description__***\n"


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
            .setDescription("Here you will find many commands of the bot")
            .setColor(process.env.COLLOR)
            .setThumbnail(process.env.LOGO)
            .setImage(process.env.BANNER)
            .setTimestamp()
            .setFooter("help command")
            .addField(info, infod)
            .addField(general, generald)
            .addField(addons, addonsd)

        //Error Embed
        var errorEmbed = new discord.MessageEmbed()
            .setTitle("ERROR")
            .setDescription("OEPS!!")
            .setColor(process.env.COLLOR)
            .setThumbnail(process.env.LOGO)
            .setImage(process.env.BANNER)
            .setTimestamp()
            .setFooter("help command")
            .addField("Something went wrong", " try again later.")

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
    discription: "Here you will find all commands."
}