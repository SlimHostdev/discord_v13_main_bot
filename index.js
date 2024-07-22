const { log } = require("../src/function/handlers");

log.updated("online");

//------------------------------------Benodigt heeden------------------------------------------
const {
  Client,
  Intents,
  Collection,
  Interaction,
  ActivityType,
  PresenceUpdateStatus,
} = require("discord.js");
const discord = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

//.env config
require("dotenv-flow").config();

//MySQL
const mysql = require("mysql");

const DB = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPW,
  database: process.env.DBNAME,
});

DB.connect(function (err) {
  //if (err) throw err;

  log.info(`Connected To DataBase!`);

  //Table Create
  // var sql = "CREATE TABLE SERVERINFO (JOIN_ROLL_ID VARCHAR(255), WELKOM_ID VARCHAR(255))";

  // DB.query(sql, function (err, result) {
  //   if (err) throw err;
  //   log.created(`[\x1b[31m Create Table! \x1b[0m]`);
  //});

  //Select Form Table
  //    DB.query("SELECT JOIN_ROLL_ID FROM SERVERINFO", function (err, joinrollid, fields) {
  //        if (err) throw err;
  //        log.info(joinrollid);
  //    });
});

//File server
const fs = require("fs");

//Main Data
const packege = JSON.parse(fs.readFileSync("./package.json", "utf-8"));

//Taal van de bot
const language = JSON.parse(
  fs.readFileSync(`./language/${process.env.LANGUAGES}.json`, "utf-8")
);

//Eigenaars Rechten Van https://Slimhost.nl
const rechten = JSON.parse(
  fs.readFileSync(`./src/language/${process.env.LANGUAGES}.json`, "utf-8")
);

console.log(
  "<---------------------------------------------------------------------------------------------------------------------->"
);
log.updated(`${rechten.bot_rechten_5}`);
console.log(
  "<---------------------------------------------------------------------------------------------------------------------->"
);

//Flags regchten van de bot
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
  ],
});

//Command handler
client.commands = new Collection();

//Command handler
client.slachCommands = new Collection();
const slachCommands = [];

//Ophaalen van commandos uit map commands
const commandFiles = fs
  .readdirSync("./cmd/user/commands")
  .filter((file) => file.endsWith(".js"));

log.updated(`[ COMMANDS ]`);

for (const file of commandFiles) {
  const command = require(`./cmd/user/commands/${file}`);

  client.commands.set(command.help.name, command);

  log.success(`${language.cmd_load} [ ${command.help.name}.js ]`);
}

//Ophaalen van slachCommands uit map slachCommands
const commandSlashFiles = fs
  .readdirSync("./cmd/user/userSlashCommands")
  .filter((file) => file.endsWith(".js"));

log.updated(`[ UserSlashCommands ]`);

for (const fileSlash of commandSlashFiles) {
  const commandSlash = require(`./cmd/user/userSlashCommands/${fileSlash}`);

  client.slachCommands.set(commandSlash.data.name, commandSlash);
  slachCommands.push(commandSlash.data.toJSON());

  log.success(`${language.cmd_load} [ ${commandSlash.data.name}.js ]`);
}

//Ophaalen van slachCommands uit map slachCommands
const commandAdminSlashFiles = fs
  .readdirSync("./cmd/admin/adminSlashCommands")
  .filter((file) => file.endsWith(".js"));

log.updated(`[ adminSlashCommands ]`);

for (const fileSlash of commandAdminSlashFiles) {
  const adminSlash = require(`./cmd/admin/adminSlashCommands/${fileSlash}`);

  client.slachCommands.set(adminSlash.data.name, adminSlash);
  slachCommands.push(adminSlash.data.toJSON());

  log.success(`${language.cmd_load} [ ${adminSlash.data.name}.js ]`);
}

//Ophaalen van commandos uit map admincommands
const admincommandFiles = fs
  .readdirSync("./cmd/admin/admincommands")
  .filter((file) => file.endsWith(".js"));

log.updated(`[ ADMIN COMMANDS ]`);

for (const file of admincommandFiles) {
  const command = require(`./cmd/admin/admincommands/${file}`);

  client.commands.set(command.help.name, command);

  log.success(`${language.cmd_load} [ ${command.help.name}.js ]`);
}

//Ophaalen van commandos uit map addons
const addonFiles = fs
  .readdirSync("./cmd/addons")
  .filter((file) => file.endsWith(".js"));

log.updated(`[ ADDONS ]`);

for (const file of addonFiles) {
  const command = require(`./cmd/addons/${file}`);

  client.commands.set(command.help.name, command);

  log.success(`${language.cmd_load} [ ${command.help.name}.js ]`);
}

//----------------------------------------ADMINS-----------------------------------------------
const admins = [process.env.ADMINROLL];

//Start op info
client.once("ready", () => {
  //client.user.setUsername(`${process.env.BOTNAME}`);

  //client.user.setAvatar(`./src/img/${process.env.BOTIMG}`);

  const statusOptions = [
    `${process.env.STATUS}`,
    "/suggestion",
    "/botinfo",
    "/report",
    "/review",
  ];

  const onlineStatusOptions = ["dnd", "idle", "online"];

  let counter = 0;

  let time = 1 * 60 * 1000; //1000 = 1 Minut

  const updateStatus = () => {
    client.user.setPresence({
      status: onlineStatusOptions[counter],
      activities: [
        {
          name: statusOptions[counter],
        },
      ],
    });

    if (++counter >= statusOptions.length) counter = 0;

    setTimeout(updateStatus, time);
  };
  updateStatus();

  const preffix =
    process.env.PREFFIX ||
    "Not In Use 🚫- to use this feature you need to set it up in";

  const botid =
    process.env.BOTID ||
    "Not In Use 🚫- to use this feature you need to set it up in";

  const dbhost_status =
    process.env.DBHOST ||
    "Not In Use 🚫- to use this feature you need to set it up in";

  const dbuser_status =
    process.env.DBUSER ||
    "Not In Use 🚫- to use this feature you need to set it up in";

  const dbname_status =
    process.env.DBNAME ||
    "Not In Use 🚫- to use this feature you need to set it up in";

  const invite =
    process.env.INVITE ||
    `https://discord.com/oauth2/authorize?client_id=${botid}&scope=bot&permissions=6466948424`;

  const botname = client.user.username;

  const servers = client.guilds.cache.size;

  console.log(
    "<---------------------------------------------------------------------------------------------------------------------->"
  );
  log.updated("All commands ar load ✅");
  console.log(
    `\x1b[31m -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- \x1b[0m`
  );
  log.warn(`${rechten.bot_rechten_1} ${packege.slimhost}`);
  log.warn(`${rechten.bot_rechten_2}`);
  log.warn(`${rechten.bot_rechten_3} ${packege.author}`);
  log.warn(`${packege.gitrepo}`);
  console.log(
    `\x1b[31m -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- \x1b[0m`
  );
  log.info(`${botname}`);
  log.updated("is online 🟢");
  console.log(
    "<---------------------------------------------------------------------------------------------------------------------->"
  );
  log.info(`Bot BotID: -> [ ${botid} ]`);
  log.info(`Bot Preffix: -> [ ${preffix} ]`);
  log.info(`Servers: -> [ ${servers} ]`);
  log.updated(`[ Bot MySQL: ]`);
  log.info(`Data Base Host: -> [ ${dbhost_status} ]`);
  log.info(`Data Base User: -> [ ${dbuser_status} ]`);
  log.info(`Data Base Name: -> [ ${dbname_status} ]`);
  log.info(`Bot Invite: -> [ ${invite} ]`);
  console.log(
    "<---------------------------------------------------------------------------------------------------------------------->"
  );

  //nieuwe comando functie

  const guild = client.guilds.cache.get(`${process.env.TESTSERVERID}`);

  let commands;

  if (guild) {
    commands = guild.commands;
  } else {
    commands = client.application.commands;
  }

  // commands.create({
  //     name: "discord-v13",
  //     description: "Deze CMD heeft geen functie!"
  // });

  //nieuwe commandSlash functie
  let guildId = `${process.env.SERVERID}`;
  let clientId = `${process.env.BOTID}`;

  const rest = new REST({ version: "9" }).setToken(process.env.TOKEN);

  (async () => {
    try {
      /*
            console.log('<---------------------------------------------------------------------------------------------------------------------->',);
            log.updated(`${language.Slashcmd_load}`,);
            console.log('<---------------------------------------------------------------------------------------------------------------------->',);
            */

      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: slachCommands,
      });

      /*
            console.log('<---------------------------------------------------------------------------------------------------------------------->',);
            log.updated(`${language.Slashcmd_ar_load}`,);
            console.log('<---------------------------------------------------------------------------------------------------------------------->',);
            */
    } catch (error) {
      log.error(error);
    }
  })();
});

/*Temp VC*/
const TempChannels = require("discord-temp-channels");
const tempChannels = new TempChannels(client);
var maxUsers = process.env.TEMP_VC_MAX_USERS;
// Register a new main channel
tempChannels.registerChannel(process.env.TEMP_VC_MAIN_ID, {
  childCategory: process.env.TEMP_VC_CATEGORY_ID,
  childAutoDeleteIfEmpty: true,
  childMaxUsers: maxUsers,
  childFormat: (member, count) =>
    `┊✅Open VC #${count} | ${member.user.username}`,
});

/* automatically temporary vc channels */
const tempvcdb = require("quick.db");

/*
client.on("ready", () => {
  if (!tempvcdb.get("temp-channels")) tempvcdb.set("temp-channels", []);
  tempvcdb.get("temp-channels").forEach((channelData) => {
    tempChannels.registerChannel(channelData.channelID, channelData.options);
  });
});
*/

client.on("guildMemberAdd", (member) => {
  var welkomEmbed = new discord.MessageEmbed()
    .setTitle(language.join_welkom_title)
    .setDescription(`${process.env.SERVERNAME}`)
    .setColor(process.env.COLLOR)
    .setThumbnail(process.env.LOGO)
    .setImage(process.env.BANNER)
    .setTimestamp()
    .setFooter(`${language.join_welkom} ${process.env.SERVERNAME}`)
    .addFields(
      { name: `${language.join_welkom}`, value: `${member}` },
      { name: ` `, value: `${process.env.WELKOMMSG}` }
    );

  var role = member.guild.roles.cache.get(process.env.JOINROLL);

  if (!role) return;

  member.roles.add(role);

  var welkomchannel = member.guild.channels.cache.get(process.env.WELKOM);

  if (!welkomchannel) return;

  welkomchannel.send({ embeds: [welkomEmbed] });
});

//Command werking
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  //Prefix oproepen uit .env
  var prefix = process.env.PREFFIX;

  //bericht splitsen
  var messageArray = message.content.split(" ");

  //commando werking
  var command = messageArray[0];

  if (!message.content.startsWith(prefix)) return;

  const commandData = client.commands.get(command.slice(prefix.length));

  if (!commandData) return;

  var arguments = messageArray.slice(1);

  try {
    await commandData.run(client, message, arguments);
  } catch (error) {
    log.warn(`[ ERROR ]`);
    log.error(error);
    await message.reply(`${language.cmd_err}`);
  }
});

client.on("interactionCreate", async (interaction) => {
  if (interaction.isSelectMenu()) {
    const { customId, values, member } = interaction;

    if (customId === "dropdown") {
      const component = interaction.component;

      //filter van wat er wel en niet is gekoozen
      const removed = component.options.filter((option) => {
        return !values.includes(option.value);
      });

      //roll verwijderen all hij niet is ge selecteerd.
      for (var id of removed) {
        member.roles.remove(id.value);
      }

      //roll toevoegen
      for (var id of values) {
        member.roles.add(id);
      }

      interaction.reply({
        content: `${language.dropdown}`,
        ephemeral: true,
      });
    }

    //Kleuren menu keuzen
    if (customId === "kleur-menu") {
      const component = interaction.component;

      //filter van wat er wel en niet is gekoozen
      const removed = component.options.filter((option) => {
        return !values.includes(option.value);
      });

      //roll verwijderen all hij niet is ge selecteerd.
      for (var id of removed) {
        member.roles.remove(id.value);
      }

      //roll toevoegen
      for (var id of values) {
        member.roles.add(id);
      }

      interaction.reply({
        content: "You got the Color Roll.",
        ephemeral: true,
      });
    }

    //Regels menu keuzen
    if (customId === "rules-menu") {
      const component = interaction.component;

      //filter van wat er wel en niet is gekoozen
      const removed = component.options.filter((option) => {
        return !values.includes(option.value);
      });

      //roll verwijderen all hij niet is ge selecteerd.
      for (var id of removed) {
        member.roles.remove(id.value);
      }

      //roll toevoegen
      for (var id of values) {
        member.roles.add(id);
      }

      interaction.reply({
        content: "You accept the rules.\nHave fun in the server.",
        ephemeral: true,
      });
    }

    //Game Roll menu keuzen
    if (customId === "game-roll-menu") {
      const component = interaction.component;

      //filter van wat er wel en niet is gekoozen
      const removed = component.options.filter((option) => {
        return !values.includes(option.value);
      });

      //roll verwijderen all hij niet is ge selecteerd.
      for (var id of removed) {
        member.roles.remove(id.value);
      }

      //roll toevoegen
      for (var id of values) {
        member.roles.add(id);
      }

      interaction.reply({
        content: "You have received all the game roles you chose.",
        ephemeral: true,
      });
    }

    //Rolle menu keuzen
    if (customId === "rolle-menu") {
      const component = interaction.component;

      //filter van wat er wel en niet is gekoozen
      const removed = component.options.filter((option) => {
        return !values.includes(option.value);
      });

      //roll verwijderen all hij niet is ge selecteerd.
      for (var id of removed) {
        member.roles.remove(id.value);
      }

      //roll toevoegen
      for (var id of values) {
        member.roles.add(id);
      }

      interaction.reply({
        content: "You have been given all the game roles you chose.",
        ephemeral: true,
      });
    }
  } else if (interaction.isCommand()) {
    const slachCommand = client.slachCommands.get(interaction.commandName);
    if (!slachCommand) return;

    try {
      await slachCommand.execute(client, interaction);
    } catch (err) {
      await interaction.reply({
        content: `${language.Slashcmd_err}`,
        ephemeral: true,
      });
      log.error(err);
    }
  } else {
    return;
  }
});

//Bot Login
client.login(process.env.TOKEN);
