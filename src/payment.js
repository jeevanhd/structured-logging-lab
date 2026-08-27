const processPayment = (logger) => {
  logger.info('payment.processing');

  // Simulate some payment processing
  setTimeout(() => {
    logger.info('payment.complete');
  }, 500);
};

module.exports = { processPayment };
