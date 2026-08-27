const log = (level, msg, fields = {}) => {
  console.log(
    JSON.stringify({
      ts: new Date().toISOString(),
      level,
      service: 'orders-api',
      msg,
      ...fields,
    })
  );
};

const createLogger = (reqId) => ({
  info: (msg, fields = {}) => log('info', msg, { reqId, ...fields }),
  warn: (msg, fields = {}) => log('warn', msg, { reqId, ...fields }),
  error: (msg, fields = {}) => log('error', msg, { reqId, ...fields }),
});

module.exports = { log, createLogger };
