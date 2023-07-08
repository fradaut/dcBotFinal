import { Client } from 'discord.js';
import dotenv from 'dotenv';

import IntentOptions from './config/IntentOptions.js';
import connectDatabase from './database/connectDatabase.js';
import validateEnv from './utils/validateEnv.js';

dotenv.config();

(async () => {
  if (!validateEnv()) return;

  const BOT = new Client({ intents: IntentOptions });

  await connectDatabase();
  await BOT.login(process.env.TOKEN);
})();
