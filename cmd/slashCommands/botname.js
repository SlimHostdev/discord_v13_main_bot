const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('botname')
        .setDescription('Stel de botname van de bot in.')
        .addStringOption(option =>
            option.setName('botname')
                .setDescription('De gewenste botname')
                .setRequired(true)),
    async execute(client, interaction) {
        const { options } = interaction;
        const botnameTxt = options.getString('botname');

        if (!interaction.member.roles.cache.has(process.env.ADMINROLL)) {
            return interaction.reply('Je hebt niet de vereiste rol om dit commando te gebruiken!');
        }

        await client.user.setUsername(`${botnameTxt}`);

        interaction.reply(`botname ingesteld als: ${botnameTxt}`);
    },
};
