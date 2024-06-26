const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("botimg")
    .setDescription("Stel de botimg van de bot in.")
    .addStringOption((option) =>
      option
        .setName("botimg")
        .setDescription("De gewenste botimg")
        .setRequired(true)
    ),
  async execute(client, interaction) {
    const { options } = interaction;
    const botimgTxt = options.getString("botimg");

    if (!interaction.member.roles.cache.has(process.env.ADMINROLL)) {
      return interaction.reply(
        "Je hebt niet de vereiste rol om dit commando te gebruiken!"
      );
    }

    await client.user.setAvatar(`${botimgTxt}`);

    interaction.reply(`botimg ingesteld als: ${botimgTxt}`);
  },
};
