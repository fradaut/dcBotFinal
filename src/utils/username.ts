import { User } from 'discord.js';

const usertag = (user: User): string => {
  if (user.tag.endsWith('#0')) {
    return user.tag.slice(0, -2);
  }
  return user.tag;
};

export default usertag;
