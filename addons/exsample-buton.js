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

    // We maken een filter aan die nakijkt als het dezelfde gebruiker 
    // is die het bericht heeft aangemaakt.
    const filter = (interaction) => {
        if (interaction.user.id === message.author.id) return true;
        return interaction.reply("You can't use this.");
    }
 
    // We maken een component collector aan die er voor zal zorgen dat we de knoppen kunnen opvangen.
    // We voegen de filter er aan toe en geven mee dat men enkel maar max één knop kan indrukken.
    const collector = message.channel.createMessageComponentCollector({
        filter,
        max: 1
    });
 
    // Als men een knop heeft ingdrukt zal dit worden opgeroepen.
    // Deze zal de CustomID ophalen van de knop en hier kan men deze dan
    // gaan vergelijken in eventueel een switch case om zo een desbtreffende actie te doen.
    collector.on("collect", (interactionButton) => {
 
        const id = interactionButton.customId;
 
        switch (id) {
            case "test":
                return interactionButton.reply("This is the test button");
            case "test2":
                return interactionButton.reply("This is the test button");
            case "test3":
                return interactionButton.reply("This is the test button");
            case "test4":
                return interactionButton.reply("This is the test button");
            default:
                return interactionButton.reply("This button has no functionality yet.");
        }
    });

}

module.exports.help = {
    name: "buton",
    category: "add ons",
    discription: "Dist is an example code for buton addons."
}