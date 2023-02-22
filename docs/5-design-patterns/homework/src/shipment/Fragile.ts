import { Enhancer } from "../models/ShipmentModel";
import { Shipment } from "./Shipment";

export const Fragile = <T extends { new(...args: any[]): Shipment }>(
  Target: T
) => {
  return class extends Target {
    ship() {
      let res = super.ship();
      return (Enhancer.FRAGILE in this.enhancers)
        ? (res += "\n**MARK FRAGILE**")
        : res;
    }
  };
};
