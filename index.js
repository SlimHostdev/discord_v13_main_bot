console.log("online");

const { Console } = require("console");

const log = require("./src/function/util");
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
  if (err) throw err;
  console.log(`[\x1b[31m Connected To DataBase! \x1b[0m]`);
  //log.info(`Connected To DataBase!`);

  //Table Create
  // var sql = "CREATE TABLE SERVERINFO (JOIN_ROLL_ID VARCHAR(255), WELKOM_ID VARCHAR(255))";

  // DB.query(sql, function (err, result) {
  //   if (err) throw err;
  //   console.log(`[\x1b[31m Create Table! \x1b[0m]`);
  //});

  //Select Form Table
  //    DB.query("SELECT JOIN_ROLL_ID FROM SERVERINFO", function (err, joinrollid, fields) {
  //        if (err) throw err;
  //        console.log(joinrollid);
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
console.log([`${rechten.bot_rechten_5}`]);
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

console.log(`[\x1b[31m COMMANDS \x1b[0m]`);

for (const file of commandFiles) {
  const command = require(`./cmd/user/commands/${file}`);

  client.commands.set(command.help.name, command);

  console.log([`${language.cmd_load} [${command.help.name}.js]`]);
}

//Ophaalen van slachCommands uit map slachCommands
const commandSlashFiles = fs
  .readdirSync("./cmd/user/userSlashCommands")
  .filter((file) => file.endsWith(".js"));

console.log(`[\x1b[31m UserSlashCommands \x1b[0m]`);

for (const fileSlash of commandSlashFiles) {
  const commandSlash = require(`./cmd/user/userSlashCommands/${fileSlash}`);

  client.slachCommands.set(commandSlash.data.name, commandSlash);
  slachCommands.push(commandSlash.data.toJSON());

  console.log([`${language.cmd_load} [${commandSlash.data.name}.js]`]);
}

//Ophaalen van slachCommands uit map slachCommands
const commandAdminSlashFiles = fs
  .readdirSync("./cmd/admin/adminSlashCommands")
  .filter((file) => file.endsWith(".js"));

console.log(`[\x1b[31m adminSlashCommands \x1b[0m]`);

for (const fileSlash of commandAdminSlashFiles) {
  const adminSlash = require(`./cmd/admin/adminSlashCommands/${fileSlash}`);

  client.slachCommands.set(adminSlash.data.name, adminSlash);
  slachCommands.push(adminSlash.data.toJSON());

  console.log([`${language.cmd_load} [${adminSlash.data.name}.js]`]);
}

//Ophaalen van commandos uit map admincommands
const admincommandFiles = fs
  .readdirSync("./cmd/admin/admincommands")
  .filter((file) => file.endsWith(".js"));

console.log(`[\x1b[31m ADMIN COMMANDS \x1b[0m]`);

for (const file of admincommandFiles) {
  const command = require(`./cmd/admin/admincommands/${file}`);

  client.commands.set(command.help.name, command);

  console.log([`${language.cmd_load} [${command.help.name}.js]`]);
}

//Ophaalen van commandos uit map addons
const addonFiles = fs
  .readdirSync("./cmd/addons")
  .filter((file) => file.endsWith(".js"));

console.log(`[\x1b[31m ADDONS \x1b[0m]`);

for (const file of addonFiles) {
  const command = require(`./cmd/addons/${file}`);

  client.commands.set(command.help.name, command);

  console.log([`${language.cmd_load} [${command.help.name}.js]`]);
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
    "\x1b[31m Not In Use 🚫- to use this feature you need to set it up in  \x1b[0m";
  const dbuser_status =
    process.env.DBUSER ||
    "\x1b[31m Not In Use 🚫- to use this feature you need to set it up in  \x1b[0m";
  const dbname_status =
    process.env.DBNAME ||
    "\x1b[31m Not In Use 🚫- to use this feature you need to set it up in  \x1b[0m";
  const invite =
    process.env.INVITE ||
    "\x1b[31m  Not In Use 🚫- This is a Private Bot for more info see https://github.com/SlimHostdev/discord_v13_main_bot \x1b[0m";
  const botname = client.user.username;
  const servers = client.guilds.cache.size;

  var d = new Date();
  //datum
  const dag = d.getDate();
  const maand = d.getMonth() + 1;
  const jaar = d.getFullYear();
  //Tijd
  const uur = d.getHours();
  const minuten = d.getMinutes();
  const seconden = d.getSeconds();

  console.log(
    "<---------------------------------------------------------------------------------------------------------------------->"
  );
  console.log(["All commands ar load ✅"]);
  console.log(
    `\x1b[31m -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- \x1b[0m`
  );
  console.log(`\x1b[31m ${rechten.bot_rechten_1} ${packege.slimhost} \x1b[0m`);
  console.log(`\x1b[31m ${rechten.bot_rechten_2} \x1b[0m`);
  console.log(`\x1b[31m ${rechten.bot_rechten_3} ${packege.author} \x1b[0m`);
  console.log(`\x1b[31m ${packege.gitrepo} \x1b[0m`);
  console.log(
    `\x1b[31m -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- \x1b[0m`
  );
  console.log(`[\x1b[31m ${botname} \x1b[0m]`);
  console.log(
    ["is online 🟢  sinds:"],
    `-> [ ${dag}-${maand}-${jaar}`,
    `~`,
    `${uur}:${minuten}:${seconden} ]`
  );
  console.log(
    "<---------------------------------------------------------------------------------------------------------------------->"
  );
  console.log([`Bot BotID:`], `-> [ ${botid} ]`);
  console.log([`Bot Preffix:`], `-> [ ${preffix} ]`);
  console.log(["Servers:"], `-> [ ${servers} ]`);
  console.log(`[\x1b[31m Bot MySQL: \x1b[0m]`);
  console.log([`Data Base Host:`], `-> [ ${dbhost_status} ]`);
  console.log([`Data Base User:`], `-> [ ${dbuser_status} ]`);
  console.log([`Data Base Name:`], `-> [ ${dbname_status} ]`);
  console.log([`Bot Invite:`], `-> [ ${invite} ]`);
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
            console.log(`${language.Slashcmd_load}`,);
            console.log('<---------------------------------------------------------------------------------------------------------------------->',);
            */

      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: slachCommands,
      });

      /*
            console.log('<---------------------------------------------------------------------------------------------------------------------->',);
            console.log(`${language.Slashcmd_ar_load}`,);
            console.log('<---------------------------------------------------------------------------------------------------------------------->',);
            */
    } catch (error) {
      console.error(error);
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
    console.log(`\x1b[31m ERROR \x1b[0m`);
    console.log(error);
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
      console.log(err);
    }
  } else {
    return;
  }
});

//Bot Login
client.login(process.env.TOKEN);
