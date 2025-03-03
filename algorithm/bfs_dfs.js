/**
 * ! BFS(너비우선탐색)
 * - queue 이용하여 구현
 * - 시작지점에서 가까운 정점부터 탐색
 * - V가 정점의 수, E가 간선의 수 일때, BFS의 시간복잡도는 O(V+E)
 */
// const BFS = (graph, startNode) => {
//   let visited = []; // 탐색을 마친 노드들
//   let needVisit = []; // 탐색해야할 노드들

//   needVisit.push(startNode); // 노드 탐색 시작

//   while (needVisit.length !== 0) {
//     // 탐색해야할 노드가 남아있다면
//     // const node = needVisit.shift(); // 가장 오래 남아있던 정점을 뽑아냄.
//     const node = needVisit[0];
//     if (!visited.includes(node)) {
//       // 해당 노드 방문이 처음이라면,
//       visited.push(node);
//       needVisit = [...needVisit, ...graph[node]];
//     }

//     needVisit = needVisit.slice(1);
//   }
//   return visited;
// };

function bfs(graph, start) {
  const visited = {}; // 방문한 노드를 저장할 객체
  const queue = [start]; // BFS를 위한 큐에 시작 노드를 넣어줍니다.
  visited[start] = true; // 시작 노드를 방문했음을 표시합니다.

  while (queue.length > 0) {
    const current = queue.shift(); // 큐의 맨 앞에 있는 노드를 가져옵니다.
    console.log(current); // 현재 노드를 방문한다고 가정하고 출력합니다.

    // 현재 노드와 연결된 모든 인접 노드들을 확인합니다.
    for (let neighbor of graph[current]) {
      // 방문하지 않은 인접 노드라면 큐에 추가하고 방문했음을 표시합니다.
      if (!visited[neighbor]) {
        queue.push(neighbor);
        visited[neighbor] = true;
      }
    }
  }
}

// 예시 그래프 - 인접 리스트 형태로 표현
const graph = {
  1: [2, 3],
  2: [1, 4, 5],
  3: [1, 6, 7],
  4: [2],
  5: [2],
  6: [3],
  7: [3],
};

// 시작 노드를 1로 설정하여 BFS를 수행합니다.
bfs(graph, 1);

function bfsArray(arr, start) {
  const visited = new Array(arr.length).fill(false); // 방문한 노드를 저장할 배열
  const queue = []; // BFS를 위한 큐

  queue.push(start); // 시작 노드를 큐에 추가
  visited[start] = true; // 시작 노드를 방문했음을 표시

  while (queue.length > 0) {
    const current = queue.shift(); // 큐에서 현재 노드를 가져옴
    console.log(arr[current]); // 현재 노드의 값을 출력

    // 현재 노드와 연결된 모든 인접 노드들을 확인
    for (let i = 0; i < arr[current].length; i++) {
      const neighbor = arr[current][i];
      // 방문하지 않은 인접 노드라면 큐에 추가하고 방문했음을 표시
      if (!visited[neighbor]) {
        queue.push(neighbor);
        visited[neighbor] = true;
      }
    }
  }
}

// 예시 배열
const arrayForBFSArray = [
  [1, 2], // 0번 인덱스
  [0, 3, 4], // 1번 인덱스
  [0], // 2번 인덱스
  [1], // 3번 인덱스
  [1], // 4번 인덱스
];

// 시작 노드를 0으로 설정하여 BFS를 수행합니다.
bfsArray(arrayForBFSArray, 0);

/**
 * ! DFS(깊이우선탐색)
 * - stack 이용하여 구현
 * - 시작 정점에서 깊은 것부터 찾음
 * - V가 정점의 수, E가 간선의 수 일 때, DFS의 시간복잡도는 O(V+E)
 */

// // graph 자료구조와 startNode를 입력
// const DFS = (graph, startNode) => {
//   //   const visited = []; // 탐색을 마친 노드들
//   let needVisit = []; // 탐색해야할 노드들
//   let visited = [];
//   //   let needVisit = new QueueWithArray();

//   needVisit.push(startNode); // 노드 탐색 시작

//   while (needVisit.length !== 0) {
//     // 탐색해야할 노드가 남아있다면
//     const node = needVisit.shift(); // queue이기 때문에 선입선출, shift()를 사용한다.
//     // const node = needVisit[0];
//     if (!visited.includes(node)) {
//       // 해당 노드가 탐색된 적 없다면
//       visited.push(node);
//       needVisit = [...graph[node], ...needVisit];
//       //   needVisit.queue = [...graph[node], ...needVisit.queue];
//     }
//     needVisit = needVisit.slice(1);
//   }
//   return visited;
// };

function dfs(graph, node, visited) {
  visited[node] = true; // 현재 노드를 방문했음을 표시합니다.
  console.log(node); // 현재 노드를 방문한다고 가정하고 출력합니다.

  // 현재 노드와 연결된 모든 인접 노드들을 확인합니다.
  for (let neighbor of graph[node]) {
    // 방문하지 않은 인접 노드라면 재귀적으로 방문합니다.
    if (!visited[neighbor]) {
      dfs(graph, neighbor, visited);
    }
  }
}

// 예시 그래프 - 인접 리스트 형태로 표현
const graph2 = {
  1: [2, 3],
  2: [1, 4, 5],
  3: [1, 6, 7],
  4: [2],
  5: [2],
  6: [3],
  7: [3],
};

const visitedDFS = {}; // 방문한 노드를 저장할 객체

// 시작 노드를 1로 설정하여 DFS를 수행합니다.
dfs(graph2, 1, visited);

function dfsArray(arr, visited, start) {
  visited[start] = true; // 현재 노드를 방문했음을 표시합니다.
  console.log(arr[start]); // 현재 노드를 방문한다고 가정하고 값을 출력합니다.

  // 현재 노드와 연결된 모든 인접 노드들을 확인합니다.
  for (let i = 0; i < arr[start].length; i++) {
    const neighbor = arr[start][i];
    // 방문하지 않은 인접 노드라면 재귀적으로 방문합니다.
    if (!visited[neighbor]) {
      dfsArray(arr, visited, neighbor);
    }
  }
}

// 예시 배열
const array = [
  [1, 2], // 0번 인덱스
  [0, 3, 4], // 1번 인덱스
  [0], // 2번 인덱스
  [1], // 3번 인덱스
  [1], // 4번 인덱스
];

const visitedDFSArray = new Array(array.length).fill(false); // 방문한 노드를 저장할 배열

// 시작 노드를 0으로 설정하여 DFS를 수행합니다.
dfsArray(array, visited, 0);
