const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'myuser',
  password: process.env.DB_PASSWORD || 'mypassword',
  database: process.env.DB_NAME || 'ordersdb',
  port: process.env.DB_PORT || 5432,
});

const connectDb = async () => {
  console.log("connecting...");
  try {
    await pool.query('SELECT NOW()');
    console.log("connected");
  } catch (err) {
    console.log("error");
    console.log("retry");
  }
};

const queryDb = async (text, params) => {
  console.log("query...");
  const res = await pool.query(text, params);
  console.log("finished");
  return res;
};

module.exports = { connectDb, queryDb, pool };
