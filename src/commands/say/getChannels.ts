import { Channel, CommandInteraction } from 'discord.js';

const getChannels = async (targetid: string, interaction: CommandInteraction) => {
  let channels: Channel[] = [];

  const channel = await interaction.guild!.channels.fetch(targetid).catch(() => null);
  if (channel) {
    channels.push(channel);
    return channels;
  }

  const user = await interaction.guild!.members.fetch(targetid).catch(() => null);
  if (user) {
    const dmChannel = await user.createDM();
    channels.push(dmChannel);
    return channels;
  }

  const role = await interaction.guild!.roles.fetch(targetid).catch(() => null);
  if (role) {
    const members = Array.from(role.members.values());
    channels = await Promise.all(members.map((member) => member.createDM()));
  }

  return channels;
};

export default getChannels;
