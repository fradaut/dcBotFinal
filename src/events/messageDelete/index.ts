import {
  Client, EmbedBuilder, Events, Message, TextChannel,
} from 'discord.js';
import GuildChannel from '../../database/models/GuildChannel.js';

export const event = {
  name: Events.MessageDelete,
  isOnce: false,
  hasClient: true,
};

export const action = async (client: Client, message: Message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  const guildChannelDoc = await GuildChannel.findOne({ guildID: message.guildId });
  if (!guildChannelDoc) return;

  const avatar = message.author.displayAvatarURL({ extension: 'webp', forceStatic: false });
  const name = message.member ? message.member : message.author.username;
  const channel = client.channels.cache.get(guildChannelDoc.channelMessageDeleteID);

  if (!channel) return;

  const embed = new EmbedBuilder()
    .setColor(0xde14a2)
    .setThumbnail(avatar)
    .setFields(
      { name: '時間', value: `${new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })}`, inline: true },
      { name: '來自', value: `${name}`, inline: true },
      { name: '頻道', value: `${message.channel}`, inline: false },
    );

  // 處理過長的訊息
  if (message.content) {
    const content = message.content.length > 1024 ? `${message.content.slice(0, 1021)}...` : message.content;
    embed.addFields({ name: '訊息內容', value: content });
  }
  // 處理附加檔案和圖片
  if (message.attachments.size > 0) {
    const firstAttachment = message.attachments.first()!;

    if (firstAttachment.contentType) {
      embed.setImage(firstAttachment.url);
    } else {
      embed.addFields({ name: '附件', value: firstAttachment.url });
    }
  }

  (channel as TextChannel).send({ embeds: [embed] })
    .catch((error) => {
      console.error('發送訊息記錄時發生錯誤:', error);
    });
};
