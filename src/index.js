import { config } from "dotenv";
config();
import { Client, Events, GatewayIntentBits, ActivityType } from "discord.js";

import { checkIPupdate } from "./utils/ip.js";

import * as command_ping from "./commands/ping.js";
import * as command_ip from "./commands/ip.js";
import * as command_bash from "./commands/bash.js";
import * as command_js from "./commands/js.js";

export const commands = [command_ping, command_ip, command_bash, command_js];

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const ipUpdates = await checkIPupdate()
console.log(ipUpdates)





client.on(Events.ClientReady, () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity({ name: "Minecraft", type: ActivityType.Playing });


  client.users.fetch('568761587595214851').then( (channel) => {
    channel.send(`Server has started\n` + (ipUpdates.hasChanged?`IP HAS CHANGED!\n${ipUpdates.ip}\nit hasn't changed since ${ipUpdates.date}`:`No ip changes.`))
  })
  

  
});

client.on(Events.InteractionCreate, (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.user.id !== process.env.ADMIN_ID) {
    interaction.reply("You are not my father.");
    return;
  }

  for (const command of commands) {
    if (command.name === interaction.commandName) {
      command.callback(client, interaction);
      return;
    }
  }
});

client.login(process.env.TOKEN);



// send message "Server is booted"