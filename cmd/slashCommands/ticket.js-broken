const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('Maakt een supportticket aan.'),
  async execute(interaction) {
    const category = interaction.guild.channels.cache.find(channel => channel.name === 'Support Tickets' && channel.type === 'GUILD_CATEGORY');
    if (!category) {
      return await interaction.reply('Categorie "Support Tickets" niet gevonden.');
    }

    const channel = await interaction.guild.channels.create('Ticket', {
      type: 'GUILD_TEXT',
      parent: category.id,
      permissionOverwrites: [
        {
          id: interaction.guild.roles.everyone,
          allow: [Permissions.FLAGS.VIEW_CHANNEL],
        },
        {
          id: interaction.member,
          allow: [Permissions.FLAGS.VIEW_CHANNEL],
        },
      ],
    });

    await interaction.reply(`Supportticket aangemaakt in ${channel}.`);
  },
};
