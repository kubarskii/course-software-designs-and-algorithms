import { Reducer } from 'react';

export type ToCamelCase<S extends string> =
  S extends `${infer FirstWord}_${infer FirstLetter}${infer Rest}`
    ? `${Lowercase<FirstWord>}${Uppercase<FirstLetter>}${Lowercase<Rest>}`
    : Lowercase<S>;

export type TObjectToCamel<Obj> = {
  [Key in keyof Obj as ToCamelCase<string & Key>]: Obj[Key];
};

export type TCamelKeys<Obj> = keyof TObjectToCamel<Obj>;

export type TSortingOrder = 'asc' | 'desc' | null;

export type TFiltersState = {
  sortingOrder: TSortingOrder;
  filters: string[];
  query: string;
};

export enum actionTypes {
  UPDATE_FILTER = 'UPDATE_FILTER',
  UPDATE_SORTING = 'UPDATE_SORTING',
  UPDATE_QUERY = 'UPDATE_QUERY',
}

export type TAction<Payload extends any = any> = {
  type: actionTypes;
  payload: Payload;
};

export const actions: Record<
  TCamelKeys<typeof actionTypes>,
  <P>(payload: P) => TAction<P>
> = {
  updateFilter(filters) {
    return {
      type: actionTypes.UPDATE_FILTER,
      payload: filters,
    };
  },
  updateSorting(order) {
    return {
      type: actionTypes.UPDATE_SORTING,
      payload: order,
    };
  },
  updateQuery(query) {
    return {
      type: actionTypes.UPDATE_QUERY,
      payload: query,
    };
  },
};

export const filtersReducer: Reducer<TFiltersState, TAction> = (
  state,
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.UPDATE_FILTER: {
      return {
        ...state,
        filters: payload,
      };
    }
    case actionTypes.UPDATE_QUERY: {
      return {
        ...state,
        query: payload,
      };
    }
    case actionTypes.UPDATE_SORTING: {
      return {
        ...state,
        sortingOrder: payload,
      };
    }
    default:
      return state;
  }
};
