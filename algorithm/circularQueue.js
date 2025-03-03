// linked list로 구현했을 때 이점이 없음

class CircularQueue {
  constructor(maxSize) {
    this.maxSize = maxSize;
    this.queue = [];
    this.front = 0;
    this.rear = 0;
    this.size = 0;
  }

  enqueue(value) {
    if (this.ifFull()) {
      console.log("Queue is full");
      return;
    }

    this.queue[this.rear] = value;
    this.rear = (this.rear + 1) % this.maxSize;
    this.size += 1;
  }

  dequeue() {
    const value = this.queue[this.front];
    delete this.queue[this.front];
    this.front = (this.front + 1) % this.maxSize;
    this.size -= 1;
    return value;
  }

  isFull() {
    return this.size === this.maxSize;
  }

  peek() {
    return this.queue[this.front];
  }
}

// examples

// 원형 큐에서 주어진 숫자 n으로 만들 수 있는 모든 가능한 조합의 수를 구하는 함수
function countCombinations(n, queue) {
  let count = 0;
  const size = queue.length;

  for (let i = 0; i < size; i++) {
    let sum = 0;
    for (let j = i, steps = 0; steps < size; j = (j + 1) % size, steps++) {
      sum += queue[j];
      if (sum === n) {
        count++;
      }
    }
  }

  return count;
}

// 예시: 원형 큐와 숫자 n으로 함수 호출
const circularQueue = [1, 2, 3, 4, 2, 3]; // 예시로 임의의 원형 큐 생성
const numberN = 5; // 예시로 사용할 숫자 n

const result = countCombinations(numberN, circularQueue);
console.log(
  `주어진 숫자 ${numberN}으로 만들 수 있는 가능한 조합의 수: ${result}`
);
