const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const logDiv = document.getElementById('log');

const socket = new WebSocket('ws://silasmc.duckdns.org:3434');

function logMessage(message) {
    const logEntry = document.createElement('div');
    logEntry.textContent = message;
    logDiv.appendChild(logEntry);
    logDiv.scrollTop = logDiv.scrollHeight;
}

socket.onopen = () => {
    logMessage('Verbindung zum Server hergestellt');
    socket.send(JSON.stringify({ type: 'init', message: 'Hallo Server' }));
};

socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    logMessage('Nachricht vom Server: ' + JSON.stringify(data));

    if (data.type === 'update') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'red';
        ctx.fillRect(data.x, data.y, 50, 50);
    }
};

socket.onclose = (event) => {
    logMessage(`Verbindung zum Server geschlossen: ${event.code} - ${event.reason}`);
};

socket.onerror = (event) => {
    logMessage(`WebSocket-Fehler: ${JSON.stringify(event)}`);
};

canvas.addEventListener('mousemove', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    socket.send(JSON.stringify({ type: 'move', x: x, y: y }));
});