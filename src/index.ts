import { Client } from 'discord.js';
import dotenv from 'dotenv';

import IntentOptions from './config/IntentOptions.js';

dotenv.config();

(async () => {
  const BOT = new Client({ intents: IntentOptions });

  await BOT.login(process.env.TOKEN);
})();
