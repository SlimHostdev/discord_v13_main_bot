const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const row = new discord.MessageActionRow().addComponents(

        new discord.MessageButton()
        .setCustomId("test")
        .setLabel("TEST")
        .setStyle("DANGER")
        .setDisabled(true),

        new discord.MessageButton()
        .setCustomId("test")
        .setLabel("TEST")
        .setStyle("LINK")
        .setURL("https://slimgame.nl")
        .setDisabled(true),

        new discord.MessageButton()
        .setCustomId("test")
        .setLabel("TEST")
        .setStyle("PRIMARY")
        .setDisabled(true),

        new discord.MessageButton()
        .setCustomId("test")
        .setLabel("TEST")
        .setStyle("SACONDARY")
        .setDisabled(true),

        new discord.MessageButton()
        .setCustomId("test")
        .setLabel("TEST")
        .setStyle("SUCCESS")
        .setDisabled(true)

    );

    message.channel.send({ content: "Test Message", components: [row] });

}

module.exports.help = {
    name: "buton",
    category: "add ons",
    discription: "Dist is an example code for buton addons."
}