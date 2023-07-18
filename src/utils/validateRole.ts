import { CommandInteraction, GuildMember } from 'discord.js';
import GuildRole from '../database/models/GuildRole.js';

const validateRole = async (interaction: CommandInteraction): Promise<boolean> => {
  const guildRoleDoc = await GuildRole.findOne({ guildID: interaction.guildId });

  if (!guildRoleDoc) {
    interaction.followUp('此伺服器尚未初始化, 請使用 initial 指令進行設定');
    return false;
  }

  const member = interaction.member as GuildMember;

  if (!member.roles.cache.has(guildRoleDoc.roleAdminID)) {
    interaction.followUp('你沒有權限使用此指令');
    return false;
  }
  return true;
};

export default validateRole;
