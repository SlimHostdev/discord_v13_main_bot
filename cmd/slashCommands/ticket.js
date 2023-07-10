const { SlashCommandBuilder } = require('@discordjs/builders');
const { Permissions } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ticket')
    .setDescription('Maakt een supportticket aan.'),
  async execute(interaction) {
    // Controleren of de gebruiker de categorie kan beheren
    const categoryPermissions = interaction.guild.roles.cache
      .find(role => role.id === `${process.env.TICKETSTAFF}`)
      .permissions
      .has(Permissions.FLAGS.MANAGE_CHANNELS);
    
    if (!categoryPermissions) {
      return await interaction.reply('Je hebt geen toestemming om een kanaal in deze categorie te maken.');
    }

    // Ticketkanaal maken
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
          deny: [Permissions.FLAGS.VIEW_CHANNEL],
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
