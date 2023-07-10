const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Toon de beschikbare commando\'s.'),
    async execute(client, interaction) {
        try {
            //Prefix oproepen uit .env
            var prefix = process.env.PREFFIX;

            //Main info
            var respons = "**Help Commands**\r\n\n";
            var general = "**__General__**\n";
            var info = "\n**__Info__**\n";
            var addons = "\n**__Addons Commands__**\n";

            //Discription
            var generald = `***__General  ${language.disc}__***\n`;
            var infod = `\n***__Info ${language.disc}__***\n`;
            var addonsd = `\n***___Addons ${language.disc}__***\n`;

            client.commands.forEach(command => {
                switch (command.help.category) {
                    case "general":
                        general += `${prefix} ${command.help.name}\r\n`;
                        generald += `${command.help.discription}\r\n`;
                        break;
                    case "info":
                        info += `${prefix} ${command.help.name}\r\n`;
                        infod += `${command.help.discription}\r\n`;
                        break;
                    case "add ons":
                        addons += `${prefix} ${command.help.name}\r\n`;
                        addonsd += `${command.help.discription}\r\n`;
                        break;
                }
            });

            //Main Embed
            var botEmbed = new discord.MessageEmbed()
                .setTitle(respons)
                .setDescription(`${language.cmd_help_disc}`)
                .setColor(process.env.COLLOR)
                .setThumbnail(process.env.LOGO)
                .setImage(process.env.BANNER)
                .setTimestamp()
                .setFooter(`${language.cmd_help_footer}`)
                .addField(info, infod)
                .addField(general, generald)
                .addField(addons, addonsd)

            botEmbed.setDescription("Dit is een voorbeeldbeschrijving voor de embed.")

            //Error Embed
            var errorEmbed = new discord.MessageEmbed()
                .setTitle(`${language.err_title}`)
                .setDescription(`${language.err_disc}`)
                .setColor(process.env.COLLOR)
                .setThumbnail(process.env.LOGO)
                .setImage(process.env.BANNER)
                .setTimestamp()
                .setFooter(`${language.cmd_help_footer}`)
                .addField(`${language.err_field1}`, `${language.err_field2}`)

            interaction.reply({ embeds: [botEmbed] }).then(msg => {
                setTimeout(() => msg.delete(), 10000);
            });
        } catch (error) {
            interaction.reply({ embeds: [errorEmbed] });
        }
    },
};
