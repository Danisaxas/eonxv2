const texts = require('../texts/es.js');

module.exports = (bot, msg, config) => {
  bot.sendMessage(msg.chat.id, texts.info(config));
};
