const Discord = require("discord.js");
const chalk = require("chalk");
const fs = require("fs");

const logger = require("./config/logger");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const prefix = "!!";

const commandFiles = fs
  .readdirSync("./src/commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on("ready", () => {
  console.log(chalk.cyan(`Logged in as ${client.user.tag}!`));
});

client.on("message", async (message) => {
  if (!message.content.startsWith(prefix) && message.author.bot) return;

  logger.info(
    `message guildID: ${message.member.guild.id}, message: ${message.content}`
  );

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply("there was an error trying to execute that command!");
  }
});

client.login(process.env.DISCORD_TOKEN);

module.exports.client = () => client;
