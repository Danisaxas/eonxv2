module.exports = {
    start: () => ({
    reply_markup: {
    inline_keyboard: [
    [
    { text: 'Gateways', callback_data: 'gateways' },
    { text: 'Herramientas', callback_data: 'herramientas' },
    { text: 'Informacion', callback_data: 'informacion' }
    ],
    [
    { text: 'xCloud [☁︎]', callback_data: 'xcloud' },
    { text: 'Cerrar', callback_data: 'cerrar' },
    { text: 'xCommerce [☁︎]', callback_data: 'xcommerce' }
    ]
    ]
    }
    }),

    tools_bt: () => ({
    reply_markup: {
    inline_keyboard: [
    [
    { text: 'Back', callback_data: 'back' },
    { text: 'Next', callback_data: 'next' }
    ]
    ]
    }
    }),

return_bt: () => ({
reply_markup: {
    inline_keyboard: [
    [
    { text: 'Retornar', callback_data: 'return' }
    ]
    ]
}
}),

xcloud_bt: () => ({
    reply_markup: {
    inline_keyboard: [
    [
    { text: 'Idioma', callback_data: 'idioma' },
    { text: 'Sitios DB', callback_data: 'sitiosdb' },
    { text: 'Estadisticas de DB', callback_data: 'estadisticasdb' }
    ],
    [
    { text: 'Recompensas', callback_data: 'recompensas' },
    { text: 'Atras', callback_data: 'back' }
    ]
    ]
    }
}),
};
