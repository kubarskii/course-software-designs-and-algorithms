import { describe, it, expect } from "@jest/globals";
import { Shipment } from "../src/shipment/Shipment";
import mockData from '../src/mocks/shipment.json'
import { Enhancer } from "../src/models/ShipmentModel";

describe("Shipment tests", () => {
  it('should create Shipment instance', () => {
    const shipment = new Shipment(mockData, [Enhancer.RETURN_RECEIPT_REQUESTED]);
    expect(shipment).toBeTruthy()
  })

  it('should create ship order', () => {
    const shipment = new Shipment(mockData, [Enhancer.RETURN_RECEIPT_REQUESTED, Enhancer.FRAGILE]);
    const res = shipment.ship()
    expect(res).toBe('')
  })
})
