import { ShipmentSize } from "../models/ShipmentModel";
import { Shipment } from "../shipment/Shipment";
import { Shipper } from "./Shipper";

export class AirEastShipper extends Shipper {

    private static prices = {
        [ShipmentSize.LETTER]: (w: number) => w * 39,
        [ShipmentSize.PACKAGE]: (w: number) => w * 25,
        [ShipmentSize.OVERSIZED]: (w: number) => w * 25 + 10 * 100
    }

    constructor(shipment: Shipment){
        super(shipment)
    }

    getCost(): number {
        const { weight } = this.shipment.getInstance();
        const size = this.getShipmentSize();
        const price = AirEastShipper.prices[size](weight)
        return price
    }
}
