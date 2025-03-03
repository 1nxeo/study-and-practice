class MaxHeap {
  constructor() {
    this.heap = [null];
  }

  push(value) {
    this.heap.push(value);
    let currIdx = this.heap.length - 1;
    let parentIdx = Math.floor(currIdx / 2);

    while (parentIdx !== 0 && this.heap[parentIdx] < value) {
      const temp = this.heap[parentIdx];
      this.heap[parentIdx] = value;
      this.heap[currIdx] = temp;

      currIdx = parentIdx;
      parentIdx = Math.floor(currIdx / 2);
    }
  }

  pop() {
    const returnValue = this.heap[1];
    this.heap[1] = this.heap.pop();

    let currIdx = 1;
    let leftIdx = 2;
    let rightIdx = 3;

    while (
      this.heap[currIdx] < this.heap[leftIdx] ||
      this.heap[currIdx] < this.heap[rightIdx]
    ) {
      if (this.heap[leftIdx] < this.heap[rightIdx]) {
        const temp = this.heap[currIdx];
        this.heap[currIdx] = this.heap[rightIdx];
        this.heap[rightIdx] = temp;
        currIdx = rightIdx;
      } else {
        const temp = this.heap[currIdx];
        this.heap[currIdx] = this.heap[leftIdx];
        this.heap[leftIdx] = temp;
        currIdx = leftIdx;
      }

      leftIdx = currIdx * 2;
      rightIdx = currIdx * 2 - 1;
    }

    return returnValue;
  }
}
