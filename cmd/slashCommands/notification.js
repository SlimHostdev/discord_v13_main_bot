const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const discord = require("discord.js");
// Bestandssysteem
const fs = require("fs");
//Setings of the addon
const notification = JSON.parse(
  fs.readFileSync(`./src/addons/notification.json`, "utf-8")
);

module.exports = {
  data: new SlashCommandBuilder()
    .setName("notification")
    .setDescription("Hier mee kan je een notification stuuren.")
    .addStringOption((option) =>
      option
        .setName("notification_msg")
        .setDescription("De gewenste notification")
        .setRequired(true)
    ),

  async execute(client, interaction) {
    // Controleren of de gebruiker een serverbeheerder is
    if (!interaction.member.permissions.has("ADMINISTRATOR")) {
      interaction.reply({
        content: "Alleen serverbeheerders kunnen dit commando gebruiken!",
        ephemeral: true,
      });
      return;
    }

    const { options } = interaction;
    const msg_notification = options.getString("notification_msg");

    const notificationChannel = interaction.member.guild.channels.cache.get(
      notification.channel
    );

    if (!notificationChannel)
      return interaction.reply(`${notification.no_channel}`);

    const Embed = new discord.MessageEmbed()
      .setTitle(`${notification.title} ${interaction.member.displayName}`)
      .setFooter(interaction.member.displayName, process.env.LOGO)
      .setColor(process.env.COLLOR)
      .setThumbnail(process.env.LOGO)
      .setImage(process.env.BANNER)
      .setTimestamp()
      .addField(`${notification.msg}`, `${msg_notification}`);

    const sucsesEmbed = new discord.MessageEmbed()
      .setTitle(`${notification.title} ${interaction.member.displayName}`)
      .setFooter(interaction.member.displayName, process.env.LOGO)
      .setColor(process.env.COLLOR)
      .setThumbnail(process.env.LOGO)
      .setImage(process.env.BANNER)
      .setTimestamp()
      .setFooter(`${notification.footer}`)
      .addField(` `, `notification Send: ${notificationChannel}`);

    interaction.reply({ embeds: [sucsesEmbed] });

    return notificationChannel.send({ embeds: [Embed] });
    /*
        return notificationChannel.send({ embeds: [Embed] }).then(async msg => {
        
            let reactions = ["✅", "❌"];
        
            // We gaan iedere reactie meegegeven onder de reactie en deze daar plaatsen.
            for (const reaction of reactions) {
                await msg.react(reaction);
            }
        
        });
        */
  },
};
