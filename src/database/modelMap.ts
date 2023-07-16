import { Model } from 'mongoose';
import GuildChannel from './models/GuildChannel.js';
import GuildRole from './models/GuildRole.js';

const modelMap = new Map<string, Model<any>>([
  ['channelWelcomeID', GuildChannel],
  ['channelLeaveID', GuildChannel],
  ['channelMemberOnlineID', GuildChannel],
  ['channelMemberCountID', GuildChannel],
  ['channelMessageDeleteID', GuildChannel],
  ['channelVoiceCreateID', GuildChannel],
  ['categoryVoiceCreateID', GuildChannel],

  ['roleAdminID', GuildRole],
]);

export default modelMap;
