import { Client } from 'discord.js';
import dotenv from 'dotenv';

import IntentOptions from './config/IntentOptions.js';
import connectDatabase from './database/connectDatabase.js';
import validateEnv from './utils/validateEnv.js';
import loader from './core/loader.js';
import PartialOptions from './config/PartialOptions.js';

dotenv.config();

(async () => {
  if (!validateEnv()) return;

  const BOT = new Client({ partials: PartialOptions, intents: IntentOptions });

  await loader(BOT);

  await connectDatabase();

  BOT.login(process.env.TOKEN);
})();
