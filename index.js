const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 8000;
const net = require('net');

app.use(cors({ credentials: true, origin: true }));

app.get('/', (req, res) => {
  res.send('HotspotStatus API');
});

app.get('/ping', (req, res) => {
  if (req.query.ip && req.query.port) {
    const socket = new net.Socket();
    socket.setTimeout(2500);
    socket.on('connect', () => {
      res.send({ status: true });
      socket.destroy();
    }).on('error', (e) => {
      res.send({ status: false });
    }).on('timeout', (e) => {
      res.send({ status: false });
    }).connect(req.query.port, req.query.ip);
  } else {
    res.send({ status: false });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}.`);
})
