const discord = require("discord.js")
const hastebin = require('hastebin')
const date = require('date-and-time')
module.exports = {
  name: "close",
  aliases: [],
  description: "Close a ticket",
  category: "ticket",
  run: async (client, message, args) => {
    if(!message.channel.name.startsWith("ticket-")) return message.channel.send("This is not a ticket channel")
    
    let reason = args.slice(0).join(" ")
    if(!reason) reason = "Unspecified"
    
    let logchannel = message.guild.channels.cache.find(ch => ch.name === "ticket-logs")
    if(!logchannel) return message.channel.send("ticket-logs was not found")
    
    message.channel.messages.fetch() 
    .then(messages => {
      let text = ""
      
      for(let [key, value] of messages) {
        const now = new Date()
        let dateString = `${date.format(now, 'YYYY/MM/DD HH:mm:ss', true)}`;
        text += `${dateString} | ${value.author.tag}: ${value.content}\n`;
      }
      
      hastebin.createPaste(text, {
        raw: true,
        content: "text/plain",
        server: "https://hastebin.com"
      }).then(data => {
        const embed = new discord.MessageEmbed()
        .setTitle("Ticket Closed")
        .addField("**Information**", `User: ${message.author}\nReason: ${reason}\nTranscript: [Here](${data})`)
        
        message.channel.delete()
        
        logchannel.send(embed)
      })
    })
  }
}