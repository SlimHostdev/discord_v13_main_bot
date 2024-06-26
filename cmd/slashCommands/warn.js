const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const fs = require("fs");
const language = JSON.parse(fs.readFileSync(`./language/${process.env.LANGUAGES}.json`, "utf-8"));

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('Waarschuw een gebruiker.')
        .addStringOption(option =>
            option.setName("user")
                .setDescription("user name")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('reden')
                .setDescription('De reden voor de waarschuwing')
                .setRequired(true)
        ),
    async execute(client, interaction) {
        // Check if interaction object and author ID are valid
        if (!interaction || !interaction.member || !interaction.member.user || !interaction.member.user.id) {
            console.error("Invalid interaction object or missing author ID.");
            return;
        }

        // Controleren of de gebruiker een serverbeheerder is
        if (!interaction.member.roles.cache.has(`${process.env.ADMINROLL}`)) {
            interaction.reply({ content: 'Alleen serverbeheerders kunnen dit commando gebruiken!', ephemeral: true });
            return;
        }

        const { options } = interaction;

        const authorID = interaction.member.user.id;

        const userOption = interaction.options.getString('user');
        const warnUserId = userOption.replace(/\D/g, ''); // Extracting the user ID from the mention or ID
        const reason = options.getString('reden');

        // Voer de rest van de logica uit voor het waarschuwen van de gebruiker
        //if (warnUserId.roles.cache.has(`${process.env.ADMINROLL}`)) return interaction.reply(`${language.cmd_warn_cant_warn_admin}`);

        const warns = JSON.parse(fs.readFileSync("./src/data/warnings.json", "UTF8"));

        if (!warns[warnUserId]) warns[warnUserId] = {
            warns: 0
        }

        warns[warnUserId].warns++;

        const Embed = new MessageEmbed()
        .setColor(process.env.WARNCOLLOR)
        .setThumbnail(process.env.LOGO)
        .setImage(process.env.BANNER)
        .setFooter(interaction.member.displayName, interaction.member.displayAvatarURL)
        .setTimestamp()
        .setDescription(`**${language.cmd_warn_warn}** <@${warnUserId}> (${warnUserId})
        **${language.cmd_warn_reason}** ${reason}`)
        .addField(`${language.cmd_warn_number_warn} `, warns[warnUserId].warns.toString());

        interaction.reply({ embeds: [Embed], ephemeral: true });

        //interaction.reply(`Gebruiker <@${warnUserId}> is gewaarschuwd. Reden: ${reason}`);
    
        var warnEmbed = new discord.MessageEmbed()
        .setColor(process.env.WARNCOLLOR)
        .setThumbnail(process.env.LOGO)
        .setImage(process.env.BANNER)
        .setFooter(interaction.member.displayName, interaction.author.displayAvatarURL)
        .setTimestamp()
        .setDescription(`**${language.cmd_warn_warn}** <@${warnUserId}> (${warnUserId})
        **${language.cmd_warn_by}** ${interaction.author}
        **${language.cmd_warn_reason}** ${reason}`)
        .addField(`${language.cmd_warn_number_warn} `, warns[warnUserId].warns.toString());

        const channel = interaction.member.guild.channels.cache.get(`${process.env.MODCHAT}`);

        if (!channel) return;

        channel.send({ embeds: [warnEmbed] });

        if (warns[warnUserId].warns == 3) {

            var mes = new discord.MessageEmbed()
                .setThumbnail(process.env.LOGO)
                .setImage(process.env.BANNER)
                .setDescription(`${language.cmd_warn_watch_out} ` + userOption.user.username)
                .setColor(process.env.WARNCOLLOR)
                .setFooter(interaction.member.displayName, interaction.author.displayAvatarURL)
                .addField(`${language.cmd_warn_msg}`, `${language.cmd_warn_one_more}`);
    
            interaction.channel.send({ embeds: [mes] });
    
        } else if (warns[warnUserId].warns == 4) {
    
            interaction.guild.members.ban(userOption, { reason: reason });
            interaction.channel.send(`${userOption} ${language.cmd_warn_ban}`);
    
            var banEmbed = new discord.MessageEmbed()
                .setThumbnail(process.env.LOGO)
                .setImage(process.env.BANNER)
                .setColor(process.env.BANCOLLOR)
                .setFooter(interaction.member.displayName, interaction.author.displayAvatarURL)
                .setTimestamp()
                .setDescription(`**${language.cmd_ban_banned_disc}** <@${warnUserId}> (${warnUserId})
            **${language.cmd_ban_banned_reason}** ${language.cmd_warn_ban}`)
                .addField(`${language.cmd_warn_number_warn}`, warns[warnUserId].warns.toString());
    
            const banchannel = interaction.member.guild.channels.cache.get(`${process.env.ADMINLOGS}`);
    
            if (!banchannel) return;
    
            banchannel.send({ embeds: [banEmbed] });
    
        }
    
        fs.writeFile("./src/data/warnings.json", JSON.stringify(warns), (err) => {
            if (err) console.log(err);
        });
    

    },
};
