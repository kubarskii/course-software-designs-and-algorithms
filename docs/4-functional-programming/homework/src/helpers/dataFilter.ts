import { TFiltersState } from 'src/store';
import { Row } from 'src/components/Table/Table';

const both = (f, g) => x => f(x) && g(x);
const either = (f, g) => x => f(x) || g(x);

const True = () => true;
const False = () => false;

/**
 * Curry for 2 args fn
 */
const curry2 = (fn: (a: any, b: any) => any) => (a: any) => (b: any) =>
  fn(a, b);

const overlap = (a: string, b: string) =>
  a.toLowerCase().includes(b.toLowerCase());

const searchInCountry = curry2((search: string, row: Row) =>
  overlap(row.country, search)
);

const searchInUsername = curry2((search: string, row: Row) =>
  overlap(row.username, search)
);

const searchInName = curry2((search: string, row: Row) =>
  overlap(row.name, search)
);

const filterMoreThen100 = curry2(
  (filters: string[], row: Row) =>
    filters.includes('More than 100 posts') && row.posts > 100
);

const filterWithoutPosts = curry2(
  (filters: string[], row: Row) =>
    filters.includes('Without posts') && row.posts === 0
);

const Filter = (
  predicates: Array<(...args: any) => any>,
  comparator: Function = either
) => {
  return predicates.reduce(
    (fn, predicate) => {
      return comparator(fn, predicate);
    },
    comparator == either ? False : True
  );
};

const filterRows =
  ({ query, filters }: TFiltersState) =>
  (rows: Row[]): Row[] => {
    const searchFilters = [
      searchInCountry(query),
      searchInName(query),
      searchInUsername(query),
    ];
    const dropDownFilters = [
      filterWithoutPosts(filters),
      filterMoreThen100(filters),
    ];

    if (!query && filters.length) searchFilters.length = 0;
    return rows.filter(Filter([...dropDownFilters, ...searchFilters]));
  };

const sortRows =
  ({ sortingOrder }: TFiltersState) =>
  (rows: Row[]): Row[] => {
    if (!sortingOrder) return rows;
    return rows.slice().sort((a, b) => {
      if (sortingOrder === 'desc') [a, b] = [b, a];
      return a.lastPayments - b.lastPayments;
    });
  };

const pipe =
  (...fns: Array<(arg: any) => any>) =>
  (x: any) =>
    fns.reduceRight((acc, curr) => curr(acc), x);

export const dataFilter = (rows: Row[] = [], filtersObject: TFiltersState) => {
  const pipeline = pipe(filterRows(filtersObject), sortRows(filtersObject));
  return pipeline(rows);
};
