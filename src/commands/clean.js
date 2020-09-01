const _ = require("lodash");
const logger = require("../config/logger");


const client = require("../app");

module.exports = {
  name: "cleanrole",
  aliases: ["cr"],
  cooldown: 20,
  description: "Tools for reset roles for existing users",
  async execute(message, args) {
    /*if (!message.member.hasPermission("ADMINISTRATOR")) {
      return;
    }*/
    logger.info(`Clean users roles for ${args[0]}`);

    if(args[0] ==null) {
        message.reply("You need to give the role id as parameters");
        return;
    }

    message.guild.members.fetch().then(fetchedMembers => {
      fetchedMembers.forEach(member => member.roles.remove(args[0]));
      message.reply(`Removed role ${args[0]} for ${fetchedMembers.size} members`);
    });
  },
};