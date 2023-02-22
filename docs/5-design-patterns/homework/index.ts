import { validateShema } from "./src/utils/shipmentValidator";
import shipmentMock from "./src/mocks/shipment.json";
import { Client } from "./src/Client";
import { Enhancer } from "./src/models/ShipmentModel";

const isValidShipment = validateShema(shipmentMock);
if (isValidShipment) {
  const response = new Client(shipmentMock, [ Enhancer.DO_NOT_LEAVE, Enhancer.RETURN_RECEIPT_REQUESTED, Enhancer.FRAGILE ])
  console.log(response.process());
} else {
  throw new Error(' INVALID SHIPMENT DETAILS ')
}
