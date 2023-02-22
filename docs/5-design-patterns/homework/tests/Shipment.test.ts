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
    const shipment = new Shipment(mockData, [Enhancer.DO_NOT_LEAVE, Enhancer.RETURN_RECEIPT_REQUESTED, Enhancer.FRAGILE]);
    const res = shipment.ship()
    expect(res).toBe('Shipment with the ID 10 will be picked up from 49222 street: random avenue, city: Trabzon, state: random state and shipped to 72271 street: random street, city: Antalya, state: random state.\n' +
        'Cost = 33.40\n' +
        '**MARK DO NOT LEAVE IF ADDRESS NOT AT HOME**\n' +
        '**MARK FRAGILE**\n' +
        '**MARK RETURN RECEIPT REQUESTED**')
  })
})
