console.log("slimgame");

const { Console } = require("console");
//------------------------------------Benodigt heeden------------------------------------------
const { Client, Intents, Collection, Interaction } = require("discord.js");
const discord = require("discord.js");

//.env config
require('dotenv-flow').config();

//MySQL
const mysql = require('mysql');

const DB = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPW,
  database: process.env.DBNAME
});

//DB.connect(function(err) {
//    if (err) throw err;
//    console.log(`[\x1b[31m Connected To DataBase! \x1b[0m]`);
    
    //Table Create
   // var sql = "CREATE TABLE SERVERINFO (JOIN_ROLL_ID VARCHAR(255), WELKOM_ID VARCHAR(255))";
    
   // DB.query(sql, function (err, result) {
   //   if (err) throw err;
   //   console.log(`[\x1b[31m Create Table! \x1b[0m]`);
   // });

   //Select Form Table
//    DB.query("SELECT JOIN_ROLL_ID FROM SERVERINFO", function (err, joinrollid, fields) {
//        if (err) throw err;
//        console.log(joinrollid);
//    });

//});

//File server
const fs = require("fs");

//Main Data
const packege = JSON.parse(fs.readFileSync("./package.json", "utf-8"));

//Taal van de bot
const language = JSON.parse(fs.readFileSync(`./language/${process.env.LANGUAGE}.json`, "utf-8"));

//Eigenaars Rechten Van https://Slimhost.nl
const rechten = JSON.parse(fs.readFileSync(`./src/${process.env.LANGUAGE}.json`, "utf-8"));

console.log(`\x1b[31m -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- \x1b[0m`);
console.log(`\x1b[31m ${rechten.bot_rechten_1} ${packege.slimhost} \x1b[0m`);
console.log(`\x1b[31m ${rechten.bot_rechten_2} \x1b[0m`);
console.log(`\x1b[31m ${rechten.bot_rechten_3} ${packege.author} \x1b[0m`);
console.log(`\x1b[31m ${packege.gitrepo} \x1b[0m`);
console.log(`\x1b[31m -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- \x1b[0m`);
console.log('<---------------------------------------------------------------------------------------------------------------------->',);
console.log([`${packege.name} ${rechten.bot_rechten_4} ${packege.slimhost}`]);
console.log([`${rechten.bot_rechten_5}`]);
console.log('<---------------------------------------------------------------------------------------------------------------------->',);

//Flags regchten van de bot
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ]
});

//Command handler
client.commands = new Collection();

//Ophaalen van commandos uit map commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith(".js"));

console.log(`[\x1b[31m COMMANDS \x1b[0m]`);

for (const file of commandFiles) {

    const command = require(`./commands/${file}`);

    client.commands.set(command.help.name, command);

    console.log([`${language.cmd_load} [${command.help.name}.js]`]);

}

//Ophaalen van commandos uit map admincommands
const admincommandFiles = fs.readdirSync('./admincommands').filter(file => file.endsWith(".js"));

console.log(`[\x1b[31m ADMIN COMMANDS \x1b[0m]`);

for (const file of admincommandFiles) {

    const command = require(`./admincommands/${file}`);

    client.commands.set(command.help.name, command);

    console.log([`${language.cmd_load} [${command.help.name}.js]`]);

}

//Ophaalen van commandos uit map addons
const addonFiles = fs.readdirSync('./addons').filter(file => file.endsWith(".js"));

console.log(`[\x1b[31m ADDONS \x1b[0m]`);

for (const file of addonFiles) {

    const command = require(`./addons/${file}`);

    client.commands.set(command.help.name, command);

    console.log([`${language.cmd_load} [${command.help.name}.js]`]);

}

//----------------------------------------ADMINS-----------------------------------------------
const admins = [process.env.ADMINROLL];

//Start op info
client.once("ready", () => {

    client.user.setActivity(`${process.env.STATUS}`, { type: "DND" });

    const statusOptions = [
        `${process.env.STATUS}`,
        "-help",
        "-info",
        "-serverinfo",
        "-review"
    ]

    let counter =0;

    let time = 1 * 60 * 1000; //1000 = 1 Minut

    const updateStatus = () => {

        client.user.setPresence({

            status: "dnd",
            activities: [
                {
                    name: statusOptions[counter]
                }
            ]
    
        });

        if(++counter >= statusOptions.length) counter = 0;

        setTimeout(updateStatus, time);

    }
    updateStatus();

    console.log('<---------------------------------------------------------------------------------------------------------------------->',);
    console.log([`${language.cmd_ar_load}`]);
    console.log(`[\x1b[31m ${client.user.username} \x1b[0m]`);
    console.log(['is online']);
    console.log('<---------------------------------------------------------------------------------------------------------------------->',);
    console.log([`${language.bot_name} ${client.user.username}`]);
    console.log([`${language.bot_id} ${process.env.BOTID}`]);
    console.log([`${language.bot_preffix} ${process.env.PREFFIX}`]);
    console.log([`${language.bot_language} ${process.env.LANGUAGE}`]);
    console.log([`${language.bot_mysql}`]);
    console.log(`[\x1b[31m ${language.mysql_host} ${process.env.DBHOST} \x1b[0m]`);
    console.log(`[\x1b[31m ${language.mysql_user} ${process.env.DBUSER} \x1b[0m]`);
    console.log(`[\x1b[31m ${language.mysql_name} ${process.env.DBNAME} \x1b[0m]`);
    console.log([`${language.bot_invite}`]);
    console.log(`[\x1b[31m ${process.env.INVITE} \x1b[0m]`);
    console.log('<---------------------------------------------------------------------------------------------------------------------->',);

});

client.on("guildMemberAdd", member => {

    var welkomEmbed = new discord.MessageEmbed()
    .setTitle(language.join_welkom_title)
    .setDescription(`${process.env.SERVERNAME}`)
    .setColor(process.env.COLLOR)
    .setThumbnail(process.env.LOGO)
    .setImage(process.env.BANNER)
    .setTimestamp()
    .setFooter(`${language.join_welkom} ${process.env.SERVERNAME}`)
    .addFields(
        { name: `${language.join_welkom}`, value: `${member}` }
    )

    var role = member.guild.roles.cache.get(process.env.JOINROLL);

    if (!role) return;

    member.roles.add(role);

    var welkomchannel = member.guild.channels.cache.get(process.env.WELKOM);

    if (!welkomchannel) return;

    welkomchannel.send({ embeds: [welkomEmbed] });

})

//Command werking
client.on("messageCreate", async message => {

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

client.on("interactionCreate", interaction => {

    if(!interaction.isSelectMenu()){
        return;
    }

    const { customId, values, member } = interaction;

    if(customId === 'dropdown'){

        const component = interaction.component;
        
        //filter van wat er wel en niet is gekoozen
        const removed = component.options.filter((option) => {
            return !values.includes(option.value)
        });

        //roll verwijderen all hij niet is ge selecteerd.
        for (var id of removed){
            member.roles.remove(id.value)
        }

        //roll toevoegen
        for (var id of values){
            member.roles.add(id)
        }

        interaction.reply({
            content: `${language.dropdown}`,
            ephemeral: true
        });

    }

});

//Bot Login
client.login(process.env.TOKEN);