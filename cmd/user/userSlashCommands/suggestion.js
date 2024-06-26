const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const discord = require("discord.js");
// Bestandssysteem
const fs = require("fs");
//Setings of the addon
const suggestion = JSON.parse(
  fs.readFileSync(`./src/addons/suggestion.json`, "utf-8")
);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("suggestion")
    .setDescription("Hier mee kan je een suggestion stuuren.")
    .addStringOption((option) =>
      option
        .setName("suggestion_msg")
        .setDescription("De gewenste suggestion")
        .setRequired(true)
    ),

  async execute(client, interaction) {
    const { options } = interaction;
    const msg_suggestion = options.getString("suggestion_msg");

    const suggestionChannel = interaction.member.guild.channels.cache.get(
      suggestion.channel
    );

    if (!suggestionChannel)
      return interaction.reply(`${suggestion.no_channel}`);

    const Embed = new discord.MessageEmbed()
      .setTitle(`${suggestion.title} ${interaction.member.displayName}`)
      .setFooter(interaction.member.displayName, process.env.LOGO)
      .setColor(process.env.COLLOR)
      .setThumbnail(process.env.LOGO)
      .setImage(process.env.BANNER)
      .setTimestamp()
      .addField(`${suggestion.msg}`, `${msg_suggestion}`);

    const sucsesEmbed = new discord.MessageEmbed()
      .setTitle(`${suggestion.title} ${interaction.member.displayName}`)
      .setFooter(interaction.member.displayName, process.env.LOGO)
      .setColor(process.env.COLLOR)
      .setThumbnail(process.env.LOGO)
      .setImage(process.env.BANNER)
      .setTimestamp()
      .setFooter(`${suggestion.footer}`)
      .addField(` `, `Suggestion Send: ${suggestionChannel}`);

    interaction.reply({ embeds: [sucsesEmbed] });

    return suggestionChannel.send({ embeds: [Embed] }).then(async (msg) => {
      let reactions = ["✅", "❌"];

      // We gaan iedere reactie meegegeven onder de reactie en deze daar plaatsen.
      for (const reaction of reactions) {
        await msg.react(reaction);
      }
    });
  },
};
