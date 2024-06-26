const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick een lid van de server.")
    .addUserOption((option) =>
      option
        .setName("lid")
        .setDescription("Het lid dat je wilt kicken.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("reden")
        .setDescription("De reden voor de kick.")
        .setRequired(false)
    ),
  async execute(interaction) {
    const memberToKick = interaction.options.getMember("lid");
    const reason =
      interaction.options.getString("reden") || "Geen reden opgegeven.";

    if (!interaction.member.permissions.has("KICK_MEMBERS")) {
      await interaction.reply("Je hebt geen toestemming om leden te kicken.");
      return;
    }

    if (!memberToKick) {
      await interaction.reply("Je moet een lid noemen om hem te kicken.");
      return;
    }

    if (!memberToKick.kickable) {
      await interaction.reply(
        "Ik kan dit lid niet kicken. Controleer mijn rechten en volgorde in de serverinstellingen."
      );
      return;
    }

    await memberToKick.kick(reason);

    const embed = new MessageEmbed()
      .setTitle("Lid Gekickt")
      .setDescription(
        `Het lid ${memberToKick.user.tag} is gekickt uit de server.`
      )
      .addField("Gekickt door", interaction.user.tag)
      .addField("Reden", reason)
      .setColor("#FF0000");

    await interaction.reply({ embeds: [embed] });
  },
};
