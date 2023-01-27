const { SlashCommandBuilder } = require('@discordjs/builder');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('ping')
        .setDiscription(language.cmd_ping_disc),
        async execute(client, interaction){

            interaction.reply({content: `Pong ${client.ws.ping} ms.`, ephemeral: true});

        }

}