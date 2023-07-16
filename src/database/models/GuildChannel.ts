import { Schema, model } from 'mongoose';

export interface GuildChannelInfo {
  guildID: string;
  channelWelcomeID: string;
  channelLeaveID: string;
  channelMemberOnlineID: string;
  channelMemberCountID: string;
  channelMessageDeleteID: string;
  channelVoiceCreateID: string;
  categoryVoiceCreateID: string;
}

export const GuildChannel = new Schema({
  guildID: { type: String, require: true, unique: true },
  channelWelcomeID: String,
  channelLeaveID: String,
  channelMemberOnlineID: String,
  channelMemberCountID: String,
  channelMessageDeleteID: String,
  channelVoiceCreateID: String,
  categoryVoiceCreateID: String,
});

export default model<GuildChannelInfo>('GuildChannel', GuildChannel);
