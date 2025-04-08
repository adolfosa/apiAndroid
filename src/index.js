const http = require('http');
const fs = require('fs');
const path = require('path');
const router = require('./router');

const PORT = 3000;

const server = http.createServer((req, res) => {
    // Configuración básica de CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    
    // Determinar el Content-Type basado en la extensión del archivo
    const extname = path.extname(req.url);
    let contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
    }
    res.setHeader('Content-Type', contentType);

    router(req, res);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
  console.log(`Accede a la interfaz en: http://localhost:${PORT}`);
});