import { CommandInteraction, SlashCommandBuilder } from 'discord.js';
import autocompleteData from '../../events/onInteraction/autocompleteData.js';
import modelMap from '../../database/modelMap.js';
import validateRole from '../../utils/validateRole.js';
import checkGuild from '../../utils/checkGuild.js';

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
  await interaction.deferReply();

  if (!checkGuild(interaction)) return;
  if (!await validateRole(interaction)) return;

  const key = interaction.options.get('key')!.value as string;
  const { value } = (interaction.options.get('value')!);

  if (!autocompleteData.get('database')!.includes(key)) {
    interaction.followUp(`${key} 不存在資料庫中.`);
    return;
  }

  const model = modelMap.get(key)!;

  model.findOneAndUpdate(
    { guildID: interaction.guildId },
    { [key]: value },
    { new: true, useFindAndModify: false },
  ).then((doc) => {
    if (doc) {
      interaction.followUp(`已將 ${key} 更改為 ${value}`);
    } else {
      interaction.followUp('此伺服器尚未初始化, 請使用 initial 指令進行設定');
    }
  }).catch((error) => {
    console.error(error);
    interaction.followUp('發生錯誤');
  });
};
