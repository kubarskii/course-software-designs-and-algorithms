import { WeightedGraph } from "./types";
import { Vertex } from "./vertex";

export class Graph<T extends Vertex<any>> implements WeightedGraph<T> {

  private $adjacencyList: Map<T, [T, number][]> = new Map();

  get adjacencyList(){
    return this.$adjacencyList;
  }

  addVertex(key: T): void {
    const list = this.$adjacencyList;
    if (list.has(key)) return;
    list.set(key, []);
  }

  addEdge(vertex1: T, vertex2: T, weight: number): void {
    const list = this.$adjacencyList;
    if (!list.has(vertex1) || !list.has(vertex2)) return;
    if (!vertex2 || !vertex1) return;
    list.get(vertex1)!.push([vertex2, weight])
    list.get(vertex2)!.push([vertex1, weight])
  }
}
