import { Collection, CommandInteraction } from 'discord.js';

type CommandRun = (interaction: CommandInteraction) => Promise<void>;

const CommandList: Collection<string, CommandRun> = new Collection();

export default CommandList;
