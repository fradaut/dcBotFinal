import { ChannelType, CommandInteraction, SlashCommandBuilder } from 'discord.js';
import autocompleteData from '../../events/onInteraction/autocompleteData.js';
import modelMap from '../../database/modelMap.js';

export const command = new SlashCommandBuilder()
  .setName('bot')
  .setDescription('機器人相關設定')
  .addStringOption((option) => option.setName('type')
    .setDescription('選擇需要進行設定的類別')
    .setRequired(true)
    .setAutocomplete(true))
  .addStringOption((option) => option.setName('key')
    .setDescription('選擇需要更改的key')
    .setRequired(true)
    .setAutocomplete(true))
  .addStringOption((option) => option.setName('value')
    .setDescription('輸入新的值')
    .setRequired(true));

export const run = async (interaction: CommandInteraction) => {
  await interaction.deferReply({ ephemeral: true });

  if (interaction.channel?.type === ChannelType.DM) {
    interaction.followUp('此命令無法在私訊使用');
    return;
  }

  const key = interaction.options.get('key')!.value as string;
  const { value } = (interaction.options.get('value')!);

  if (!autocompleteData.get('database')!.includes(key)) {
    interaction.followUp({ content: `輸入的 ${key} 不存在`, ephemeral: true });
    return;
  }

  const model = modelMap.get(key)!;

  model.findOneAndUpdate(
    { guildID: interaction.guildId },
    { [key]: value },
    { new: true, useFindAndModify: false },
  ).then((doc) => {
    if (doc) {
      interaction.followUp({ content: `已將 ${key} 更改為 ${value}`, ephemeral: true });
    } else {
      interaction.followUp({ content: '此伺服器尚未初始化, 請使用 initial 指令進行設定', ephemeral: true });
    }
  }).catch((error) => {
    console.error(error);
    interaction.followUp({ content: '發生錯誤', ephemeral: true });
  });
};
