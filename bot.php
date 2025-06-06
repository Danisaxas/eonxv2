<?php
// Incluir el archivo de configuración
require_once 'config/config.php';

// Incluir la función para enviar mensajes
require_once 'utils.php';

// Definir el directorio de plugins (comandos)
define('PLUGINS_DIR', 'addons');

// La URL de la API de Telegram usando el token del archivo de configuración
$api_url = "https://api.telegram.org/bot" . BOT_TOKEN . "/";

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

// Cargar un plugin de comandos
function loadPlugin($plugin) {
    $pluginPath = PLUGINS_DIR . '/' . $plugin . '.php';
    
    if (file_exists($pluginPath)) {
        require_once $pluginPath;
        return true;
    }
    return false;
}

// Función principal
function processUpdates() {
    $updates = getUpdates();

    if (isset($updates['result'])) {
        foreach ($updates['result'] as $update) {
            if (isset($update['message'])) {
                $chat_id = $update['message']['chat']['id'];
                $message_text = $update['message']['text'];

                // Verificar si el mensaje contiene un comando
                $command = strtolower(trim($message_text));
                
                if (strpos($command, '/') === 0) { // Si es un comando
                    $command = substr($command, 1); // Eliminar el '/' del comando

                    // Cargar el plugin (comando) desde addons/user/
                    if (loadPlugin("user/$command")) {
                        // Llamar la función correspondiente dentro del plugin cargado
                        $functionName = "handle" . ucfirst($command);
                        if (function_exists($functionName)) {
                            $functionName($chat_id);
                        }
                    } else {
                        sendMessage($chat_id, "Comando no reconocido.");
                    }
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
