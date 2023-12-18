export const name = "ping";
export const description = "Pong!";

export async function callback(client, interaction) {
  const reply = await interaction.reply("Pong!");

  const ping = reply.createdTimestamp - interaction.createdTimestamp;

  interaction.editReply(
    `Pong! Client ${ping}ms | Websocket: ${client.ws.ping}ms`
  );
}
