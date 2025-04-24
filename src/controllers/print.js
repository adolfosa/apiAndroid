const fs = require('fs');
const { generateTravelTicket } = require('../printer/ticket');

const PRINTER_PATH = '/dev/usb/lp0';

module.exports.printTicket = (req, res) => {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
        try {
            const ticketData = JSON.parse(body);
            
            // Validación básica de campos requeridos
            if (!ticketData.boleto || !ticketData.codigo || !ticketData.servicio) {
                throw new Error('Faltan campos requeridos en los datos del ticket');
            }

            const ticketContent = generateTravelTicket(ticketData);
            
            fs.writeFileSync(PRINTER_PATH, ticketContent);
            
            res.statusCode = 200;
            res.end(JSON.stringify({ 
                success: true,
                message: "Ticket impreso correctamente"
            }));
        } catch (error) {
            console.error('Error al imprimir:', error);
            res.statusCode = 500;
            res.end(JSON.stringify({ 
                success: false,
                error: "Error al imprimir",
                details: error.message
            }));
        }
    });
};