const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const danger = new discord.MessageActionRow().addComponents(

        new discord.MessageButton()
        .setCustomId("test")
        .setLabel("TEST")
        .setStyle("DANGER")

    );

    message.channel.send({ content: "Test Message", Compoments: [danger] });

}

module.exports.help = {
    name: "buton",
    category: "add ons",
    discription: "Dist is an example code for buton addons."
}