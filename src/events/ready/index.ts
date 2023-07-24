import { Client, ClientUser, Events } from 'discord.js';
import updateOnlineCount from './updateOnlineCount.js';

export const event = {
  name: Events.ClientReady,
  isOnce: true,
  hasClient: true,
};

export const action = async (client: Client) => {
  console.log(`Ready! Logged in as ${(client.user as ClientUser).tag}`);
  setInterval(() => { updateOnlineCount(client); }, 60000);
};
