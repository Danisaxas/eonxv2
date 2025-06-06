<?php

// Ruta absoluta para el archivo de log (opcional para debug en Railway)
define('BOT_LOG', __DIR__ . '/bot.log');

// Si accedes por navegador (GET), muestra mensaje simple
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo "PHP Bot Running! (Método GET)";
    exit;
}

// Carga la configuración
$config = require __DIR__ . '/config/config.php';

// Lee el body del POST (update de Telegram)
$content = file_get_contents("php://input");

// Loguea el input recibido para debug (opcional)
file_put_contents(BOT_LOG, date('Y-m-d H:i:s') . " - " . $content . PHP_EOL, FILE_APPEND);

$update = json_decode($content, true);

// Validación básica
if (!isset($update['message'])) {
    exit('No hay mensaje que procesar');
}

$message = $update['message'];
$chat_id = $message['chat']['id'];
$text = isset($message['text']) ? trim($message['text']) : '';

// Si es /start (solo exactamente, si quieres aceptar "/start algo" usa strpos)
if ($text === '/start') {
    $reply = "¡Hola! 👋 Soy tu bot PHP en Railway.\n\n¡Escribe lo que quieras!";
    enviarMensaje($chat_id, $reply, $config['bot_token']);
} else {
    // Opción: responde a cualquier otro texto (puedes quitar esto si solo quieres /start)
    $reply = "Recibí: " . $text;
    enviarMensaje($chat_id, $reply, $config['bot_token']);
}

// ------- FUNCIONES -------

function enviarMensaje($chat_id, $text, $token) {
    $url = "https://api.telegram.org/bot{$token}/sendMessage";
    $data = [
        'chat_id' => $chat_id,
        'text' => $text,
    ];

    $options = [
        "http" => [
            "header"  => "Content-Type: application/json",
            "method"  => "POST",
            "content" => json_encode($data),
        ]
    ];

    $context = stream_context_create($options);
    file_get_contents($url, false, $context);
}
