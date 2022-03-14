const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const options = [
        {
            label: "Red",
            value: "774409433597345833",
            discription: "Bekom Red collor.",
            emoji: "🟥"
        },
        {
            label: "Blue",
            value: "774410190845247508",
            discription: "Bekom Blue collor.",
            emoji: "🟦"
        }
    ];

    const row = new discord.MessageActionRow()
        .addComponents(
            new discord.MessageSelectMenu()
                .setCustomId("dropdown")
                .setMinValues(0) //Minimum keuzes
                .setMaxValues(1) //Maximum keuzes
                .setPlaceholder("make a choice.")
                .addOptions(options)
        );

    var botEmbed = new discord.MessageEmbed()
        .setTitle("make a choice !!!!!!")
        .setDescription("Make a choice with the dropdown menu.")
        .setColor(process.env.COLLOR)
        .setThumbnail(process.env.LOGO)
        .setImage(process.env.BANNER)
        .setTimestamp()
        .setFooter("dropdown addon command")

    return message.channel.send({ embeds: [botEmbed], components: [row] }).then(msg => {
        message.delete()
    });

}

module.exports.help = {
    name: "dropdown",
    category: "add ons",
    discription: "Dist is an example code for dropdown menu."
}