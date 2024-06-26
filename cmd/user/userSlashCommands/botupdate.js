const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("botupdate")
    .setDescription("Stel de status naam en afbeelding van de bot in.")
    .addStringOption((option) =>
      option
        .setName("status")
        .setDescription("De gewenste status")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("botname")
        .setDescription("De gewenste botname")
        .setRequired(false)
    )
    .addStringOption((option) =>
      option
        .setName("botimg")
        .setDescription("De gewenste botimg")
        .setRequired(false)
    ),

  async execute(client, interaction) {
    const statusTxt = interaction.options.getString("status") || "NONE STATUS";
    const botnameTxt = interaction.options.getString("botname") || "NONE NAME";
    const botimgTxt = interaction.options.getString("botimg") || "NONE IMG";

    if (!interaction.member.roles.cache.has(process.env.ADMINROLL)) {
      return interaction.reply(
        "Je hebt niet de vereiste rol om dit commando te gebruiken!"
      );
    }

    if (statusTxt == "NONE STATUS") {
    } else {
      await client.user.setPresence({
        status: "dnd",
        activities: [
          {
            name: statusTxt,
          },
        ],
      });
    }

    if (botnameTxt == "NONE NAME") {
    } else {
      await client.user.setUsername(`${botnameTxt}`);
    }

    if (botimgTxt == "NONE IMG") {
    } else {
      await client.user.setAvatar(`${botimgTxt}`);
    }

    interaction.reply(`Alles is aangepast ✅`);
  },
};
