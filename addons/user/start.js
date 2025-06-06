const texts = require('../../texts/es.js');
const buttons = require('../../texts/button/es.js');

module.exports = (bot, msg, config) => {
  bot.sendMessage(
    msg.chat.id,
    texts.start(config, msg),
    {
      reply_to_message_id: msg.message_id,
      parse_mode: 'HTML',
      ...buttons.start()
    }
  );
};
