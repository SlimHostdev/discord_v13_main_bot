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

const cmdName = "ping"; // Verander dit naar het naam van je commando.

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`${cmdName}`)
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
        `${cmdName} cmd is gedaan door [ USER: ${cmdUserName} ID: ${cmdUserId}]`
      );
    });
  },
};

module.exports.help = {
  name: cmdName,
  category: "admin",
  description: language.cmd_ping_disc,
};

// Het commando is nu geïmplementeerd in Discord.js v13.
