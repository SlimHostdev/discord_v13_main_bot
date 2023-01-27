const { SlashCommandBuilder } = require('@discordjs/builders');
 
module.exports = {
 
    data: new SlashCommandBuilder()
        .setName("reken")
        .setDescription("Geef twee cijvers mee.")
        .addIntegerOption(option =>
            option.setName("nummer1")
                .setDescription("Het eerste nummer")
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName("nummer2")
                .setDescription("Het tweede nummer")
                .setRequired(true)
        ),
    async execute(client, interaction) {
        const num1 = interaction.options.getInteger('nummer1');
        const num2 = interaction.options.getInteger('nummer2');
        interaction.reply({
            content: `${num1 + num2}`,
            ephemeral: true
        });
    }
}