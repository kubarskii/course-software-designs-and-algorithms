import { Vertex } from "./vertex";

export class Edge {
  constructor(public from: Vertex, public to: Vertex, public weight: number) {
  }
}
