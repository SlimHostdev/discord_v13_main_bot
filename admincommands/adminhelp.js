const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if (!message.member.roles.cache.has(`${process.env.ADMINROLL}`)) return message.reply("You're Not an ADMIN so you can't do this.");

    try {

        //Prefix oproepen uit .env
        var prefix = process.env.PREFFIX;

        var respons = "**Admin Help Commands**\r\n\n";
        var admin = "\n**__Admin__**\n";
        var admind = "\n***__Admin  Description__***\n";


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
            .setDescription("Here you will find all ADMIN commands")
            .setColor(process.env.COLLOR)
            .setThumbnail(process.env.LOGO)
            .setImage(process.env.BANNER)
            .setTimestamp()
            .setFooter("adminhelp command")
            .addField(admin, admind)

        var errorEmbed = new discord.MessageEmbed()
            .setTitle("ERROR")
            .setDescription("OEPS!!")
            .setColor(process.env.COLLOR)
            .setThumbnail(process.env.LOGO)
            .setImage(process.env.BANNER)
            .setTimestamp()
            .setFooter("help command")
            .addField("Something is going wrong!", " try again later.")

        message.author.send({ embeds: [botEmbed] })

    } catch (error) {
        message.reply({ embeds: [errorEmbed] });
    }

}

module.exports.help = {
    name: "adminhelp",
    category: "admin",
    discription: "Here you will find all admin commands."
}