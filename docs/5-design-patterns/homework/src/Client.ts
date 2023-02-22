import { Enhancer, Enhancers, ShipmentModel } from "./models/ShipmentModel";
import { IShippable, Shipment } from "./shipment/Shipment";

export class Client {
  constructor(private shipment: ShipmentModel, private enhancers: Enhancers) {
  }

  private processEnhancer(enhancer: Enhancer) {

  }

  process() {
    const shipment = new Shipment(this.shipment, this.enhancers)
    return shipment.ship()
  }
}
