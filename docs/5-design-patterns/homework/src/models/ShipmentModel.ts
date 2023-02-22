export interface ShipmentModel {
  ShipmentID: number;
  Weight: number;
  FromAddress: string;
  FromZipCode: string;
  ToAddress: string;
  ToZipCode: string;
}

export enum ShipmentSize {
  LETTER,
  PACKAGE,
  OVERSIZED
}

export enum Enhancer {
  FRAGILE,
  DO_NOT_LEAVE,
  RETURN_RECEIPT_REQUESTED
}

/**
 *
 * Some funny types down below
 * We don't really need them and tuples are not
 * very convenient as it's not possible to
 * change sequence
 *
 */

export type UnionToIntersection<U> =
  (U extends any ? (k: U) => void : never) extends ((k: infer I) => void)
  ? I
  : never;

export type LastOf<T> =
  UnionToIntersection<T extends any ? () => T : never> extends () => infer R
  ? R
  : never;

export type Push<T extends any[], V> = [...T, V];

export type TuplifyUnion<T, L = LastOf<T>, N = [T] extends [never] ? true : false> =
  true extends N
  ? []
  : Push<TuplifyUnion<Exclude<T, L>>, L>;

export type TupleCombos<T, O = T> =
  T extends infer U
  ? [T] | (TupleCombos<Exclude<O, U>> extends infer U extends any[]
    ? U extends U ? TuplifyUnion<T | U[number]> : never
    : never)
  : never

export type Enhancers = TupleCombos<Enhancer> | []
