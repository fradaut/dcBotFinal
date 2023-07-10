import {
  REST, Client, SlashCommandBuilder, Routes, CommandInteraction,
} from 'discord.js';
import fg from 'fast-glob';
import path from 'path';
import { Command } from '../interfaces/Command.js';
import CommandList from '../commands/_CommandList.js';

const updateSlashCommands = async (commands: SlashCommandBuilder[]) => {
  const rest = new REST({ version: '10' }).setToken(process.env.TOKEN as string);

  await rest.put(
    Routes.applicationCommands(
      process.env.CLIENT_ID as string,
    ),
    {
      body: commands,
    },
  );
};

const loadCommands = async () => {
  const commands: SlashCommandBuilder[] = [];
  const files = await fg('./src/commands/**/index.ts');

  await Promise.all(files.map(async (file) => {
    const cmd: Command = await import(path.resolve(file));
    commands.push(cmd.command);
    CommandList.set(cmd.command.name, cmd.run);
  }));

  await updateSlashCommands(commands);
};

const loadEvents = async (client: Client) => {
  const files = await fg('./src/events/**/index.ts');

  await Promise.all(files.map(async (file) => {
    const eventFile = await import(path.resolve(file));

    const { name, isOnce, hasClient } = eventFile.event;
    const action = hasClient
      ? (interaction: CommandInteraction) => eventFile.action(client, interaction)
      : (interaction: CommandInteraction) => eventFile.action(interaction);

    if (isOnce) {
      client.once(name, action);
    } else {
      client.on(name, action);
    }
  }));
};

const loader = async (client: Client) => {
  await loadCommands();
  await loadEvents(client);
};

export default loader;
