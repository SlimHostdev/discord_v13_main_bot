const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const options = [
        {
            label: "Name",
            value: "Roll ID",
            discription: "Item Discription",
            emoji: "🟥"
        }
    ];

    const row = new discord.MessageActionRow()
        .addComponents(
            new discord.MessageSelectMenu()
                .setCustomId("dropdown")
                .setMinValue(0) //Minimum keuzes
                .setMaxValue(1) //Maximum keuzes
                .setPlaceholder("Maak een keuze.")
                .addOptions(options)
        );

    return message.channel.send( {content: "Maak een keuze", components: [row]} );

}

module.exports.help = {
    name: "dropdown",
    category: "add ons",
    discription: "Dist is an example code for dropdown menu."
}