import { Path, Dijkstra, WeightedGraph } from "./types";
import { Vertex } from "./vertex";

export class DijkstraImplementation<T extends Vertex<any>> implements Dijkstra<T> {

  constructor(private graph: WeightedGraph<T>) {}

  findShortestPath(vertex1: T, vertex2: T): Path {
    const distances: Map<T, number> = new Map();
    const previous: Map<T, T | null> = new Map();
    const pq = new PriorityQueue<T>();
    const path: T[] = [];
    for (const vertex of Array.from(this.graph.adjacencyList.keys())) {
      distances.set(vertex, Infinity);
      previous.set(vertex, null);
    }
    distances.set(vertex1, 0);
    pq.enqueue(vertex1, 0);

    while (!pq.isEmpty()) {
      const current = pq.dequeue()!;
      if (current === vertex2) {
        let vertex = vertex2;
        while (vertex !== vertex1) {
          path.unshift(vertex);
          vertex = previous.get(vertex)!;
        }
        path.unshift(vertex1);
        return { path: path.map(v => v.value), distance: distances.get(vertex2)! };
      }

      const neighbors = this.graph.adjacencyList.get(current)!;
      for (const [neighbor, weight] of neighbors) {
        const alt = distances.get(current)! + weight;
        if (alt < distances.get(neighbor)!) {
          distances.set(neighbor, alt);
          previous.set(neighbor, current!);
          pq.enqueue(neighbor, alt);
        }
      }
    }

    return { path: [], distance: Infinity };
  }

  findAllShortestPaths(vertex: T): any {
    const paths: Map<T, Path> = new Map();
    for (const otherVertex of Array.from(this.graph.adjacencyList.keys())) {
      if (vertex === otherVertex) continue;
      const path = this.findShortestPath(vertex, otherVertex);
      paths.set(otherVertex, path);
    }
    return paths;
  }
}

class PriorityQueue<T> {
  private items: [T, number][] = [];

  enqueue(item: T, priority: number) {
    this.items.push([item, priority]);
    this.items.sort((a, b) => a[1] - b[1]);
  }

  dequeue(): T | undefined {
    return this.items.shift()?.[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}
