const { printTicket } = require('./controllers/print');
const fs = require('fs');
const path = require('path');

const router = (req, res) => {
    // Configuración CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    
    const { url, method } = req;

    // Preflight CORS
    if (method === 'OPTIONS') {
        res.statusCode = 204;
        res.end();
        return;
    }

    // Servir HTML
    if (url === '/' && method === 'GET') {
        const htmlPath = path.join(__dirname, '../public', 'index.html');
        console.log('Intentando cargar:', htmlPath); // Para diagnóstico
        
        fs.readFile(htmlPath, (err, data) => {
            if (err) {
                console.error('Error al cargar HTML:', err);
                res.statusCode = 500;
                res.end('<h1>Error</h1><p>No se pudo cargar la página</p>');
                return;
            }
            res.setHeader('Content-Type', 'text/html');
            res.statusCode = 200;
            res.end(data);
        });
    }
    // Ruta de impresión
    else if (url === '/api/ticket' && method === 'POST') {
        res.setHeader('Content-Type', 'application/json');
        printTicket(req, res);
    }
    // Ruta no encontrada
    else {
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
    }
};

module.exports = router;