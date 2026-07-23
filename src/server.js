const express = require('express');
const { connectDb } = require('./db');
const ordersRouter = require('./routes/orders');
const { processPayment } = require('./payment');

const app = express();
const port = 3000;

app.use(express.json());

// Intentionally vague startup logging
console.log("starting");

connectDb();

app.get('/', (req, res) => {
  console.log("ok");
  res.send('Orders API is running');
});

app.use('/orders', ordersRouter);

app.post('/payments', (req, res) => {
  console.log("payment started");
  processPayment();
  res.send('Payment processed');
});

app.get('/simulate-error', (req, res) => {
  console.log("error happened");
  res.status(500).send('Internal Server Error');
});

app.listen(port, () => {
  console.log(`done`);
});
