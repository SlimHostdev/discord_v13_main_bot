const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    if (!message.member.roles.cache.has(`${process.env.ADMINROLL}`)) return message.reply("Je Bend Geen ADMIN dus je kan dit niet doen.");

    try {

        //Prefix oproepen uit .env
        var prefix = process.env.PREFFIX;

        var respons = "**Admin Help Commands**\r\n\n";
        var admin = "\n**__Admin__**\n";
        var admind = "\n***__Admin  Beschijvinge__***\n";


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
            .setDescription("Hier vindje veel info van de bot")
            .setColor(process.env.COLLOR)
            .setThumbnail(process.env.LOGO)
            .setTimestamp()
            .setFooter("adminhelp command")
            .addField(admin, admind)

        var errorEmbed = new discord.MessageEmbed()
            .setTitle("ERROR")
            .setDescription("OEPS!!")
            .setColor(process.env.COLLOR)
            .setThumbnail(process.env.LOGO)
            .setTimestamp()
            .setFooter("help command")
            .addField("Er gaat iets fout ge gaan", " probeer het laater opnieuw.")

        message.author.send({ embeds: [botEmbed] })

    } catch (error) {
        message.reply({ embeds: [errorEmbed] });
    }

}

module.exports.help = {
    name: "adminhelp",
    category: "admin",
    discription: "Hier Vind je alle admin commandos."
}