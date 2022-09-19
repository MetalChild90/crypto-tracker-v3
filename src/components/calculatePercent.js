function calculatePercent(price, targetPrice) {
  return (((price - targetPrice) / targetPrice) * 100).toFixed(2);
}

export default calculatePercent;
