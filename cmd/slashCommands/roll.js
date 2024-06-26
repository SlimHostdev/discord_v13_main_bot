const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const discord = require("discord.js");
// Bestandssysteem
const fs = require("fs");
//CMD Setings!
const setings = JSON.parse(fs.readFileSync(`./src/addons/roll.json`, "utf-8"));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roll")
    .setDescription(setings.cmd_disc),
  async execute(client, interaction) {
    // Controleren of de gebruiker een serverbeheerder is
    if (!interaction.member.permissions.has("ADMINISTRATOR")) {
      interaction.reply({ content: setings.cmd_no_admin, ephemeral: true });
      return;
    }

    //List of rolles
    const options = [
      {
        label: "Live Stream Meldingen",
        value: "655549793929789460",
        emoji: "📡",
      },
      {
        label: "Gamer Girl",
        value: "414786081959968770",
        emoji: "👱🏻‍♀️",
      },
    ];

    let rolcount = options.length;

    const row = new discord.MessageActionRow().addComponents(
      new discord.MessageSelectMenu()
        .setCustomId("rolle-menu")
        .setMinValues(0) //Minimum keuzes
        .setMaxValues(rolcount) //Maximum keuzes
        .setPlaceholder(setings.name)
        .addOptions(options)
    );

    var embed = new discord.MessageEmbed()
      .setTitle(setings.name)
      .setDescription(setings.disc)
      .addField(` `, `**${rolcount}** ` + setings.field)
      .setColor(process.env.COLLOR)
      .setThumbnail(process.env.LOGO)
      .setImage(process.env.BANNER)
      .setTimestamp()
      .setFooter(setings.name);

    interaction.reply({ embeds: [embed], components: [row] });
  },
};
