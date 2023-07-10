const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Waarschuw een gebruiker.')
        .addUserOption(option =>
            option.setName('gebruiker')
                .setDescription('De gebruiker die gewaarschuwd moet worden')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('reden')
                .setDescription('De reden voor de waarschuwing')
                .setRequired(true)),
    async execute(client, interaction) {
        const { options } = interaction;
        const warnUser = options.getUser('gebruiker');
        const reason = options.getString('reden');

        if (!interaction.member.roles.cache.has(process.env.ADMINROLL)) {
            return interaction.reply('Je hebt niet de vereiste rol om dit commando te gebruiken!');
        }

        // Voer de rest van de logica uit voor het waarschuwen van de gebruiker

        interaction.reply(`Gebruiker ${warnUser.username} is gewaarschuwd. Reden: ${reason}`);
    },
};
