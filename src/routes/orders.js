const express = require('express');
const router = express.Router();
const { queryDb } = require('../db');

router.get('/', async (req, res) => {
  console.log("starting");
  try {
    const result = await queryDb('SELECT * FROM orders', []);
    console.log("ok");
    res.json(result.rows);
  } catch (err) {
    console.log("oops");
    res.status(500).send('Error fetching orders');
  }
});

router.post('/', async (req, res) => {
  console.log("starting");
  const { product_id, quantity, customer_id } = req.body;
  
  if (!product_id || !quantity || !customer_id) {
    console.log("try again");
    return res.status(400).send('Missing fields');
  }

  try {
    const result = await queryDb(
      'INSERT INTO orders (product_id, quantity, customer_id) VALUES ($1, $2, $3) RETURNING *',
      [product_id, quantity, customer_id]
    );
    console.log("done");
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.log("error happened");
    res.status(500).send('Error creating order');
  }
});

module.exports = router;
