import {
  Channel, Client, Message, TextChannel,
} from 'discord.js';
import usertag from '../../utils/username.js';

const getChannel = (client:Client, channelId: string) => {
  const cachedChannel: Channel | undefined = client.channels.cache.get(channelId);

  if (cachedChannel) return cachedChannel;

  return client.channels.fetch(channelId)
    .then((fetchedChannel: Channel | null) => fetchedChannel)
    .catch(() => undefined);
};

const messageDM = (client: Client, message: Message) => {
  if (message.author.bot) return;

  const channelId: string | undefined = process.env.DM_CHANNEL_ID as string;
  if (!channelId) return;

  const channel = getChannel(client, channelId);
  if (!channel) return;
  if (!(channel instanceof TextChannel)) return;

  channel.send(`回覆自 ${usertag(message.author)}:\n${message.content.replace(/`/g, '\\`')}`);
};
export default messageDM;
