const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription("Dit is een Test CMD."),
        async execute(client, interaction) {

            interaction.reply({content: `Pong ${client.ws.ping} ms.`, ephemeral: true});

        }

}