export abstract class Shipper {
  protected constructor() {
  }

  abstract getInstance(): Shipper
  abstract getCost(): number
}
