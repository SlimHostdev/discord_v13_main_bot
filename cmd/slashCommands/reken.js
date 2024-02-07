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
            option.setName("operator")
                .setDescription("Het tweede nummer")
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName("nummer2")
                .setDescription("Het tweede nummer")
                .setRequired(true)
        ),
    async execute(client, interaction) {
        const nummer1 = interaction.options.getInteger('nummer1');
        const nummer2 = interaction.options.getInteger('nummer2');
        const operator = interaction.option.getInteger('operator');

        let uitkomst = reken(parseFloat(numer1), parseFloat(numer2) );
    
        function reken(num1, num2) {
            if(operator == `+`) return num1 + num2;
            else if (operator == `-`) return num1 - num2;
            else if (operator == `/`) return num1 / num2;
            else if (operator == `*`) return num1 * num2;
            else if (operator == `x`) return num1 * num2;
            else if (operator == `X`) return num1 * num2;
            else return console.log(`[${operator}] Is geen geldige operator mee gegeven dit kunnen zijn [+] of [-] of [/] of [*] of [x]`);
        }
         
        interaction.reply({
            content: `${uitkomst}`,
            ephemeral: true
        });
    }
}
