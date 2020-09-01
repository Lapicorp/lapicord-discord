const _ = require("lodash");
const logger = require("../config/logger");


const client = require("../app");

module.exports = {
  name: "givetoall",
  aliases: ["ga"],
  cooldown: 20,
  description: "Tools for put a role to all members",
  async execute(message, args) {
    logger.info(`Add role to all users for roleID ${args[0]}`);

    if(args[0] ==null) {
        message.reply("You need to give the role id as parameters");
        return;
    }
    
    message.guild.members.fetch().then(fetchedMembers => {
      fetchedMembers.forEach(member => member.roles.add(args[0]));
      message.reply(`Added role ${args[0]} for ${fetchedMembers.size} members`);
    });
  },
};