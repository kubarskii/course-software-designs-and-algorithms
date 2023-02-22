import { Enhancer } from "../models/ShipmentModel";
import { Shipment } from "./Shipment";

export const DoNotLeave = <T extends { new(...args: any[]): Shipment }>(
  Target: T
) => {
  return class extends Target {
    ship() {
      let res = super.ship();
      return (Enhancer.DO_NOT_LEAVE in this.enhancers)
        ? (res += "\n**MARK DO NOT LEAVE IF ADDRESS NOT AT HOME**")
        : res;
    }
  };
};
