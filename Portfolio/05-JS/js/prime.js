function isPrime(n) {
  if (n <= 1) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
  }
  return true;
}

function getNextPrime(n) {
  let nextPrime = n + 1;
  while (!isPrime(nextPrime)) {
      nextPrime++;
  }
  return nextPrime;
}

function getPrimeFactors(n) {
  let factors = [];
  let divisor = 2;

  while (n > 1) {
      if (n % divisor === 0 && isPrime(divisor)) {
          factors.push(divisor);
          n /= divisor;
      } else {
          divisor++;
      }
  }
  return factors;
}

function handlePrimeFactors() {
  let input = document.getElementById("num").value;
  let num = parseInt(input);

  if (isNaN(num)) {
      document.getElementById("pf").innerText = "Please enter a valid number.";
      return;
  }

  let nextPrime = getNextPrime(num);
  let result = `The next prime number after ${num} is ${nextPrime}.\n`;

  let factors = getPrimeFactors(num);
  if (factors.length === 0) {
      result += `No prime factors found for ${num}.`;
  } else {
      result += `The prime factors of ${num} are: ${factors.join(", ")}.`;
  }

  document.getElementById("pf").innerText = result;
}



