const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick a member from the server.')
    .addUserOption(option =>
      option.setName('member')
        .setDescription('The member you want to kick.')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('reason')
        .setDescription('The reason for the kick.')
        .setRequired(false)
    ),
  async execute(interaction) {
    const memberToKick = interaction.options.getMember('member');
    const reason = interaction.options.getString('reason') || 'No reason provided.';

    if (!interaction.member.permissions.has('KICK_MEMBERS')) {
      interaction.reply('You do not have permission to kick members.');
      return;
    }

    if (!memberToKick) {
      interaction.reply('You need to specify a member to kick.');
      return;
    }

    const member = interaction.guild.members.cache.get(memberToKick.id);
    if (!member.kickable) {
      interaction.reply('I cannot kick this member. Please check my permissions and role hierarchy.');
      return;
    }

    await member.kick(reason);

    const embed = new MessageEmbed()
      .setTitle('Member Kicked')
      .setDescription(`The member ${memberToKick.user.tag} has been kicked from the server.`)
      .addField('Kicked by', interaction.user.tag)
      .addField('Reason', reason)
      .setColor('#FF0000');

    await interaction.reply({ embeds: [embed] });
  },
};
