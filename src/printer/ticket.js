const { 
    ESC, INIT, SET_SPANISH, SET_CP437, 
    BOLD_ON, BOLD_OFF, ALIGN_CENTER, ALIGN_LEFT, ALIGN_RIGHT,
    DOUBLE_HEIGHT, NORMAL_HEIGHT, CUT_PARTIAL, DIVIDER
} = require('./escpos');

module.exports.generateTravelTicket = function(data) {
    const {
        company = "TRANSPORTES SEGUROS",
        destination = "CANCÚN CENTRO",
        passenger = "JUAN PÉREZ",
        date = new Date().toLocaleDateString(),
        time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        seat = "B07",
        price = "175.50",
        ticketNumber = Math.floor(Math.random() * 1000000).toString().padStart(6, '0'),
        boarding = "TERMINAL 2",
        gate = "3"
    } = data;

    const configInicial = [INIT, SET_SPANISH, SET_CP437].join('');
    
    const contenidoTicket = [
        configInicial,
        ALIGN_CENTER, BOLD_ON, DOUBLE_HEIGHT,
        company + '\n',
        NORMAL_HEIGHT, BOLD_OFF,
        'BOLETO DE VIAJE\n',
        DIVIDER + '\n',
        ALIGN_LEFT,
        `N°: ${ticketNumber}\n`,
        `FECHA: ${date}   HORA: ${time}\n`,
        DIVIDER.substring(0, 20) + '\n',
        ALIGN_CENTER, BOLD_ON,
        'DETALLES DEL VIAJE\n',
        BOLD_OFF, ALIGN_LEFT,
        `PASAJERO: ${passenger}\n`,
        `DESTINO: ${destination}\n`,
        `EMBARQUE: ${boarding}\n`,
        `PUERTA: ${gate}   ASIENTO: ${seat}\n`,
        DIVIDER + '\n',
        ALIGN_RIGHT,
        `TOTAL: $${price}\n\n`,
        ALIGN_CENTER,
        'Gracias por viajar con nosotros\n',
        'www.transportesseguros.com\n',
        '\n\n',
        DIVIDER + '\n',
        'Conserve este ticket durante el viaje\n',
        '\n\n\n',
        CUT_PARTIAL
    ].join('');

    return Buffer.from(contenidoTicket, 'ascii');
};