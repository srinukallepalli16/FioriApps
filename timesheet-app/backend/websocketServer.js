const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3002, path: "/ws" });

wss.on('connection', ws => {
  console.log('Client connected');
  ws.send('Hello client!');

  ws.on('message', message => {
    console.log('Received:', message);
    ws.send(`Echo: ${message}`);
  });
});
