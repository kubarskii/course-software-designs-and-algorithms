import { ShipmentSize } from "../models/ShipmentModel";
import { Shipment } from "../shipment/Shipment";
import { Shipper } from "./Shipper";

export class PacificParcelShipper extends Shipper {

    private static prices = {
        [ShipmentSize.LETTER]: (w: number) => w * 51,
        [ShipmentSize.PACKAGE]: (w: number) => w * 19,
        [ShipmentSize.OVERSIZED]: (w: number) => w * (19 + 0.02)
    }

    constructor(shipment: Shipment){
        super(shipment)
    }

    getCost(): number {
        const { weight } = this.shipment.getInstance();
        const size = this.getShipmentSize();
        const price = PacificParcelShipper.prices[size](weight)
        return price;
    }
}
