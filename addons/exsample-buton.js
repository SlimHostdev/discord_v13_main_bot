const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const row = new discord.MessageActionRow().addComponents(

        new discord.MessageButton()
        .setCustomId("test")
        .setLabel("TEST")
        .setStyle("DANGER")
        .setDisabled(true),

        new discord.MessageButton()
        .setCustomId("test2")
        .setLabel("TEST")
        .setStyle("LINK")
        .setDisabled(true),

        new discord.MessageButton()
        .setCustomId("test3")
        .setLabel("TEST")
        .setStyle("PRIMARY")
        .setDisabled(true),

        new discord.MessageButton()
        .setCustomId("test4")
        .setLabel("TEST")
        .setStyle("SACONDARY")
        .setDisabled(true)

    );

    message.channel.send({ content: "Test Message", components: [row] });

}

module.exports.help = {
    name: "buton",
    category: "add ons",
    discription: "Dist is an example code for buton addons."
}