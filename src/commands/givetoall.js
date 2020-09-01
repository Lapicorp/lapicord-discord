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

    if(args.size <= 0) {
        message.reply("You need to give at least one role id as parameters");
        return;
    }
    
    message.guild.members.fetch().then(fetchedMembers => {
        fetchedMembers.forEach(member => args.forEach(roleID => member.roles.add(roleID)));
      message.reply(`Added role ${args} for ${fetchedMembers.size} members`);
    });
  },
};