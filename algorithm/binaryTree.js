// array
const treeWithArray = [];

// linked list
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(data) {
    this.root = new Node(data);
    this.length = 0;
  }

  insert(data) {
    let newNode = new Node(data);
    let currentNode = this.root;

    while (currentNode) {
      if (data === currentNode.value) {
        return;
      }
      if (data < currentNode) {
        if (!currentNode.left) {
          currentNode.left = newNode;
          this.length += 1;
          return;
        }

        currentNode = currentNode.left;
      }

      if (data > currentNode) {
        if (!currentNode.right) {
          currentNode.right = newNode;
          this.length += 1;
          return;
        }

        currentNode = currentNode.right;
      }
    }
  }

  display() {
    // level order
    const queue = new QueueWithLinkedList();
    queue.enqueue(this.root);
    while (queue.size) {
      const currNode = queue.dequeue();
      console.log(currNode.value);
      if (currNode.left) queue.enqueue(currNode.left);
      if (currNode.right) queue.enqueue(currNode.right);
    }
  }

  DFS() {
    let result = [];
    let stack = [this.root];

    while (stack.length !== 0) {
      let current = stack.pop();
      if (current.right) {
        stack.push(current.right);
      }
      if (current.left) {
        stack.push(current.left);
      }

      result.push(current.value);
    }

    return result;
  }

  BFS() {
    let result = [];
    let queue = [this.root];

    while (queue.length !== 0) {
      let current = queue.shift();
      if (current.right) {
        queue.push(current.right);
      }
      if (current.left) {
        queue.push(current.left);
      }

      result.push(current.value);
    }

    return result;
  }
}
