class MinHeap extends Heap {
  //값을 넣을 때 최소 힙이 유지될 수 있게 알맞은 위치로 넣어주는 bubbleUp
  bubbleUp() {
    let index = this.items.length - 1; //마지막으로 추가된 원소를 찾기

    while (
      this.findParent(index) &&
      this.findParent(index)[1] > this.items[index][1]
    ) {
      //부모값이 존재 && 자식이 부모보다 최솟값이라면
      this.swap(index, this.findParentIdx(index)); //두 값을 바꿔준다.
      index = this.findParentIdx(index); //계속해서 최소 힙을 만들어줌.
    }
  }

  //최솟값이 빠지면 마지막 노드를 root로 보내고 재배치하는 bubbleDown
  bubbleDown() {
    let index = 0;

    while (
      (this.findLeftChild(index) &&
        this.findLeftChild(index)[1] < this.items[index][1]) ||
      (this.findRightChild(index) &&
        this.findRightChild(index)[1] < this.items[index][1])
    ) {
      //자식 중 부모보다 더 작은 값이 존재
      let smallerIndex = this.findLeftChildIdx(index);

      if (
        this.findRightChild(index) &&
        this.findRightChild(index)[1] < this.items[smallerIndex][1]
      ) {
        //오른쪽 자식이 존재하고, 왼쪽 값보다 더 작은 값이라면
        smallerIndex = this.findRightChildIdx(index);
      }

      this.swap(index, smallerIndex);

      index = smallerIndex;
    }
  }

  add(value) {
    this.items.push(value);
    this.bubbleUp();
  }

  poll() {
    if (this.items.length === 1) {
      return this.items.pop();
    }
    const value = this.items[0];
    this.items[0] = this.items.pop();
    this.bubbleDown();

    return value;
  }
}
