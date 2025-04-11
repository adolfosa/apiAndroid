#!/data/data/com.termux/files/usr/bin/bash

echo "🔹 Iniciando servidor Node.js..."

# Método interactivo que evita '-c'
su <<'EOF'
export PATH=/data/data/com.termux/files/usr/bin:$PATH
cd /data/data/com.termux/files/home/apiAndroid/src
nohup node index.js > node.log 2>&1 &
echo "PID: $!"
echo "Logs: ~/apiAndroid/src/node.log"
exit
EOF

if grep -q "Error" ~/apiAndroid/src/node.log 2>/dev/null; then
    echo "❌ Error al iniciar:"
    tail -n 5 ~/apiAndroid/src/node.log
else
    echo "✅ Servidor iniciado correctamente"
fi