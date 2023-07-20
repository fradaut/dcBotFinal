import { CommandInteraction } from 'discord.js';

const checkGuild = (interaction: CommandInteraction): boolean => {
  if (!interaction.inGuild()) {
    interaction.followUp('此命令只允許在伺服器中使用');
    return false;
  }
  return true;
};

export default checkGuild;
