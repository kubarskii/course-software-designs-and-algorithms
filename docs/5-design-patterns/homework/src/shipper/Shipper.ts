import { ShipmentSize } from "../models/ShipmentModel";
import { Shipment } from "../shipment/Shipment";

export abstract class Shipper {
    constructor(protected shipment: Shipment) { }

    getInstance(): Shipper {
        return this
    }

    protected getShipmentSize(): ShipmentSize {
        const { weight } = this.shipment.getInstance()
        if (weight <= 15) return ShipmentSize.LETTER
        if (weight >= 16 && weight <= 160) return ShipmentSize.PACKAGE
        return ShipmentSize.OVERSIZED
    }

    abstract getCost(): number

}