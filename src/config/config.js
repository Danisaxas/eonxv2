const path = require('path');
const fs = require('fs');

function loadCallbackHandlers(bot, config) {
    const handlersDir = path.join(__dirname, '..', 'handlers');
    const handlers = {};
    fs.readdirSync(handlersDir).forEach(file => {
        if (file.endsWith('.js')) {
            const name = path.basename(file, '.js');
            handlers[name] = require(path.join(handlersDir, file));
        }
    });
    bot.on('callback_query', (query) => {
        if (!query.data) return;
        const handler = handlers[query.data];
        if (handler) handler(bot, query, config);
    });
}

module.exports = {
    token: '7508604877:AAGQA-yefPpvvUxyqFSRTgOVgiz9ZV_8R8o',
    ownerId: 7732700923,
    botName: 'Eonx',
    plugins_dict: 'commands',
    onMessage: function(bot, findCommandFile) {
        return (msg) => {
            if (!msg.text) return;
            const match = msg.text.match(/^[\/\.,!\-]([a-zA-Z0-9_]+)/);
            if (match) {
                const command = match[1].toLowerCase();
                const pluginsPath = path.join(__dirname, '..', this.plugins_dict);
                const commandFile = findCommandFile(command, pluginsPath);
                if (commandFile) {
                    require(commandFile)(bot, msg, this);
                }
            }
        };
    },
    loadCallbackHandlers
};
