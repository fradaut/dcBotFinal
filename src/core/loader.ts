// import { REST } from 'discord.js';
import { Client } from 'discord.js';
import fg from 'fast-glob';
import path from 'path';

// const updateSlashCommands = async (commands) => {
//   const rest = new REST({ version: '10' }).setToken('token');

//   await rest.put();
// };

const loadEvents = async (client: Client) => {
  const files = await fg('./src/events/**/index.ts');

  await Promise.all(files.map(async (file) => {
    const eventFile = await import(path.resolve(file));

    const { name, isOnce, hasClient } = eventFile.event;
    const action = hasClient ? () => eventFile.action(client) : () => eventFile.action();

    if (isOnce) {
      client.once(name, action);
    } else {
      client.on(name, action);
    }
  }));
};

const loader = async (client: Client) => {
  // await loadCommands(client);
  await loadEvents(client);
};

export default loader;
