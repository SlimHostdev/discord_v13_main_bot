const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Stel de status van de bot in.")
    .addStringOption((option) =>
      option
        .setName("status")
        .setDescription("De gewenste status")
        .setRequired(true)
    ),
  async execute(client, interaction) {
    const { options } = interaction;
    const statusTxt = options.getString("status");

    if (!interaction.member.roles.cache.has(process.env.ADMINROLL)) {
      return interaction.reply(
        "Je hebt niet de vereiste rol om dit commando te gebruiken!"
      );
    }

    await client.user.setPresence({
      status: "dnd",
      activities: [
        {
          name: statusTxt,
        },
      ],
    });

    interaction.reply(`Status ingesteld als: ${statusTxt}`);
  },
};
