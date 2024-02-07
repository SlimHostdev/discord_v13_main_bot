const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
 
module.exports = {
 
    data: new SlashCommandBuilder()
        .setName("reken")
        .setDescription("Geef je som op!")
        .addIntegerOption(option =>
            option.setName("nummer1")
                .setDescription("Het eerste nummer")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("operator")
                .setDescription("Operator. (+ or - or / or x)")
                .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName("nummer2")
                .setDescription("Het tweede nummer")
                .setRequired(true)
        ),
    async execute(client, interaction) {
        const numer1 = interaction.options.getInteger('nummer1');
        const numer2 = interaction.options.getInteger('nummer2');
        const operator = interaction.options.getString('operator');

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
         
        const embed = new MessageEmbed()
        .setTitle('Reken.')
        .setDescription(`<@${interaction.user.id}> ik heb je som uit ge rekend.`)
        .addField('De som was:', `${numer1} ${operator} ${numer2}`)
        .addField('Uitkomst:', `${uitkomst}`)
        .setColor(process.env.COLLOR)
        .setThumbnail(process.env.LOGO)
        .setImage(process.env.BANNER)
        .setTimestamp()
        .setFooter(`${language.cmd_ping_footer}`);

      interaction.reply({ embeds: [embed], ephemeral: true });
    }
}
