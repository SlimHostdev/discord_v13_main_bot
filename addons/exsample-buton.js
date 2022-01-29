const discord = require("discord.js");

module.exports.run = async (client, message, args) => {

    const danger = new discord.MessageActionRow().addComponents(

        new discord.MessageButton()
        .setCustomId("test")
        .setLabel("TEST")
        .setStyle("DANGER")
    
    );
    
    const link = new discord.MessageActionRow().addComponents(
    
        new discord.MessageButton()
        .setCustomId("test")
        .setLabel("TEST")
        .setStyle("LINK")
        .setURL("https://slimgame.nl")
    
    );
    
    const primary = new discord.MessageActionRow().addComponents(
    
        new discord.MessageButton()
        .setCustomId("test")
        .setLabel("TEST")
        .setStyle("PRIMARY")
    
    );
    
    const sacondary = new discord.MessageActionRow().addComponents(
    
        new discord.MessageButton()
        .setCustomId("test")
        .setLabel("TEST")
        .setStyle("SACONDARY")
    
    );
    
    const success = new discord.MessageActionRow().addComponents(
    
        new discord.MessageButton()
        .setCustomId("test")
        .setLabel("TEST")
        .setStyle("SUCCESS")
    
    );

    message.channel.send({ content: "Test Message", components: [danger] });

}

module.exports.help = {
    name: "buton",
    category: "add ons",
    discription: "Dist is an example code for buton addons."
}