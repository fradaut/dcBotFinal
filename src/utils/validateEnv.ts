const validateEnv = (): boolean => {
  let valid: boolean = true;
  if (!process.env.TOKEN) {
    console.warn('Missing Discord bot token. Set it in .env file');
    valid = false;
  }

  if (!process.env.MONGO_URI) {
    console.warn('Missing MongoDB URI. Set it in .env file');
    valid = false;
  }
  return valid;
};

export default validateEnv;
