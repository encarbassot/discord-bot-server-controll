import axios from "axios";

export const name = "ip";
export const description = "Replies with current IP address";
export const restricted = true;

export async function callback(client, interaction) {
  const ip = await myIP();
  await interaction.reply(ip);
}

export async function myIP() {
  const { data } = await axios("https://api.ipify.org/");
  return data;
}
