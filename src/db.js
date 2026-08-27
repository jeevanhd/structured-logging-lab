const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'myuser',
  password: process.env.DB_PASSWORD || 'mypassword',
  database: process.env.DB_NAME || 'ordersdb',
  port: process.env.DB_PORT || 5432,
});

const connectDb = async () => {
  try {
    await pool.query('SELECT NOW()');
    console.log(
      JSON.stringify({
        ts: new Date().toISOString(),
        level: 'info',
        service: 'orders-api',
        msg: 'database.connected',
      })
    );
  } catch (err) {
    console.log(
      JSON.stringify({
        ts: new Date().toISOString(),
        level: 'error',
        service: 'orders-api',
        msg: 'database.connection_failed',
      })
    );

    console.log(
      JSON.stringify({
        ts: new Date().toISOString(),
        level: 'warn',
        service: 'orders-api',
        msg: 'database.retry',
      })
    );
  }
};

const queryDb = async (text, params, logger) => {
  logger.info('database.query.start');

  try {
    const res = await pool.query(text, params);
    logger.info('database.query.complete');
    return res;
  } catch (err) {
    logger.error('database.query.failed');
    throw err;
  }
};

module.exports = { connectDb, queryDb, pool };
