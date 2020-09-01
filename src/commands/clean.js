const _ = require("lodash");
const logger = require("../config/logger");


const client = require("../app");

module.exports = {
  name: "cleanrole",
  aliases: ["cr"],
  cooldown: 20,
  description: "Tools for reset roles for existing users",
  async execute(message, args) {
    logger.info(`Clean users roles for ${args}`);

    if(args.size <= 0) {
      message.reply("You need to give at least one role id as parameters");
      return;
  }

    message.guild.members.fetch().then(fetchedMembers => {
      fetchedMembers.forEach(member => args.forEach(roleID => member.roles.remove(roleID)));
      message.reply(`Removed role ${args} for ${fetchedMembers.size} members`);
    });
  },
};