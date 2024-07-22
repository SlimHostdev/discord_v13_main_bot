const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const log = require("../../../src/function/log/util");

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
      .setDescription(`${language.cmd_ping_disc}`)
      .setColor(process.env.COLLOR)
      .setThumbnail(process.env.LOGO)
      .setImage(process.env.BANNER)
      .setTimestamp()
      .setFooter(`${language.cmd_ping_footer}`)
      .addFields(
        { name: `${language.cmd_ping_name}`, value: `${client.user.name}` },
        {
          name: `${language.cmd_ping_latency}`,
          value: `${client.ws.ping}ms`,
        }
      );

    interaction.reply({ embeds: [embed], ephemeral: true }).then((ms) => {
      let cmdUserName = interaction.user.tag;
      let cmdUserId = interaction.user.id;
      log.info(
        `Ping cmd is gedaan door [ USER: ${cmdUserName} ID: ${cmdUserId}] de bot heeft [ ${client.ws.ping}ms ] ping!`
      );
    });
  },
};
