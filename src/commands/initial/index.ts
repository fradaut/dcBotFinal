import { ChannelType, CommandInteraction, SlashCommandBuilder } from 'discord.js';
import GuildChannel from '../../database/models/GuildChannel.js';
import GuildRole from '../../database/models/GuildRole.js';

export const command = new SlashCommandBuilder()
  .setName('initial')
  .setDescription('初始化各項設定')
  .addStringOption((option) => option.setName('channel_welcome-id')
    .setDescription('發送歡迎訊息的頻道')
    .setRequired(true))
  .addStringOption((option) => option.setName('channel_leave-id')
    .setDescription('發送離開訊息的頻道')
    .setRequired(true))
  .addStringOption((option) => option.setName('channel_memberonline-id')
    .setDescription('顯示狀態為線上的成員數量頻道')
    .setRequired(true))
  .addStringOption((option) => option.setName('channel_membercount-id')
    .setDescription('顯示成員總數的頻道')
    .setRequired(true))
  .addStringOption((option) => option.setName('channel_messagedelete-id')
    .setDescription('顯示被刪除的訊息頻道')
    .setRequired(true))
  .addStringOption((option) => option.setName('channel_voicecreate-id')
    .setDescription('進入後會創建新語音房的頻道')
    .setRequired(true))
  .addStringOption((option) => option.setName('category_voicecreate-id')
    .setDescription('創現新語音頻道的類別ID')
    .setRequired(true))

  .addStringOption((option) => option.setName('role_admin-id')
    .setDescription('擁有機器人所有權限的身分組')
    .setRequired(true));

export const run = async (interaction: CommandInteraction) => {
  await interaction.deferReply({ ephemeral: true });

  if (interaction.channel?.type === ChannelType.DM) {
    interaction.followUp('此命令無法在私訊使用');
    return;
  }

  const initialGuildChannel = new GuildChannel({
    guildID: interaction.guildId,
    channelWelcomeID: interaction.options.get('channel_welcome-id')!.value,
    channelLeaveID: interaction.options.get('channel_leave-id')!.value,
    channelMemberOnlineID: interaction.options.get('channel_memberonline-id')!.value,
    channelMemberCountID: interaction.options.get('channel_membercount-id')!.value,
    channelMessageDeleteID: interaction.options.get('channel_messagedelete-id')!.value,
    channelVoiceCreateID: interaction.options.get('channel_voicecreate-id')!.value,
    categoryVoiceCreateID: interaction.options.get('category_voicecreate-id')!.value,
  });

  const initialAdminRole = new GuildRole({
    guildID: interaction.guildId,
    roleAdminID: interaction.options.get('role_admin-id')!.value,
  });

  Promise.all([initialGuildChannel.save(), initialAdminRole.save()])
    .then(() => {
      interaction.followUp({ content: '初始化成功', ephemeral: true });
    })
    .catch((err) => {
      if (err.code === 11000) {
        interaction.followUp({ content: '此伺服器已經初始化過了, 請使用 bot 指令進行設定', ephemeral: true });
      } else {
        console.error(err);
        interaction.followUp({ content: '發生錯誤', ephemeral: true });
      }
    });
};
