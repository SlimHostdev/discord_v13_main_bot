const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("time-role")
    .setDescription("Assign a role to a user for a specific amount of time")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Select a user to assign the role to")
        .setRequired(true)
    )
    .addRoleOption((option) =>
      option
        .setName("role")
        .setDescription("Select the role to assign to the user")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("time")
        .setDescription("Time in seconds before the role is removed")
        .setRequired(true)
    ),

  async execute(interaction) {
    const member = interaction.options.getMember("user");
    const role = interaction.options.getRole("role");
    const time = interaction.options.getInteger("time") * 1000; // Convert time to milliseconds

    // Assign the role to the user
    if (member.roles.cache.has(role.id)) {
      return interaction.reply({
        content: `${member.displayName} already has the ${role.name} role!`,
        ephemeral: true,
      });
    } else {
      await member.roles.add(role).catch(console.error);
    }

    // Send a confirmation message
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
          .setDescription(
            `**${role.name}** role has been **added** to **${
              member.displayName
            }** for **${time / 1000} seconds**.`
          )
          .setColor("Green"),
      ],
      ephemeral: true,
    });

    // Set a timeout to remove the role after the specified time
    setTimeout(async () => {
      if (member.roles.cache.has(role.id)) {
        await member.roles.remove(role).catch(console.error);

        // Notify the user that the role has been removed
        await member
          .send({
            embeds: [
              new EmbedBuilder()
                .setDescription(
                  `Your **${role.name}** role has been **removed** after ${
                    time / 1000
                  } seconds.`
                )
                .setColor("Red"),
            ],
          })
          .catch(console.error); // Handle cases where the bot can't send a DM

        // Optionally, notify the channel where the command was executed
        await interaction.followUp({
          embeds: [
            new EmbedBuilder()
              .setDescription(
                `**${role.name}** role has been **removed** from **${member.displayName}**.`
              )
              .setColor("Red"),
          ],
          ephemeral: true, // This keeps the message private
        });
      }
    }, time);
  },
};
