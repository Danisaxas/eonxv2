<?php
// Comando para el /start
function handleStart($chat_id) {
    // Responder al usuario con un mensaje de bienvenida
    sendMessage($chat_id, "¡Hola! ¿Cómo puedo ayudarte?");
}
