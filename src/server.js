const express = require('express');
const crypto = require('crypto');
const { connectDb } = require('./db');
const ordersRouter = require('./routes/orders');
const { processPayment } = require('./payment');
const { log, createLogger } = require('./logger');

const app = express();
const port = 3000;

app.use(express.json());

// Create one correlation ID for every incoming request
app.use((req, res, next) => {
  req.id = crypto.randomUUID();
  req.log = createLogger(req.id);
  next();
});

log('info', 'server.start');

connectDb();

app.get('/', (req, res) => {
  req.log.info('health.check');
  res.send('Orders API is running');
});

app.use('/orders', ordersRouter);

app.post('/payments', (req, res) => {
  req.log.info('payment.start');

  processPayment(req.log);

  res.send('Payment processed');
});

app.get('/simulate-error', (req, res) => {
  req.log.error('request.failed', {
    reason: 'simulated failure',
  });

  res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
  log('info', 'server.ready', { port });
});
