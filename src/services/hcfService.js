
function computeHCF(numbers) {
  if (!Array.isArray(numbers) || numbers.length < 2) return null;

  const validNumbers = numbers.filter(
    (n) => typeof n === "number" && Number.isInteger(n)
  );
  if (validNumbers.length < 2) return null;

  const absNumbers = validNumbers.map((n) => Math.abs(n));
  let result = absNumbers[0];

  for (let i = 1; i < absNumbers.length; i++) {
    result = gcd(result, absNumbers[i]);
    if (result === 1) break;
  }
  return result;
}

function gcd(a, b) {
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

module.exports = { computeHCF };
