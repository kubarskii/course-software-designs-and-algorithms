import { WeightedGraph } from "./types";
import { Vertex } from "./vertex";
import { Edge } from "./edge";
import { Graph } from "./graph";
import { DijkstraImplementation } from "./dijkstra";

const vertices = [
  new Vertex("1"),
  new Vertex("2"),
  new Vertex("3"),
  new Vertex("4"),
  new Vertex("5")
];

const [vertex1, vertex2, vertex3, vertex4, vertex5] = vertices;

const edges = [
  new Edge(vertex1, vertex2, 5),
  new Edge(vertex1, vertex3, 4),
  new Edge(vertex1, vertex4, 3),
  new Edge(vertex2, vertex4, 6),
  new Edge(vertex2, vertex3, 5),
];
const graph: WeightedGraph<Vertex<string>> = new Graph();

vertices.forEach((vertex) => graph.addVertex(vertex));
edges.forEach((edge) => graph.addEdge(edge.from, edge.to, edge.weight));

const g = new DijkstraImplementation(graph)

console.log(graph.adjacencyList);
console.log(g.findShortestPath(vertex1, vertex5));
console.log(g.findAllShortestPaths(vertex4));
