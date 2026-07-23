const processPayment = () => {
  console.log("payment");
  // Simulate some payment processing
  setTimeout(() => {
    console.log("done");
  }, 500);
};

module.exports = { processPayment };
