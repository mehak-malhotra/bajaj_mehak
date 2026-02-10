
function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

function computeLCM(numbers) {
  if (!Array.isArray(numbers) || numbers.length < 2) return null;

  const validNumbers = numbers.filter(
    (n) => typeof n === "number" && Number.isInteger(n)
  );
  if (validNumbers.length < 2) return null;

  let result = Math.abs(validNumbers[0]);
  for (let i = 1; i < validNumbers.length; i++) {
    const b = Math.abs(validNumbers[i]);
    if (b === 0) return 0;
    result = (result * b) / gcd(result, b);
  }
  return result;
}

module.exports = { gcd, computeLCM };
