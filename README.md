## 開發中

## 使用方法
1. 安裝 Node.js v18以上 和 pnpm
```sh
npm install -g pnpm
```

2. 安裝依賴套件
```sh
pnpm install
```

3. 將 .env.example 重新命名為 .env 並完成裡面的設定
4. 運行以下命令可執行測試程序.
```sh
pnpm run dev
```

## 注意事項
1. 運行時請確保資料庫內為空, 沒有任何collections, 以免發生意料之外的事情.

## 說明
### 資料庫:
##### guildID: 儲存伺服器ID, 為所有collection的索引.
+ GuildChannel: 頻道相關資訊
    + channelWelcomeID: 發送歡迎訊息的頻道ID
    + channelLeaveID: 發送成員離開訊息的頻道ID
    + channelMemberOnlineID: 更改頻道名稱以顯示線上成員數量的頻道ID
    + channelMemberCountID: 更改頻道名稱以顯示成員總體數量的頻道ID
    + channelMessageDeleteID: 發送訊息刪除紀錄的頻道ID
    + channelVoiceCreateID: 進入後會立即建立新語音頻道的頻道ID
    + categoryVoiceCreateID: 建立新語音頻道所在的類別ID
+ GuildRole: 身分組相關資訊
    + roleAdminID: 擁有機器人所有命令權限的身分組ID