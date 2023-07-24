import { Client } from 'discord.js';
import GuildChannel from '../../database/models/GuildChannel.js';

const updateOnlineCount = (client: Client) => {
  const delay = 1000;
  let index = 0;
  client.guilds.cache.each(async (guild) => {
    setTimeout(async () => {
      try {
        const guildChannelDoc = await GuildChannel.findOne({ guildID: guild.id });
        if (!guildChannelDoc) return;

        const members = await guild.members.fetch();
        const onlineMembers = members.filter((member) => member.presence?.status === 'online');

        const onlineCountChannel = guild.channels.cache.get(guildChannelDoc.channelMemberOnlineID);

        await onlineCountChannel!.setName(`🟢╏線上人數︰${onlineMembers.size}`);
      } catch (error) {
        console.error(`Failed to update online count for guild ${guild.id}: ${error}`);
      }
    }, index * delay);
    index += 1;
  });
};

export default updateOnlineCount;
