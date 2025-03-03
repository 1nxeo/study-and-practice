class NodeForTrie {
  constructor(value = "") {
    this.value = value;
    this.children = new Map();
  }
}

class Trie {
  constructor() {
    this.root = new NodeForTrie();
  }

  insert(string) {
    let currNode = this.root;

    for (const char of string) {
      if (!currNode.children.has(char)) {
        currNode.children.set(char, new Node(currNode.value + char));
      }

      currNode = currNode.children.get(char);
    }
  }

  has(string) {
    let currNode = this.root;

    for (const char of string) {
      if (!currNode.children.has(char)) {
        return false;
      }

      currNode = currNode.children.get(char);
    }

    return true;
  }
}
