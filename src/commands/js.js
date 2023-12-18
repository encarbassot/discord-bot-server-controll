import { ApplicationCommandOptionType } from "discord.js";

export const name = "js";
export const description = "execute JS commands";
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

  await interaction.reply(command + "\n" + eval(command));
}
