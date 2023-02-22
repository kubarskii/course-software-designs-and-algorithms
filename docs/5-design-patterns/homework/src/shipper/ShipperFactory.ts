import { Shipment } from "../shipment/Shipment";
import { Shipper } from "../Shipper";
import { AirEastShipper } from "./AirEastShipper";
import { ChicagoSprintShipper } from "./ChicagoSprintShipper";
import { PacificParcelShipper } from "./PacificParcelShipper";

export class ShipperFactory {
    static create(shipment: Shipment): Shipper | never {
        const { fromZipCode } = shipment;
        const firstNumber = Number(fromZipCode[0])
        if ([1, 2, 3].includes(firstNumber)) return new AirEastShipper(shipment)
        if ([4, 5, 6].includes(firstNumber)) return new ChicagoSprintShipper(shipment)
        if ([7, 8, 9].includes(firstNumber)) return new PacificParcelShipper(shipment)
        throw new Error("Invalid ZIP Code!")
    }
}