const texts = require('../texts/es.js');
const buttons = require('../texts/button/es.js');

module.exports = (bot, query, config) => {
  bot.answerCallbackQuery(query.id);
  bot.editMessageText(
    texts.tools_1(config), // <--- aquí debe ir config
    {
      chat_id: query.message.chat.id,
      message_id: query.message.message_id,
      parse_mode: 'HTML',
      ...buttons.tools_bt()
    }
  );
};
