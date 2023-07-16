import { AutocompleteInteraction } from 'discord.js';
import autocompleteData from './autocompleteData.js';

const getChoices = (interaction: AutocompleteInteraction): string[] | undefined => {
  const focusedOption = interaction.options.getFocused(true);

  if (focusedOption.name === 'type') {
    return autocompleteData.get(focusedOption.name);
  }
  if (focusedOption.name === 'key') {
    const category = interaction.options.getString('type', true);
    return autocompleteData.get(category);
  }

  return undefined;
};

const autocomplete = async (interaction: AutocompleteInteraction) => {
  const choices = getChoices(interaction);

  if (!choices) return;

  const focusedOption = interaction.options.getFocused(true);
  const filtered = choices.filter((value) => value.startsWith(focusedOption.value));

  await interaction.respond(filtered.map((value) => ({ name: value, value })));
};

export default autocomplete;
