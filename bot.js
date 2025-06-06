const TelegramBot = require('node-telegram-bot-api');
const config = require('./config/config.js');
const fs = require('fs');
const path = require('path');

function findCommandFile(commandName, dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      const found = findCommandFile(commandName, fullPath);
      if (found) return found;
    } else if (file === `${commandName}.js`) {
      return fullPath;
    }
  }
  return null;
}

const bot = new TelegramBot(config.token, { polling: true });

bot.on('message', config.onMessage(bot, findCommandFile));
config.loadCallbackHandlers(bot, config);
