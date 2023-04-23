import { WeightedGraph } from "./types";
import { Edge } from "./edge";
import { Vertex } from "./vertex";

export class Graph implements WeightedGraph<Vertex> {
  private edges: Edge[] = []
  private vertices: Vertex[] = []

  addEdge<T extends Vertex>(vertex1: T, vertex2: T, weight: number): void {

  }

  addVertex(key: string): void {
  }

}
