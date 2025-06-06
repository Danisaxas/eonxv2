const texts = require('../texts/es.js');
const buttons = require('../texts/button/es.js');

module.exports = (bot, query, config) => {
  const msg = query.message;
  bot.answerCallbackQuery(query.id);
  bot.editMessageText(
    texts.xcloud_text(config, msg),
    {
      chat_id: msg.chat.id,
      message_id: msg.message_id,
      parse_mode: 'HTML',
      ...buttons.xcloud_bt()
    }
  );
};
