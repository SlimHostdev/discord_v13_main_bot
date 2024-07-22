const discord = require("discord.js");
//const log = require("./src/function/util");
//File server
const fs = require("fs");
//Taal van de bot
const language = JSON.parse(
  fs.readFileSync(`./language/${process.env.LANGUAGES}.json`, "utf-8")
);

module.exports.run = async (client, message, args) => {
  if (!message.member.roles.cache.has(`${process.env.ADMINROLL}`))
    return message.reply(`${language.no_admin}`);

  const m = await message.channel.send("Ping?");

  var botEmbed = new discord.MessageEmbed()
    .setTitle(`${language.cmd_ping_title}`)
    .setDescription(`${language.cmd_ping_disc}`)
    .setColor(process.env.COLLOR)
    .setThumbnail(process.env.LOGO)
    .setImage(process.env.BANNER)
    .setTimestamp()
    .setFooter(`${language.cmd_ping_footer}`)
    .addFields(
      { name: `${language.cmd_ping_name}`, value: client.user.username },
      {
        name: `${language.cmd_ping_latency}`,
        value: `${m.createdTimestamp - message.createdTimestamp}ms.`,
      }
    );

  return message.channel.send({ embeds: [botEmbed] }).then((msg) => {
    console.log(
      `Ping command is gebruikt\n ${
        m.createdTimestamp - message.createdTimestamp
      }ms.`
    );
    message.delete();
    m.delete();
    setTimeout(() => msg.delete(), 10000);
  });
};

module.exports.help = {
  name: "ping",
  category: "admin",
  discription: language.cmd_ping_disc,
};
