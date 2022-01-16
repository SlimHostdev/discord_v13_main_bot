const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    var botEmbed = new discord.MessageEmbed()
        .setTitle("Server Regels command")
        .setDescription("Hier vindje veel info over de server regels")
        .setColor(process.env.COLLOR)
        .setThumbnail(process.env.LOGO)
        //.setImage(''process.env.INFO'')
        .setTimestamp()
        .setFooter("serverregels command")
        .addFields(
            { name: "De volgende regels zijn voor iedereen:", value: "Als je iets ziet dat in strijd is met de regels of iets waarvan jij een onveilig gevoel krijgt, laat het de leiding dan weten. We willen dat iedereen zich welkom voelt op deze server." },
            { name: "Behandel iedereen met respect.", value: "Geen enkele vorm van lastigvallen, heksenjachten, seksisme, racisme of haatuitingen wordt getolereerd." },
            { name: "Plaats geen spam of zelfpromotie", value: "(serveruitnodigingen, advertenties, enz.) zonder toestemming van de leiding. Hieronder valt ook het sturen van privéberichten naar andere leden." },
            { name: "Bot commando's", value: "Bot commando's." },
            { name: "!! LET OP !!", value: "Het is mogelijk dat je stem woord OPGENOMEN / GESTREAMT woord. (wij zijn hier niet vrand wordelijk voor)." },
        )

    return message.channel.send({ embeds: [botEmbed] });

}

module.exports.help = {
    name: "serverregels",
    category: "info",
    discription: "Hier vindje veel info over de server regels."
}