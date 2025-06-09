const texts = require('../texts/es.js');
const buttons = require('../texts/button/es.js');

module.exports = (bot, query) => {
  bot.answerCallbackQuery(query.id);
  bot.editMessageText(
    texts.recompensas_text(),
    {
      chat_id: query.message.chat.id,
      message_id: query.message.message_id,
      parse_mode: 'HTML',
      ...buttons.return_bt(),
    }
  );
};
