const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

const discord = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("role-all")
    .setDescription("Add or remove a role from all members")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("add")
        .setDescription("Add a role to all members")
        .addRoleOption((option) =>
          option
            .setName("role")
            .setDescription("Select the role to add to all members")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("remove")
        .setDescription("Remove a role from all members")
        .addRoleOption((option) =>
          option
            .setName("role")
            .setDescription("Select the role to remove from all members")
            .setRequired(true)
        )
    ),

  async execute(interaction) {
    const role = interaction.options.getRole("role");
    const guild = interaction.guild; // Get the guild (server)
    const subcommand = interaction.options.getSubcommand();

    if (!interaction.member.permissions.has("ADMINISTRATOR")) {
      interaction.reply({ content: setings.cmd_no_admin, ephemeral: true });
      return;
    }

    let action, actionVerb, actionColor;

    if (subcommand === "add") {
      action = (member) => member.roles.add(role).catch(console.error);
      actionVerb = "added";
      actionColor = "Green";
    } else if (subcommand === "remove") {
      action = (member) => member.roles.remove(role).catch(console.error);
      actionVerb = "removed";
      actionColor = "Red";
    }

    let affectedCount = 0;

    await guild.members.fetch();
    guild.members.cache.forEach((member) => {
      if (
        (subcommand === "add" && !member.roles.cache.has(role.id)) ||
        (subcommand === "remove" && member.roles.cache.has(role.id))
      ) {
        action(member);
        affectedCount++;
      }
    });

    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(
            `**${role.name}** role has been **${actionVerb}** to/from **${affectedCount}** members.`
          )
          .setColor(actionColor),
      ],
    });
  },
};
