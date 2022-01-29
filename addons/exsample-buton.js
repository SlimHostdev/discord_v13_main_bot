const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const danger = new discord.MessageActionRow().addComponents(

        new discord.MessageButton()
        .setCustomId("test")
        .setLabel("TEST")
        .setStyle("DANGER")
        .setDisabled(true)
    
    );
    
    const link = new discord.MessageActionRow().addComponents(
    
        new discord.MessageButton()
        .setCustomId("test")
        .setLabel("TEST")
        .setStyle("LINK")
        .setURL("https://slimgame.nl")
        .setDisabled(true)
    
    );
    
    const primary = new discord.MessageActionRow().addComponents(
    
        new discord.MessageButton()
        .setCustomId("test")
        .setLabel("TEST")
        .setStyle("PRIMARY")
        .setDisabled(true)
    
    );
    
    const sacondary = new discord.MessageActionRow().addComponents(
    
        new discord.MessageButton()
        .setCustomId("test")
        .setLabel("TEST")
        .setStyle("SACONDARY")
        .setDisabled(true)
    
    );
    
    const success = new discord.MessageActionRow().addComponents(
    
        new discord.MessageButton()
        .setCustomId("test")
        .setLabel("TEST")
        .setStyle("SUCCESS")
        .setDisabled(true)
    
    );

    message.channel.send({ content: "Test Message", components: [danger] });

}

module.exports.help = {
    name: "buton",
    category: "add ons",
    discription: "Dist is an example code for buton addons."
}