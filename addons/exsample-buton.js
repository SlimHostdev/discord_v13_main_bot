const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const row = new discord.MessageActionRow().addComponents(

        new discord.MessageButton()
        .setCustomId("test")
        .setLabel("TEST")
        .setStyle("DANGER"),

        new discord.MessageButton()
        .setCustomId("test2")
        .setLabel("TEST")
        .setStyle("PRIMARY"),

        new discord.MessageButton()
        .setCustomId("test3")
        .setLabel("TEST")
        .setStyle("SECONDARY"),

        new discord.MessageButton()
        .setLabel("SlimGame")
        .setStyle("LINK")
        .setURL("https://slimgame.nl")

    );

    message.channel.send({ content: "Test Message", components: [row] });

}

module.exports.help = {
    name: "buton",
    category: "add ons",
    discription: "Dist is an example code for buton addons."
}