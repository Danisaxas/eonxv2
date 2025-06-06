const texts = require('../texts/es.js');
const buttons = require('../texts/button/es.js');

module.exports = (bot, query, config) => {
  bot.answerCallbackQuery(query.id);
  bot.editMessageText(
    texts.return_message(),
    {
      chat_id: query.message.chat.id,
      message_id: query.message.message_id,
      ...buttons.return_bt()
    }
  ).then(() => {
    const chatId = query.message.chat.id;
    const msgId = query.message.message_id;

    const callbackListener = (cbq) => {
      if (
        cbq.message &&
        cbq.message.chat.id === chatId &&
        cbq.message.message_id === msgId &&
        cbq.data === 'return'
      ) {
        clearTimeout(timeoutId);
        bot.off('callback_query', callbackListener);
      }
    };
    bot.on('callback_query', callbackListener);

    const timeoutId = setTimeout(() => {
      bot.editMessageText(
        texts.delete_msg(),
        {
          chat_id: chatId,
          message_id: msgId
        }
      ).catch(() => {});
      bot.off('callback_query', callbackListener);
    }, 10000);
  });
};
