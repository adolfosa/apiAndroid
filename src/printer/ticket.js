const { 
    ESC, INIT, SET_SPANISH, SET_CP437, 
    BOLD_ON, BOLD_OFF, ALIGN_CENTER, ALIGN_LEFT, ALIGN_RIGHT,
    DOUBLE_HEIGHT, NORMAL_HEIGHT, CUT_PARTIAL, DIVIDER
} = require('./escpos');

module.exports.generateTravelTicket = function(data) {
    const {
        boleto,
        codigo,
        servicio,
        ruta,
        piso,
        asiento,
        fecha,
        hora,
        origen,
        destino,
        tipo_cliente,
        fecha_compra,
        total
    } = data;

    const configInicial = [INIT, SET_SPANISH, SET_CP437].join('');
    
    const contenidoTicket = [
        configInicial,
        ALIGN_CENTER, BOLD_ON, DOUBLE_HEIGHT,
        `${servicio}\n`,
        NORMAL_HEIGHT, BOLD_OFF,
        'BOLETO DE VIAJE\n',
        DIVIDER + '\n',
        ALIGN_LEFT,
        `BOLETO: ${boleto}\n`,
        `TRANSACCIÓN: ${codigo}\n`,
        `FECHA SALIDA: ${fecha}   HORA: ${hora}\n`,
        DIVIDER.substring(0, 20) + '\n',
        ALIGN_CENTER, BOLD_ON,
        'DETALLES DEL VIAJE\n',
        BOLD_OFF, ALIGN_LEFT,
        `SERVICIO: ${servicio}\n`,
        `RUTA: ${ruta}\n`,
        `ORIGEN: ${origen}\n`,
        `DESTINO: ${destino}\n`,
        `PISO: ${piso}   ASIENTO: ${asiento}\n`,
        `TIPO CLIENTE: ${tipo_cliente}\n`,
        DIVIDER + '\n',
        `FECHA COMPRA: ${fecha_compra}\n`,
        ALIGN_RIGHT,
        `TOTAL: $${total}\n\n`,
        ALIGN_CENTER,
        'Gracias por viajar con nosotros\n',
        'www.pullman.cl\n',
        '\n\n',
        DIVIDER + '\n',
        'Conserve este ticket durante el viaje\n',
        '\n\n\n',
        CUT_PARTIAL
    ].join('');

    return Buffer.from(contenidoTicket, 'ascii');
};