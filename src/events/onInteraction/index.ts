import { CommandInteraction, Events } from 'discord.js';
import CommandList from '../../commands/_CommandList.js';
import autocomplete from './autocomplete.js';

export const event = {
  name: Events.InteractionCreate,
  isOnce: false,
  hasClient: false,
};

export const action = async (interaction: CommandInteraction) => {
  if (interaction.isChatInputCommand()) {
    const run = CommandList.get(interaction.commandName);

    await run!(interaction);
  } else if (interaction.isAutocomplete()) {
    autocomplete(interaction);
  }
};
