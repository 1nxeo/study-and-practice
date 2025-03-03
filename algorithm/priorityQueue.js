class PriorityQueue {
  constructor() {
    this.queue = [];
  }

  // 요소 삽입
  enqueue(element, priority) {
    const item = { element, priority };
    let added = false;

    for (let i = 0; i < this.queue.length; i++) {
      if (this.queue[i].priority > priority) {
        this.queue.splice(i, 0, item);
        added = true;
        break;
      }
    }

    if (!added) {
      this.queue.push(item);
    }
  }

  // 가장 높은 우선순위 요소 추출
  dequeue() {
    return this.queue.shift();
  }

  // 우선순위 큐가 비어있는지 확인
  isEmpty() {
    return this.queue.length === 0;
  }

  // 우선순위 큐의 크기 반환
  size() {
    return this.queue.length;
  }

  // 우선순위 큐 출력
  print() {
    console.log(this.queue);
  }
}
