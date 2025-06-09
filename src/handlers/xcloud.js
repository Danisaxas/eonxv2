const texts = require('../texts/es.js');
const buttons = require('../texts/button/es.js');

module.exports = (bot, query, config) => {
const msg = query.message;
bot.answerCallbackQuery(query.id);
bot.editMessageText(
    texts.xcloud_text(config, query.from),
    {
    chat_id: query.message.chat.id,
    message_id: query.message.message_id,
    parse_mode: 'HTML',
    ...buttons.xcloud_bt()
}
);
};

