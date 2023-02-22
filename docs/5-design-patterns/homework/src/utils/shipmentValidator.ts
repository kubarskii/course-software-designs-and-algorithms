import { ShipmentModel } from "../models/ShipmentModel";

const curry2 = (fn: (...args: any[]) => any) => (a: any) => (b: any) =>
  fn(a, b);

/**
 * Less than or equal
 * */
const lte = curry2((a: any, b: any) => a <= b);
/**
 * Greater than or equal
 * */
const gte = curry2((a: any, b: any) => a >= b);

export type SchemaProperty = {
  type: string;
  maxLength?: number;
  minLength?: number;
  match?: RegExp;
};

export const shipmentSchema: Record<keyof ShipmentModel, SchemaProperty> = {
  FromAddress: {
    type: "string",
    /** a string containing street, city, and state */
    match: /street:.*, city:.*, state:.*\.?/gim,
  },
  FromZipCode: {
    type: "string",
    maxLength: 5,
    minLength: 5,
  },
  ShipmentID: {
    type: "number",
  },
  ToAddress: {
    type: "string",
    /** a string containing street, city, and state*/
    match: /street:.*, city:.*, state:.*\.?/gim,
  },
  ToZipCode: {
    type: "string",
    maxLength: 5,
    minLength: 5,
  },
  Weight: {
    type: "number",
  },
} as const;

const both = (f: (...args: any) => any, g: (...args: any) => any) => (x: any) =>
  f(x) && g(x);

const Filter = (fns: Array<(...args: any[]) => any>) =>
  fns.reduce(
    (acc, fn) => both(acc, fn),
    () => true
  );

/**
 * Works only with primitives,
 * doesn't support null and objects
 * is enough for our use case
 * */
const validateType = curry2((value: any, { type }: SchemaProperty) => {
  if (type === "any") return true;
  return type === typeof value;
});

const validateMinLength = curry2(
  (value: any, { minLength }: SchemaProperty) => {
    return minLength != undefined
      ? gte(value.toString().length)(minLength)
      : true;
  }
);

const validateMaxLength = curry2(
  (value: any, { maxLength }: SchemaProperty) => {
    return maxLength != undefined
      ? lte(value.toString().length)(maxLength)
      : true;
  }
);

const validateRegExp = curry2(
  (value: any, { match }: SchemaProperty) => {
      if (!match) return true;
      return match.test(value.toString());
    }
)

/**
 * Either monad can be used to improve error messages
 * */
export const validateShema = <T extends {} = ShipmentModel>(
  shipment: T,
  config: any = shipmentSchema
): boolean => {
  return (Object.entries(shipment) as [keyof T, SchemaProperty][]).every(
    ([key, value]) => {
      const semiSchema = config[key];
      const validator = Filter([
        validateType(value),
        validateMaxLength(value),
        validateMinLength(value),
        validateRegExp(value),
      ]);
      return validator(semiSchema);
    }
  );
};
