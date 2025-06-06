<?php

$config = require __DIR__ . '/config/config.php';

// Obtener contenido del webhook
$content = file_get_contents("php://input");
$update = json_decode($content, true);

// Verificar si el mensaje es válido
if (!isset($update["message"])) {
    exit;
}

$message = $update["message"];
$chat_id = $message["chat"]["id"];
$text = $message["text"] ?? '';

// Si el comando es /start
if ($text === "/start") {
    $reply = "¡Hola! Soy tu bot en PHP 🚀";
    enviarMensaje($chat_id, $reply, $config['bot_token']);
}

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
