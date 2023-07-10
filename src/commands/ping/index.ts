import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

export const command = new SlashCommandBuilder()
  .setName('ping')
  .setDescription('回應測試');

export const run = async (interaction: CommandInteraction) => {
  const sent = await interaction.reply({ content: 'Pinging...', fetchReply: true });
  const ping = sent.createdTimestamp - interaction.createdTimestamp;
  interaction.editReply(`延遲為 ${ping}ms`);
};
