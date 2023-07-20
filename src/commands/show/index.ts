import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import GuildChannel from '../../database/models/GuildChannel.js';
import GuildRole from '../../database/models/GuildRole.js';
import validateRole from '../../utils/validateRole.js';
import checkGuild from '../../utils/checkGuild.js';

const getChannel = (interaction: CommandInteraction, channelID: string) => {
  const channel = interaction.guild!.channels.cache.get(channelID);
  return channel ? `<#${channel.id}>` : channelID;
};
const getCategory = (interaction: CommandInteraction, categoryID: string) => {
  const category = interaction.guild!.channels.cache.get(categoryID);
  return category ? `${category.name}` : categoryID;
};
const getRole = (interaction: CommandInteraction, roleID: string) => {
  const role = interaction.guild!.roles.cache.get(roleID);
  return role ? `<@&${role.id}>` : roleID;
};

export const command = new SlashCommandBuilder()
  .setName('show')
  .setDescription('顯示資料庫資訊');

export const run = async (interaction: CommandInteraction) => {
  await interaction.deferReply();

  if (!checkGuild(interaction)) return;
  if (!await validateRole(interaction)) return;

  try {
    const guildChannelDoc = await GuildChannel.findOne({ guildID: interaction.guildId });
    const guildRoleDoc = await GuildRole.findOne({ guildID: interaction.guildId });

    if (!guildChannelDoc || !guildRoleDoc) {
      interaction.followUp('此伺服器尚未初始化, 請使用 initial 指令進行設定');
      return;
    }

    interaction.followUp(`伺服器ID: ${guildChannelDoc!.guildID}
歡迎頻道: ${getChannel(interaction, guildChannelDoc!.channelWelcomeID)}
離開頻道: ${getChannel(interaction, guildChannelDoc!.channelLeaveID)}
線上成員頻道: ${getChannel(interaction, guildChannelDoc!.channelMemberOnlineID)}
成員總數頻道: ${getChannel(interaction, guildChannelDoc!.channelMemberCountID)}
被刪除訊息頻道: ${getChannel(interaction, guildChannelDoc!.channelMessageDeleteID)}
創建語音頻道頻道: ${getChannel(interaction, guildChannelDoc!.channelVoiceCreateID)}
創建語音頻道類別: ${getCategory(interaction, guildChannelDoc!.categoryVoiceCreateID)}
管理員身分組: ${getRole(interaction, guildRoleDoc!.roleAdminID)}`);
  } catch (error) {
    console.error(error);
    interaction.followUp({ content: '發生錯誤, 請聯絡開發者', ephemeral: true });
  }
};
