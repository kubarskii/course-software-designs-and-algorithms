import { Enhancer } from "../models/ShipmentModel";
import { Shipment } from "./Shipment";

export const Receipt = <T extends { new(...args: any[]): Shipment }>(
  Target: T
) => {
  return class extends Target {
    ship() {
      let res = super.ship();
      return (Enhancer.RETURN_RECEIPT_REQUESTED in this.enhancers)
        ? (res += "\n**MARK RETURN RECEIPT REQUESTED**")
        : res;
    }
  };
};
