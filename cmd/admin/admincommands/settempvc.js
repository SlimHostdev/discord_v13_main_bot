const discord = require("discord.js");
//File server
const fs = require("fs");
//Taal van de bot
const language = JSON.parse(
  fs.readFileSync(`./language/${process.env.LANGUAGES}.json`, "utf-8")
);

const tempvcdb = require("quick.db");

module.exports.run = async (client, message, args) => {
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
    chiltempvcdbitrate: 64000,
    childFormat: (member, count) =>
      `#${count} | ${member.user.username}'s lounge`,
  };
  tempChannels.registerChannel(message.member.voice.channel.id, options);
  tempvcdb.push("temp-channels", {
    channelID: message.member.voice.channel.id,
    options: options,
  });
  message.channel.send("Your voice is now a main voice channel!");
};

module.exports.help = {
  name: "settempvc",
  category: "admin",
  discription: "set temp vc",
};
