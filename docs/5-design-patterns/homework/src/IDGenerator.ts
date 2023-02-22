/**
 * Singleton id generator
 * */
export class IDGenerator {
  private static id = 0;

  private static instance: IDGenerator;

  private constructor() {
    if (IDGenerator.instance) return IDGenerator.instance;
    IDGenerator.id = Number((Math.random() * 10).toString().slice(2));
    IDGenerator.instance = this;
  }

  static getId() {
    if (IDGenerator.id === 0) {
      new IDGenerator();
    }
    return IDGenerator.id++;
  }
}
