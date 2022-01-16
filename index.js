console.log(`\x1b[31m -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- \x1b[0m`);
console.log(`\x1b[31m Dit is de officiële source code van de SlimGame. \x1b[0m`);
console.log(`\x1b[31m Het door geven van deze files of verkopen is van zijn strengste verboden! \x1b[0m`);
console.log(`\x1b[31m Deze bot is gemaakt bij SlimGame. \x1b[0m`);
console.log(`\x1b[31m -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=- \x1b[0m`);
console.log('<---------------------------------------------------------------------------------------------------------------------->',);
console.log(['DISCORD.JS V13 Bot']);
console.log(['Aan het opsterten...']);
console.log('<---------------------------------------------------------------------------------------------------------------------->',);

const { Console } = require("console");
//------------------------------------Benodigt heeden------------------------------------------
const { Client, Intents, Collection } = require("discord.js");

//.env config
require('dotenv-flow').config();

//File server
const fs = require("fs");

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

for (const file of commandFiles) {

    const command = require(`./commands/${file}`);

    client.commands.set(command.help.name, command);

    console.log([`I have Load [${command.help.name}]`]);

}

//----------------------------------------ADMINS-----------------------------------------------
const admins = [process.env.ADMINROLL];

//Start op info
client.once("ready", () => {

    client.user.setActivity(`${process.env.STATUS}`, { type: "PLAYING" });

    console.log('<---------------------------------------------------------------------------------------------------------------------->',);
    console.log(['All commands ar load']);
    console.log([`${client.user.username}`, 'is online']);
    console.log('<---------------------------------------------------------------------------------------------------------------------->',);
    console.log(' ');
    console.log(`Bot Name: ${client.user.username}`);
    console.log(`Bot BotID: ${process.env.BOTID}`);
    console.log(`Bot Preffix: ${process.env.PREFFIX}`);
    console.log(`Bot Invite: ${process.env.INVITE}`);
    console.log(`Bot Collor: ${process.env.COLLOR}`);
    console.log(' ');
    console.log('<---------------------------------------------------------------------------------------------------------------------->',);

});

client.on("guildMemberAdd", member => {

    var role = member.guild.roles.cache.get(process.env.JOINROLL);

    if (!role) return;

    member.roles.add(role);

    var channel = member.guild.channels.cache.get(process.env.WELKOM);

    if (!channel) return;

    channel.send(`Welcom in the server, ${member}`);

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

        console.log(error);
        await message.reply("Er is iets Fout Gegaan!");

    }

});

//Bot Login
client.login(process.env.TOKEN);