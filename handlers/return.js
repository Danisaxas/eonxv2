const texts = require('../texts/es.js');
const buttons = require('../texts/button/es.js');
const moment = require('moment-timezone');

module.exports = (bot, query, config) => {
  const msg = query.message;
  bot.answerCallbackQuery(query.id);
  bot.editMessageText(
    texts.start(config, msg),
    {
      chat_id: msg.chat.id,
      message_id: msg.message_id,
      parse_mode: 'HTML',
      ...buttons.start()
    }
  );
};
