import { exec } from "child_process";
import { ApplicationCommandOptionType } from "discord.js";

export const name = "bash";
export const description = "bash console";
export const restricted = true;
export const options = [
  {
    name: "command",
    description: "Command",
    type: ApplicationCommandOptionType.String,
    required: true,
  },
];

export async function callback(client, interaction) {
  const command = interaction.options.getString("command");

  exec(command, (err, stdout, stderr) => {
    if (err) {
      //some err occurred
      interaction.reply(err.toString());
    } else {
      let result = command + "\n";
      if (stderr) result += "ERR: " + stderr;

      result += stdout;
      interaction.reply(result);
    }
  });
}
