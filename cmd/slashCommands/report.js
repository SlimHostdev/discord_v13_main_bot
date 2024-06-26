const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const discord = require("discord.js");
// Bestandssysteem
const fs = require("fs");
//Setings of the addon
const report = JSON.parse(fs.readFileSync(`./src/addons/report.json`, "utf-8"));

module.exports = {
  data: new SlashCommandBuilder()
    .setName("report")
    .setDescription("Hier mee kan je een report stuuren.")
    .addStringOption((option) =>
      option
        .setName("user")
        .setDescription("wie wil je reporten?")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reson")
        .setDescription("reden van report?")
        .setRequired(true)
    ),

  async execute(client, interaction) {
    // Check if interaction object and author ID are valid
    if (
      !interaction ||
      !interaction.member ||
      !interaction.member.user ||
      !interaction.member.user.id
    ) {
      console.error("Invalid interaction object or missing author ID.");
      return;
    }

    const authorID = interaction.member.user.id;

    // Extract user and msg_report options from interaction
    const userOption = interaction.options.getString("user");
    const userId = userOption.replace(/\D/g, ""); // Extracting the user ID from the mention or ID
    const msg_report = interaction.options.getString("reson");

    const reportChannel = interaction.member.guild.channels.cache.get(
      report.channel
    );
    const logChannel = interaction.member.guild.channels.cache.get(
      report.log_channel
    );

    if (!reportChannel) return interaction.reply(`${report.no_channel}`);

    const Embed = new discord.MessageEmbed()
      .setTitle(`${report.title} ${interaction.member.displayName}`)
      .setFooter(interaction.member.displayName, process.env.LOGO)
      .setColor(process.env.COLLOR)
      .setThumbnail(process.env.LOGO)
      .setImage(process.env.BANNER)
      .setTimestamp()
      .addField(`Report tegen:`, `<@${userId}>\n ID:\n ${userId}`)
      .addField(`Reden van report:`, `${msg_report}`);

    const sucsesEmbed = new discord.MessageEmbed()
      .setTitle(`Report`)
      .setFooter(interaction.member.displayName, process.env.LOGO)
      .setColor(process.env.COLLOR)
      .setThumbnail(process.env.LOGO)
      .setImage(process.env.BANNER)
      .setTimestamp()
      .setFooter(`${report.footer}`)
      .addField(` `, `report is Send to staf.`);

    interaction.reply({ embeds: [sucsesEmbed] });

    return (
      reportChannel.send({ embeds: [Embed] }) &&
      logChannel.send({ embeds: [Embed] })
    );
    /*
        return reportChannel.send({ embeds: [Embed] }).then(async msg => {
        
            let reactions = ["✅", "❌"];
        
            // We gaan iedere reactie meegegeven onder de reactie en deze daar plaatsen.
            for (const reaction of reactions) {
                await msg.react(reaction);
            }
        
        });
        */
  },
};
