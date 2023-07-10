import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

export interface Command {
  command: SlashCommandBuilder;
  run: (interaction: CommandInteraction) => Promise<void>;
}
