const discord = require("discord.js");

module.exports = {
  name: "invite",
  category: "info",
  description: "pro op",
  run: async (client, message, args) => {
    
    let embed = new discord.MessageEmbed()
    .setTitle(`Links`)
    .setDescription(`[Add to server](https://discord.com/oauth2/authorize?client_id=808273298235457607&scope=bot&permissions=2147483647) Or [Community server ](https://discord.gg/C4qJRx6JbN)`)
    .setColor("GREEN")
    .setFooter(`pro op`)
    .setTimestamp(message.timestamp = Date.now())
    
    message.channel .send(embed)
    
  
  }
}