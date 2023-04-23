export interface WeightedGraph<T> {
  addVertex(key: string | T): void;
  addEdge(vertex1: T, vertex2: T, weight: number): void;
}

export interface Path {
  path: string[];
  distance: number;
}

export interface Dijkstra<T> {
  findShortestPath(vertex1: T, vertex2: T): Path;
  findAllShortestPaths(vertex: T): Record<string, Path>;
}
