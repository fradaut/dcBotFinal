import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

export const command = new SlashCommandBuilder()
  .setName('avatar')
  .setDescription('獲取使用者頭像')
  .addStringOption((option) => option.setName('userid')
    .setDescription('使用者ID')
    .setRequired(true));

export const run = async (interaction: CommandInteraction) => {
  await interaction.deferReply({ ephemeral: true });

  const userId = interaction.options.get('userid')!.value as string;
  const user = interaction.client.users.cache.get(userId);

  if (!user) {
    await interaction.reply('找不到該使用者');
    return;
  }

  const avatarUrl = user.displayAvatarURL({ extension: 'webp', forceStatic: false });

  await interaction.followUp(avatarUrl);
};
