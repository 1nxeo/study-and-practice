// 소수 구하기

function getPrimeArray(num) {
  const prime = [false, false, ...Array(num - 1).fill(true)];
  let answer = [];
  for (let i = 2; i * i <= num; i += 1) {
    if (prime[i]) {
      for (let j = i * 2; j <= num; j += i) {
        prime[j] = false;
      }
    }
  }

  const newArr = prime
    .slice(0, num + 1)
    .map((item, index) => item && answer.push(index));
  return answer;
}

function getPrime(num) {
  const isPrime = [false, false, ...Array(num - 1).fill(true)];
  const primes = [];

  for (let i = 2; i <= num; i += 1) {
    if (isPrime[i]) {
      primes.push(i);

      for (let j = i * 2; j <= num; j += i) {
        isPrime[j] = false;
      }
    }
  }

  return primes;
}

// 에라토스테네스의 체
function isPrime(num) {
  if (num <= 1) {
    return false; // 1보다 작거나 같은 수는 소수가 아닙니다.
  }

  for (let i = 2; i * i <= num; i++) {
    if (num % i === 0) {
      return false; // 2부터 num의 제곱근까지 나누어 떨어지면 소수가 아닙니다.
    }
  }

  return true; // 위의 조건을 모두 통과하면 소수입니다.
}

// function isPrime(num) {
//   if (num <= 1) {
//     return false; // 1보다 작거나 같은 수는 소수가 아닙니다.
//   }

//   // 2와 3은 소수입니다.
//   if (num <= 3) {
//     return true;
//   }

//   // 짝수는 소수가 아닙니다.
//   if (num % 2 === 0) {
//     return false;
//   }

//   // num의 제곱근까지만 확인하여 소수 여부를 판별합니다.
//   for (let i = 3; i <= Math.sqrt(num); i += 2) {
//     if (num % i === 0) {
//       return false;
//     }
//   }

//   return true;
// }
