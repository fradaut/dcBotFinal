import {
  CommandInteraction, DMChannel, NewsChannel, SlashCommandBuilder, TextChannel, ThreadChannel,
} from 'discord.js';
import checkGuild from '../../utils/checkGuild.js';

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

  const messageid = interaction.options.get('messageid')!.value as string;
  const targetid = interaction.options.get('targetid')!.value as string;

  const message = await interaction.channel!.messages.fetch(messageid);

  if (!message) {
    interaction.followUp('指定的訊息不存在');
  }

  interaction.guild!.channels.fetch(targetid)
    .catch(() => interaction.guild!.members.fetch(targetid).then((user) => user.createDM()))
    .then(async (channel) => {
      if (!channel) {
        interaction.followUp('指定的頻道或使用者不存在');
        return;
      }

      if (channel instanceof TextChannel
        || channel instanceof DMChannel
        || channel instanceof NewsChannel
        || channel instanceof ThreadChannel) {
        channel.send(message.content).then(() => interaction.followUp('發送成功'));
        return;
      }

      interaction.followUp('指定的頻道不是文字頻道');
    })
    .catch((error) => {
      console.error(error.message);
      interaction.followUp('發生錯誤，請稍後再試');
    });
};
