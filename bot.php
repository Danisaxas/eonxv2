<?php
// bot.php - Simple ejemplo de bot PHP listo para Railway
// Este ejemplo usa un webhook básico para Telegram (puedes adaptarlo para otros servicios)

// Lee el body crudo recibido (JSON POST)
$input = file_get_contents('php://input');
$update = json_decode($input, true);

// Cambia por tu token real de Telegram Bot
$TOKEN = getenv('TELEGRAM_BOT_TOKEN') ?: '7508604877:AAGQA-yefPpvvUxyqFSRTgOVgiz9ZV_8R8o';
$API_URL = "https://api.telegram.org/bot$TOKEN/";

// Función para enviar mensaje a un chat
function sendMessage($chat_id, $text) {
    global $API_URL;
    $payload = json_encode([
        'chat_id' => $chat_id,
        'text' => $text
    ]);
    $ch = curl_init($API_URL . 'sendMessage');
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Content-Length: ' . strlen($payload)
    ]);
    $result = curl_exec($ch);
    curl_close($ch);
    return $result;
}

// Verifica si recibimos un mensaje
if (isset($update["message"])) {
    $chat_id = $update["message"]["chat"]["id"];
    $text = $update["message"]["text"] ?? '';
    
    // Ejemplo de respuesta
    if (stripos($text, "/start") === 0) {
        sendMessage($chat_id, "¡Hola! Soy tu bot PHP en Railway 🚂");
    } else {
        sendMessage($chat_id, "Dijiste: $text");
    }
}
// Opcional: respuesta HTTP 200
http_response_code(200);
