console.log("slimgame");

const { Console } = require("console");
//------------------------------------Benodigt heeden------------------------------------------
const { Client, Intents, Collection, Interaction } = require("discord.js");
const discord = require("discord.js");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

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
const language = JSON.parse(fs.readFileSync(`./language/${process.env.LANGUAGES}.json`, "utf-8"));

//Eigenaars Rechten Van https://Slimhost.nl
const rechten = JSON.parse(fs.readFileSync(`./src/language/${process.env.LANGUAGES}.json`, "utf-8"));

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

//Command handler
client.slachCommands = new Collection();
const slachCommands = [];

//Ophaalen van commandos uit map commands
const commandFiles = fs.readdirSync('./cmd/commands').filter(file => file.endsWith(".js"));

console.log(`[\x1b[31m COMMANDS \x1b[0m]`);

for (const file of commandFiles) {

    const command = require(`./cmd/commands/${file}`);

    client.commands.set(command.help.name, command);

    console.log([`${language.cmd_load} [${command.help.name}.js]`]);

}

//Ophaalen van slachCommands uit map slachCommands
const commandSlashFiles = fs.readdirSync('./cmd/slashCommands').filter(file => file.endsWith(".js"));

console.log(`[\x1b[31m slashCommands \x1b[0m]`);

for (const fileSlash of commandSlashFiles) {

    const commandSlash = require(`./cmd/slashCommands/${fileSlash}`);

    client.slachCommands.set(commandSlash.data.name, commandSlash);
    slachCommands.push(commandSlash.data.toJSON());

    console.log([`${language.cmd_load} [${commandSlash.data.name}.js]`]);

}

//Ophaalen van commandos uit map admincommands
const admincommandFiles = fs.readdirSync('./cmd/admincommands').filter(file => file.endsWith(".js"));

console.log(`[\x1b[31m ADMIN COMMANDS \x1b[0m]`);

for (const file of admincommandFiles) {

    const command = require(`./cmd/admincommands/${file}`);

    client.commands.set(command.help.name, command);

    console.log([`${language.cmd_load} [${command.help.name}.js]`]);

}

//Ophaalen van commandos uit map addons
const addonFiles = fs.readdirSync('./cmd/addons').filter(file => file.endsWith(".js"));

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
    console.log([`${language.bot_online}`]);
    console.log(`[\x1b[31m ${language.bot_name} ${client.user.username} \x1b[0m]`);
    console.log('<---------------------------------------------------------------------------------------------------------------------->',);
//    console.log([`${language.bot_name} ${client.user.username}`]);
    console.log([`${language.bot_id} ${process.env.BOTID}`]);
    console.log([`${language.bot_preffix} ${process.env.PREFFIX}`]);
    console.log([`${language.bot_language} ${process.env.LANGUAGES}`]);
    console.log([`${language.bot_users} ${client.users.cache.size}`]);
    console.log([`${language.bot_channels} ${client.channels.cache.size}`]);
    console.log('<---------------------------------------------------------------------------------------------------------------------->',);
    console.log([`${language.bot_mysql}`]);
    console.log(`[\x1b[31m ${language.mysql_host} ${process.env.DBHOST} \x1b[0m]`);
    console.log(`[\x1b[31m ${language.mysql_user} ${process.env.DBUSER} \x1b[0m]`);
    console.log(`[\x1b[31m ${language.mysql_name} ${process.env.DBNAME} \x1b[0m]`);
    console.log('<---------------------------------------------------------------------------------------------------------------------->',);
    console.log([`${language.bot_invite}`]);
    console.log(`[\x1b[31m ${process.env.INVITE} \x1b[0m]`);
    console.log('<---------------------------------------------------------------------------------------------------------------------->',);

        //nieuwe comando functie

        const guild = client.guilds.cache.get(`${process.env.TESTSERVERID}`);

        let commands;
    
        if(guild){
            commands = guild.commands;
        }else{
            commands = client.application.commands;
        }
    
        // commands.create({
        //     name: "discord-v13",
        //     description: "Deze CMD heeft geen functie!"
        // });

    //nieuwe commandSlash functie
    let guildId = `${process.env.SERVERID}`;
    let clientId = `${process.env.BOTID}`;
    
    const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

    (async () => {
        try {
            console.log('<---------------------------------------------------------------------------------------------------------------------->',);
            console.log(`${language.Slashcmd_load}`,);
            console.log('<---------------------------------------------------------------------------------------------------------------------->',);

            await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: slachCommands},
            );

            console.log('<---------------------------------------------------------------------------------------------------------------------->',);
            console.log(`${language.Slashcmd_ar_load}`,);
            console.log('<---------------------------------------------------------------------------------------------------------------------->',);
        } catch (error) {
            console.error(error);
        }
    })();

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

client.on("interactionCreate", async interaction => {

    if(interaction.isSelectMenu()){
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

        //Kleuren menu keuzen
        if(customId === 'kleur-menu'){
    
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
                content: 'You got the Color Roll.',
                ephemeral: true
            });
    
        }

    
    }else if (interaction.isCommand()){

        const slachCommand = client.slachCommands.get(interaction.commandName);
        if(!slachCommand) return;

        try {

            await slachCommand.execute(client, interaction);

        } catch (err) {
            await interaction.reply({content: `${language.Slashcmd_err}`, ephemeral: true})
            console.log(err);
        }

    }else{
        return;
    }

});

//Bot Login
client.login(process.env.TOKEN);
