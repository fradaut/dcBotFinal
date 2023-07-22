import {
  Client, DMChannel, Events, Message,
} from 'discord.js';
import messageDM from './messageDM.js';

export const event = {
  name: Events.MessageCreate,
  isOnce: false,
  hasClient: true,
};

export const action = async (client: Client, message: Message) => {
  if ((message.channel instanceof DMChannel)) messageDM(client, message);
};
