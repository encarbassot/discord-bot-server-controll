// Slash Commands Deployment Script
// https://discordjs.guide/creating-your-bot/command-deployment.html#guild-commands/

// Importing modules using ES6 syntax
import { REST, Routes } from "discord.js";
import { config } from "dotenv";

import { commands } from "./index.js";

config(); // Using dotenv config function directly

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

try {
  console.log(
    `Started refreshing application ${commands.length} (/) commands.`
  );
  console.log(commands.map((x) => x.name));

  await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
    body: commands,
  });

  console.log(
    `Successfully reloaded application ${commands.length} (/) commands.`
  );
} catch (error) {
  console.error(error);
}
