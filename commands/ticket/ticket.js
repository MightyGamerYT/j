const discord = require("discord.js")
const randoString = require("randostrings")
const random = new randoString()
module.exports = {
  name: "ticket",
  aliases: ["create"],
  description: "Create a ticket in the server",
  category: "ticket",
  run: async (client, message, args) => {
    let reason = args.slice(0).join(" ")
    if(!reason) reason = "Unspecified"
    
    let role = message.guild.roles.cache.find(rl => rl.name === "mod")
    if(!role) return message.channel.send("Role 'Support Team' not found")
    
    let everyone = message.guild.roles.everyone //the everyone role
    
    let number = random.numberGenerator({
      min: 11111,
      max: 99999
    })
    
    let name = `ticket-${number}`
    
    message.guild.channels.create(name, {type: "text"}).then(chan => {
      chan.updateOverwrite(message.author, {
        VIEW_CHANNEL: true,
        SEND_MESSAGES: true,
        READ_MESSAGES: true,
        ATTACH_FILE: true,
        READ_MESSAGE_HISTORY: true,
      })
      chan.updateOverwrite(role, {
        VIEW_CHANNEL: true,
        SEND_MESSAGES: true,
        READ_MESSAGES: true,
        ATTACH_FILE: true,
        READ_MESSAGE_HISTORY: true,
      })
      chan.updateOverwrite(everyone, {
        READ_MESSAGES: false,
        VIEW_CHANNEL: false
      })
      
      chan.send(new discord.MessageEmbed().setColor("GREEN").setTitle("New ticket").addField("Info", `User: ${message.author}\nReason: ${reason}`))
      
      message.channel.send(`Ticket Created. ${chan}`)
    })
  }
}