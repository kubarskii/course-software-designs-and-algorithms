import { Enhancers, ShipmentModel } from "./models/ShipmentModel";
import { Shipment } from "./shipment/Shipment";

export class Client {
  constructor(private shipment: ShipmentModel, private enhancers: Enhancers) {
  }

  process() {
    const shipment = new Shipment(this.shipment, this.enhancers)
    return shipment.ship()
  }
}
