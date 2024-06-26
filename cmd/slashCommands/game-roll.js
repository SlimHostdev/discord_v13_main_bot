const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const discord = require("discord.js");
// Bestandssysteem
const fs = require("fs");
//CMD Setings!
const setings = JSON.parse(
  fs.readFileSync(`./src/addons/game-roll.json`, "utf-8")
);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("game-roll")
    .setDescription(setings.cmd_disc),
  async execute(client, interaction) {
    // Controleren of de gebruiker een serverbeheerder is
    if (!interaction.member.permissions.has("ADMINISTRATOR")) {
      interaction.reply({ content: setings.cmd_no_admin, ephemeral: true });
      return;
    }

    //List of collor rolles
    const options = [
      {
        label: "Call Of Duty",
        value: "766054238991286292",
        emoji: "🎮",
      },
      {
        label: "GTA V Roleplay",
        value: "682940180994588737",
        emoji: "🎮",
      },
      {
        label: "Minecraft",
        value: "767380986190102539",
        emoji: "🎮",
      },
      {
        label: "Phasmophobia",
        value: "769589830166118430",
        emoji: "🎮",
      },
      {
        label: "Hytale",
        value: "768845353431859230",
        emoji: "🎮",
      },
      {
        label: "Rockt League",
        value: "768846094524219432",
        emoji: "🎮",
      },
      {
        label: "ARK",
        value: "768845937422368813",
        emoji: "🎮",
      },
      {
        label: "Sker Ritual",
        value: "1232976909009424505",
        emoji: "🎮",
      },
      {
        label: "Destiny",
        value: "1242444366245527564",
        emoji: "🎮",
      },
    ];

    let rolcount = options.length;

    const row = new discord.MessageActionRow().addComponents(
      new discord.MessageSelectMenu()
        .setCustomId("game-roll-menu")
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
