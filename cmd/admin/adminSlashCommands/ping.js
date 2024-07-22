const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const discord = require("discord.js");
// Bestandssysteem
const fs = require("fs");
// Taal van de bot
const language = JSON.parse(
  fs.readFileSync(`./language/${process.env.LANGUAGES}.json`, "utf-8")
);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Dit is een Test CMD."),
  async execute(client, interaction) {
    // Controleren of de gebruiker een serverbeheerder is
    if (!interaction.member.permissions.has("ADMINISTRATOR")) {
      interaction.reply({
        content: "Alleen serverbeheerders kunnen dit commando gebruiken!",
        ephemeral: true,
      });
      return;
    }

    const embed = new MessageEmbed()
      .setTitle(`${language.cmd_ping_title}`)
      .setDescription(`${language.Slashcmd_ping_msg} ${client.ws.ping} ms.`)
      .setColor(process.env.COLLOR)
      .setThumbnail(process.env.LOGO)
      .setImage(process.env.BANNER)
      .setTimestamp()
      .setFooter(`${language.cmd_ping_footer}`);

    interaction.reply({ embeds: [embed], ephemeral: true }).then((ms) => {
      console.log(`Ping command is gebruikt [ ${client.ws.ping}ms ]`);
    });
  },
};
