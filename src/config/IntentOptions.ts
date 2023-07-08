import { type GatewayIntentsString } from 'discord.js';

const IntentOptions: GatewayIntentsString[] = [
  'Guilds',
  'GuildMessages',
  'GuildMembers',
  'MessageContent',
  'GuildPresences',
  'GuildVoiceStates'];

export default IntentOptions;
