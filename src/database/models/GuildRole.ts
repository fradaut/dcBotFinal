import { Schema, model } from 'mongoose';

export interface GuildRoleInfo {
  guildID: string;
  roleAdminID: string;
}

export const GuildRole = new Schema({
  guildID: { type: String, require: true, unique: true },
  roleAdminID: String,
});

export default model<GuildRoleInfo>('GuildRole', GuildRole);
