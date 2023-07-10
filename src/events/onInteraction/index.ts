import { CommandInteraction, Events } from 'discord.js';
import CommandList from '../../commands/_CommandList.js';

export const event = {
  name: Events.InteractionCreate,
  isOnce: false,
  hasClient: false,
};

export const action = async (interaction: CommandInteraction) => {
  if (interaction.isChatInputCommand()) {
    const run = CommandList.get(interaction.commandName);

    await run?.(interaction);
  }
};
