<?php
// Reemplaza con el token de tu bot
$token = '7508604877:AAGQA-yefPpvvUxyqFSRTgOVgiz9ZV_8R8o';

// La URL de la API de Telegram
$api_url = "https://api.telegram.org/bot$token/";

// Función para hacer peticiones a la API de Telegram
function sendRequest($method, $params = []) {
    global $api_url;
    $url = $api_url . $method;
    if ($params) {
        $url .= '?' . http_build_query($params);
    }

    $response = file_get_contents($url);
    return json_decode($response, true);
}

// Obtener las actualizaciones (mensajes)
function getUpdates() {
    return sendRequest('getUpdates');
}

// Enviar un mensaje
function sendMessage($chat_id, $text) {
    sendRequest('sendMessage', [
        'chat_id' => $chat_id,
        'text' => $text
    ]);
}

// Función principal
function processUpdates() {
    $updates = getUpdates();

    if (isset($updates['result'])) {
        foreach ($updates['result'] as $update) {
            if (isset($update['message'])) {
                $chat_id = $update['message']['chat']['id'];
                $message_text = $update['message']['text'];

                // Aquí puedes hacer que el bot responda según el mensaje
                if (strtolower($message_text) == 'hola') {
                    sendMessage($chat_id, "¡Hola! ¿Cómo estás?");
                } else {
                    sendMessage($chat_id, "No entendí tu mensaje.");
                }
            }
        }
    }
}

// Ejecutar el procesamiento de actualizaciones
processUpdates();
?>
