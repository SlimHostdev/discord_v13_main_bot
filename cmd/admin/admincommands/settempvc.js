const { discord, Client, Intents } = require("discord.js");
//File server
const fs = require("fs");
//Taal van de bot
const language = JSON.parse(
  fs.readFileSync(`./language/${process.env.LANGUAGES}.json`, "utf-8")
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

const TempChannels = require("discord-temp-channels");
const tempChannels = new TempChannels(client);

const mysql = require("mysql");
const tempvcdb = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPW,
  database: process.env.DBNAME,
});

module.exports.run = async (client, message, args) => {
  tempvcdb.connect(function (err) {
    if (err) throw err;
    /* debug */
    //console.log("Connected to MySQL");
    tempvcdb.query(
      "SELECT channelID FROM tempChannels",
      function (err, result) {
        if (err) throw err;
        console.log(result);
      }
    );
  });

  /*
  if (
    tempChannels.channels.some(
      (channel) => channel.channelID === message.member.voice.channel.id
    )
  ) {
    return message.channel.send(
      "Your voice channel is already a main voice channel"
    );
  }
  const options = {
    childAutoDeleteIfEmpty: true,
    childAutoDeleteIfOwnerLeaves: true,
    childMaxUsers: 3,
    childBitrate: 64000,
    childFormat: (member, count) =>
      `#${count} | ${member.user.username}'s lounge`,
  };
  tempChannels.registerChannel(message.member.voice.channel.id, options);
  tempvcdb.query("temp-channels", {
    channelID: message.member.voice.channel.id,
    options: options,
  });
  message.channel.send("Your voice is now a main voice channel!");
*/
};

module.exports.help = {
  name: "settempvc",
  category: "admin",
  discription: "set temp vc",
};
