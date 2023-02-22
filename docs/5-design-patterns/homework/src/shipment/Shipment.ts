import { Enhancers, ShipmentModel } from "../models/ShipmentModel";
import { IDGenerator } from "../IDGenerator";
import { Receipt } from "./Receipt";
import { Fragile } from "./Fragile";
import { DoNotLeave } from "./DoNotLeave";
import { ShipperFactory } from "../shipper/ShipperFactory";

export interface IShippable {
    ship(): void
}

@Receipt
@Fragile
@DoNotLeave
export class Shipment implements IShippable{

    protected readonly shipmentID: number
    public readonly weight: number
    public readonly fromAddress: string
    public readonly fromZipCode: string
    public readonly toAddress: string
    public readonly toZipCode: string

    constructor(shipment: ShipmentModel, protected enhancers: Enhancers = []){
        const {
            FromAddress,
            FromZipCode,
            ShipmentID,
            ToAddress,
            ToZipCode,
            Weight
        } = shipment

        this.shipmentID = (!ShipmentID) ? IDGenerator.getId() : ShipmentID

        this.fromAddress = FromAddress
        this.fromZipCode = FromZipCode
        this.toAddress = ToAddress
        this.toZipCode = ToZipCode
        this.weight = Weight
    }

    getInstance(): Shipment {
        return this
    }

    getShipmentID(): number {
        return this.shipmentID
    }

    ship(): string {
        let str = `Shipment with the ID ${this.shipmentID} will be picked up from ${this.fromZipCode} ${this.fromAddress} and shipped to ${this.toZipCode} ${this.toAddress}`
        const shipper = ShipperFactory.create(this)
        str += `\nCost = ${(shipper.getCost() / 1000).toFixed(2)}`
        return str
    }
 }
