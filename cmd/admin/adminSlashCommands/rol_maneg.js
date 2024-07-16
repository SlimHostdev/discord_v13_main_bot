const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  WebhookClient,
} = require("discord.js");
const fs = require("fs");

const setings = JSON.parse(
  fs.readFileSync(`./src/rol-setings/main.json`, "utf-8")
);
const languages = setings.languages;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rol_maneg")
    .setDescription("Met dit kan je een job rol geven!")
    .addStringOption((option) =>
      option.setName("user").setDescription("user name").setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("roll").setDescription("kies de roll").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("choice")
        .setDescription("give or remove")
        .setRequired(true)
    ),
  async execute(client, interaction) {
    // Check if interaction object and author ID are valid
    if (
      !interaction ||
      !interaction.member ||
      !interaction.member.user ||
      !interaction.member.user.id
    ) {
      console.error("Invalid interaction object or missing author ID.");
      return;
    }

    const authorID = interaction.member.user.id;

    // Extract user and choice options from interaction
    const userOption = interaction.options.getString("user");
    const userId = userOption.replace(/\D/g, ""); // Extracting the user ID from the mention or ID
    const job = interaction.options.getString("job");
    const choice = interaction.options.getString("choice");

    // Function to convert jobe to integer
    const getJob = (job) => {
      job = job.toLowerCase();
      switch (job) {
        case "staf":
          return 1;
        case "hoofdstaf":
          return 2;
        default:
          return 0;
      }
    };

    // Function to convert choice to integer
    const getChoice = (choice) => {
      choice = choice.toLowerCase();
      switch (choice) {
        case "give":
          return 1;
        case "remove":
          return 2;
        default:
          return 0;
      }
    };

    // Fetch the main user based on the provided user ID
    const mainUser = await interaction.guild.members
      .fetch(userId)
      .catch(() => null);
    if (!mainUser) {
      await interaction.reply(`${languages.cant_find_user}`);
      return;
    }

    let mainChoice = getChoice(choice);
    let job_id = getJob(job);

    let webhookLog = new WebhookClient({ url: setings.log_chanel_webhook });

    const JobeId = (job_id) => {
      switch (job_id) {
        case 1:
          return (job_id = JSON.parse(
            fs.readFileSync(`./src/rol-setings/rolle/staf.json`, "utf-8")
          ));
        case 2:
          return (job_id = JSON.parse(
            fs.readFileSync(`./src/rol-setings/rolle/hooft_staf.json`, "utf-8")
          ));
        default:
          return 0;
      }
    };

    //webhookLog = job_id.log_chanel_webhook;

    main_job_id = JobeId(job_id);
    let job_languages = main_job_id.languages;

    if (main_job_id === 0) {
      return interaction.reply({
        content: `${languages.mising_job}`,
        ephemeral: true,
      });
    }

    // Create embeds and buttons
    const embedGivePrompt = new MessageEmbed()
      .setColor(process.env.WARNCOLLOR)
      .setThumbnail(process.env.LOGO)
      .setImage(process.env.BANNER)
      .setTitle(`${languages.sure}`)
      .setDescription(
        `${languages.are_u_sure} ${userOption} ${languages.the_role} <@&${main_job_id.roleid}> ${languages.want_to_give}`
      )
      .setTimestamp();

    const embedGiven = new MessageEmbed()
      .setColor(process.env.COLLOR)
      .setThumbnail(process.env.LOGO)
      .setImage(process.env.BANNER)
      .setDescription(
        `${languages.user} ${userOption} 
                    ${languages.got} <@&${main_job_id.roleid}>
                    ${languages.given} <@${interaction.member.id}>`
      )
      .setFooter(interaction.member.displayName)
      .setTimestamp();

    const embedGiveLog = new MessageEmbed()
      .setColor(process.env.COLLOR)
      .setThumbnail(process.env.LOGO)
      .setImage(process.env.BANNER)
      .setDescription(
        `${job_languages.give_log}
                    ${languages.user} ${userOption} 
                    ${languages.got} <@&${main_job_id.roleid}>
                    ${languages.given} <@${interaction.member.id}>`
      )
      .setFooter(interaction.member.displayName)
      .setTimestamp();

    const embedRemovePrompt = new MessageEmbed()
      .setColor(process.env.WARNCOLLOR)
      .setThumbnail(process.env.LOGO)
      .setImage(process.env.BANNER)
      .setTitle(`${languages.sure}`)
      .setDescription(
        `${languages.are_u_sure} ${userOption} ${languages.the_role} <@&${main_job_id.roleid}> ${languages.want_to_remove}`
      )
      .setTimestamp();

    const embedRemove = new MessageEmbed()
      .setColor(process.env.COLLOR)
      .setThumbnail(process.env.LOGO)
      .setImage(process.env.BANNER)
      .setDescription(
        `${languages.user} ${userOption} 
                  ${languages.removed} <@&${main_job_id.roleid}>
                 ${languages.removed_by} <@${interaction.member.id}>`
      )
      .setFooter(interaction.member.displayName)
      .setTimestamp();

    const embedRemoveLog = new MessageEmbed()
      .setColor(process.env.COLLOR)
      .setThumbnail(process.env.LOGO)
      .setImage(process.env.BANNER)
      .setDescription(
        `${job_languages.remove_log}
                 ${languages.user} ${userOption} 
                 ${languages.removed} <@&${main_job_id.roleid}>
                 ${languages.removed_by} <@${interaction.member.id}>`
      )
      .setFooter(interaction.member.displayName)
      .setTimestamp();

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("Yes")
        .setLabel(`${languages.yes}`)
        .setStyle("SUCCESS")
        .setEmoji("✅"),
      new MessageButton()
        .setCustomId("No")
        .setLabel(`${languages.no}`)
        .setStyle("DANGER")
        .setEmoji("⚠️")
    );

    // Check if the member has the required role
    if (!interaction.member.roles.cache.has(main_job_id.head)) {
      await interaction.reply({
        content: `Je kan dat niet doen! je mist <@&${main_job_id.head}>`,
        ephemeral: true,
      });
      return;
    }

    // Process the main choice
    if (mainChoice === 1) {
      interaction
        .reply({
          embeds: [embedGivePrompt],
          components: [row],
          ephemeral: true,
        })
        .then(async (msg) => {
          const time = 30 * 1000;

          const filter = (interactionButton) => {
            if (interactionButton.user.id === authorID) return true;
            interactionButton.reply({
              content: `${languages.cant_use}`,
              ephemeral: true,
            });
            return false;
          };

          const collector = interaction.channel.createMessageComponentCollector(
            {
              filter,
              max: 1,
              time,
            }
          );

          let replied = false; // Add this flag

          // Inside the collector.on("collect") function
          collector.on("collect", (interactionButton) => {
            const id = interactionButton.customId;
            switch (id) {
              case "Yes":
                if (mainUser.roles.cache.has(main_job_id.roleid))
                  return interactionButton
                    .reply({
                      content: `${languages.cant_give_the_rol}`,
                      ephemeral: true,
                    })
                    .catch(console.error);
                const role = interaction.guild.roles.cache.get(
                  main_job_id.roleid
                );
                let logChannel = interaction.guild.channels.cache.get(
                  main_job_id.log_chat
                );
                // console.log(logChannel);
                if (!role) return;
                mainUser.roles
                  .add(role)
                  .then(() => {
                    interactionButton.deferUpdate().catch(console.error); // Defer the update instead of replying
                    // Send confirmation message
                    interaction.followUp({
                      embeds: [embedGiven],
                      ephemeral: true,
                    }) &&
                      logChannel
                        .send({ embeds: [embedGiveLog] })
                        .catch(console.error);
                    // Send to log channel if defined
                    // if (logChannel) interaction.guild.channel.send({ embeds: [embedGiven] });
                  })
                  .catch((err) => {
                    console.log(err);
                    interactionButton
                      .reply({
                        content: `${languages.cmd_job_err} ${interaction.member.displayName}`,
                        ephemeral: true,
                      })
                      .catch(console.error);
                  });
                break;
              case "No":
                interactionButton
                  .reply({
                    content: `${languages.oke} ${interaction.member.displayName} ${languages.dont_get} <@&${main_job_id.roleid}>`,
                    ephemeral: true,
                  })
                  .catch(console.error);
                break;
              default:
                interactionButton
                  .reply({
                    content: `${languages.no_functionality}`,
                    ephemeral: true,
                  })
                  .catch(console.error);
            }
          });
        });
    } else if (mainChoice === 2) {
      interaction
        .reply({
          embeds: [embedRemovePrompt],
          components: [row],
          ephemeral: true,
        })
        .then(async (msg) => {
          const time = 30 * 1000;

          const filter = (interactionButton) => {
            if (interactionButton.user.id === authorID) return true;
            interactionButton.reply({
              content: `${languages.cant_use}`,
              ephemeral: true,
            });
            return false;
          };

          const collector = interaction.channel.createMessageComponentCollector(
            {
              filter,
              max: 1,
              time,
            }
          );

          let replied = false; // Add this flag

          // Inside the collector.on("collect") function
          collector.on("collect", (interactionButton) => {
            const id = interactionButton.customId;
            switch (id) {
              case "Yes":
                if (!mainUser.roles.cache.has(main_job_id.roleid))
                  return interactionButton
                    .reply({
                      content: `${languages.cant_remove_the_rol}`,
                      ephemeral: true,
                    })
                    .catch(console.error);
                const role = interaction.guild.roles.cache.get(
                  main_job_id.roleid
                );
                const logChannel = interaction.guild.channels.cache.get(
                  setings.log_chat
                );
                // console.log(logChannel);
                if (!role) return;
                mainUser.roles
                  .remove(role)
                  .then(() => {
                    interactionButton.deferUpdate().catch(console.error); // Defer the update instead of replying
                    // Send confirmation message
                    interaction.followUp({
                      embeds: [embedRemove],
                      ephemeral: true,
                    }) &&
                      logChannel
                        .send({ embeds: [embedRemoveLog] })
                        .catch(console.error);
                    // Send to log channel if defined
                    // if (logChannel) interaction.guild.channel.send({ embeds: [embedGiven] });
                  })
                  .catch((err) => {
                    console.log(err);
                    interactionButton
                      .reply({
                        content: `${languages.cmd_job_err} ${interaction.member.displayName}`,
                        ephemeral: true,
                      })
                      .catch(console.error);
                  });
                break;
              case "No":
                interactionButton
                  .reply({
                    content: `${languages.oke} ${interaction.member.displayName} ${languages.dont_remove} <@&${main_job_id.roleid}>`,
                    ephemeral: true,
                  })
                  .catch(console.error);
                break;
              default:
                interactionButton
                  .reply({
                    content: `${languages.no_functionality}`,
                    ephemeral: true,
                  })
                  .catch(console.error);
            }
          });
        });
    } else if (mainChoice === 0) {
      interaction.reply({ content: `${languages.only}`, ephemeral: true });
    }
  },
};
