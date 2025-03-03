// 유클리드 호제법을 사용한 최대공약수 구하기
function gcd(a, b) {
  while (b !== 0) {
    let temp = b;
    b = a % b;
    a = temp;
  }
  return a;
}

// 최소공배수 구하기
function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

function getAllDivisors(number) {
  const divisors = [];
  for (let i = 1; i <= number; i++) {
    if (number % i === 0) {
      divisors.push(i);
    }
  }
  return divisors;
}
