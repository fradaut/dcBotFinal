import {
  CommandInteraction, DMChannel, NewsChannel, SlashCommandBuilder, TextChannel, ThreadChannel,
} from 'discord.js';
import checkGuild from '../../utils/checkGuild.js';
import getChannels from './getChannels.js';
import validateRole from '../../utils/validateRole.js';

export const command = new SlashCommandBuilder()
  .setName('say')
  .setDescription('發送指定訊息至頻道或玩家')
  .addStringOption((option) => option.setName('targetid')
    .setDescription('目標ID')
    .setRequired(true))
  .addStringOption((option) => option.setName('messageid')
    .setDescription('訊息ID')
    .setRequired(true));

export const run = async (interaction: CommandInteraction) => {
  await interaction.deferReply({ ephemeral: true });

  if (!checkGuild(interaction)) return;
  if (!await validateRole(interaction)) return;

  const messageid = interaction.options.get('messageid')!.value as string;
  const targetid = interaction.options.get('targetid')!.value as string;

  const message = await interaction.channel!.messages.fetch(messageid);
  if (!message) {
    interaction.followUp('指定的訊息不存在');
    return;
  }

  const channels = await getChannels(targetid, interaction);
  if (channels.length === 0) {
    await interaction.followUp('指定的頻道或使用者不存在');
    return;
  }

  try {
    await Promise.all(channels.map(async (channel) => {
      if (channel instanceof TextChannel
      || channel instanceof DMChannel
      || channel instanceof NewsChannel
      || channel instanceof ThreadChannel) {
        try {
          await channel.send(message.content);
        } catch (error) {
          await interaction.followUp('訊息發送錯誤');
          console.error(error);
          throw error;
        }
      } else {
        await interaction.followUp('指定的頻道不是文字頻道');
      }
    }));

    await interaction.followUp('發送成功');
  } catch (error) {
    console.error('迴圈已中斷', error);
  }
};
