const moment = require('moment-timezone');

module.exports = {
  start: (config, msg) => {
  const fechaMadrid = moment().tz('Europe/Madrid').format('YYYY-MM-DD hh:mm:ss A [Madrid, España.]');
  const username = msg.from.username ? `@${msg.from.username}` : msg.from.first_name;

  return `
Bienvenido ${config.botName} Bot  |  <code>${fechaMadrid}</code>

[🇪🇸] Hola ${username} Bienvenido a ${config.botName} Telegram Bot, las puertas de enlace, las herramientas y las funciones se agregan constantemente, para saber que mis diferentes comandos usan los botones que se muestran aquí: 
━━━━━━━━━━━━━
<code>Api Bot El estado es: Online ✅ | ${config.botName} Api ¡Está en línea!!</code>
`;
  },

  info: (config) => `
🤖 Nombre del bot: ${config.botName}
👤 Owner ID: ${config.ownerId}
🌐 Desarrollado en Node.js
🔧 Modular (comandos en addons/)
  `,

  tools_1: (config) => `
Eonx Chk Herramientas / Página 1
━━━━━━━━━━━━
Generador de BIN:
Formato: <code>$gen 601120</code>
Estado: <code>¡En línea! ✅</code>
━━━━━━━━━━━━
Chequeo de SK:
Formato: <code>$sk sk_live</code>
Estado: <code>¡En línea! ✅</code>
━━━━━━━━━━━━
Consulta de BIN:
Formato: <code>$bin 601120</code>
Estado: <code>¡En línea! ✅</code>
━━━━━━━━━━━━
Generar Dirección:
Formato: <code>$dir Código_País</code>
Estado: <code>¡En línea! ✅</code>
━━━━━━━━━━━━
Chequeo de IP Fraudulenta:
Formato: <code>$ip 1.1.1.1</code>
Estado: <code>¡En línea! ✅</code>
━━━━━━━━━━━━
`,

return_message: () => `Puedes volver a abrir el menú en 10 segundos`,

delete_msg: () => `Podrás volver a usar el menú usando /start`,

xcloud_text: (config, user) => `
>_ $Comenzar_ ${config.botName} Welcome @${user.username || user.first_name}  - Cloud DB 

[🇪🇸] Bienvenido a la nueva suscripción de ${config.botName} Cloud, sus datos compartidos en la nube con ${config.botName} se almacenarán aquí, navegue a través de los botones para descubrir qué es lo nuevo que tenemos para usted:       

<code>${config.botName} Cloud Version:  0.0.1</code>  | ${config.botName} Cloud Plan:  <code>Premium Cloud</code>
`,
}