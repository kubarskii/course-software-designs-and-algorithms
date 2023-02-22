import { ShipmentSize } from "../models/ShipmentModel";
import { Shipment } from "../shipment/Shipment";
import { Shipper } from "./Shipper";

export class ChicagoSprintShipper extends Shipper {

    private static prices = {
        [ShipmentSize.LETTER]: (w: number) => w * 42,
        [ShipmentSize.PACKAGE]: (w: number) => w * 20,
        [ShipmentSize.OVERSIZED]: (w: number) => w * 20
    }

    constructor(shipment: Shipment){
        super(shipment)
    }

    getCost(): number {
        const { weight } = this.shipment.getInstance();
        const size = this.getShipmentSize();
        const price = ChicagoSprintShipper.prices[size](weight)
        return price
    }
}
