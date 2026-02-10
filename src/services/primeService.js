
function isPrime(num) {
  if (typeof num !== "number" || !Number.isInteger(num) || num < 2) {
    return false;
  }
  if (num === 2) return true;
  if (num % 2 === 0) return false;

  const limit = Math.floor(Math.sqrt(num));
  for (let i = 3; i <= limit; i += 2) {
    if (num % i === 0) return false;
  }
  return true;
}

function filterPrimes(numbers) {
  if (!Array.isArray(numbers)) return [];
  return numbers.filter((n) => typeof n === "number" && Number.isInteger(n) && isPrime(n));
}

module.exports = { isPrime, filterPrimes };
