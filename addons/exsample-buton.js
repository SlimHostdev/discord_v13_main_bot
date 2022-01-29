const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const row = new discord.MessageActionRow().addComponents(

        new discord.MessageButton()
        .setCustomId("test")
        .setLabel("DANGER")
        .setStyle("DANGER")
        .setEmoji("⚠️"),

        new discord.MessageButton()
        .setCustomId("test2")
        .setLabel("PRIMARY")
        .setStyle("PRIMARY")
        .setEmoji("😊"),

        new discord.MessageButton()
        .setCustomId("test3")
        .setLabel("SECONDARY")
        .setStyle("SECONDARY")
        .setEmoji("🆘"),

        new discord.MessageButton()
        .setCustomId("test4")
        .setLabel("SUCCESS")
        .setStyle("SUCCESS")
        .setEmoji("✅"),

        new discord.MessageButton()
        .setLabel("LINK")
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