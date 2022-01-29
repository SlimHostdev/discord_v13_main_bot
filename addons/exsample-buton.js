const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const danger = discord.MessageActionRow().addCompoments(

        new discord.MessageButton()
        .setCustomId("test")
        .setLabel("TEST")
        .setStyle("DANGER")

    );

    const link = discord.MessageActionRow().addCompoments(

        new discord.MessageButton()
        .setCustomId("test")
        .setLabel("TEST")
        .setStyle("LINK")
        .setURL("https://slimgame.nl")

    );

    const primary = discord.MessageActionRow().addCompoments(

        new discord.MessageButton()
        .setCustomId("test")
        .setLabel("TEST")
        .setStyle("PRIMARY")

    );

    const sacondary = discord.MessageActionRow().addCompoments(

        new discord.MessageButton()
        .setCustomId("test")
        .setLabel("TEST")
        .setStyle("SACONDARY")

    );

    const success = discord.MessageActionRow().addCompoments(

        new discord.MessageButton()
        .setCustomId("test")
        .setLabel("TEST")
        .setStyle("SUCCESS")

    );

    message.channel.send({ content: "Test Message", Compoments: [danger, link, primary, sacondary, success] });

}

module.exports.help = {
    name: "buton",
    category: "add ons",
    discription: "Dist is an example code for buton addons."
}