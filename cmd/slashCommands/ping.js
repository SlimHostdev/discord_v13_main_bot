const { SlashCommandBuilder } = require('@discordjs/builders');

const discord = require("discord.js");
//File server
const fs = require("fs");
//Taal van de bot
const language = JSON.parse(fs.readFileSync(`./language/${process.env.LANGUAGES}.json`, "utf-8"));

module.exports = {

    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription("Dit is een Test CMD."),
        async execute(client, interaction) {

            interaction.reply({content: `${language.Slashcmd_ping_msg} ${client.ws.ping} ms.`, ephemeral: true});

        }

}