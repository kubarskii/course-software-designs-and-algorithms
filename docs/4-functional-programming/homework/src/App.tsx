import React, {
  FC,
  Reducer,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { StyledEngineProvider } from '@mui/material/styles';

import { Account, Image, User } from '../types';
import { Filters, Row, Search, Sort, Table } from './components';
import { getAccounts, getImages, getUsers } from './mocks/api';

import styles from './App.module.scss';
import { dataConverter } from './helpers/dataConverter';
import { actions, filtersReducer, TFiltersState, TSortingOrder } from './store';
import { dataFilter } from './helpers/dataFilter';

const initialState: TFiltersState = {
  sortingOrder: null,
  filters: [],
  query: '',
};

export const App: FC = () => {
  const [data, setData] = useState<Row[] | undefined>(undefined);
  const [filteredData, setFiltered] = useState<Row[]>(undefined);

  const [state, dispatch] = useReducer(filtersReducer, initialState);

  useEffect(() => {
    // fetching data from API
    Promise.all([getImages(), getUsers(), getAccounts()]).then(
      ([images, users, accounts]: [Image[], User[], Account[]]) =>
        setData(dataConverter(users, accounts, images))
    );
  }, []);

  useEffect(() => {
    if (data) {
      const res = dataFilter(data, state);
      console.log(res);
      setFiltered(res);
    }
  }, [state]);

  const updateFilters = useCallback((filterValue: string[]) => {
    dispatch(actions.updateFilter(filterValue));
  }, []);

  const updateSort = useCallback((sort: TSortingOrder) => {
    dispatch(actions.updateSorting(sort));
  }, []);

  const updateQuery = useCallback((query: string) => {
    dispatch(actions.updateQuery(query));
  }, []);

  return (
    <StyledEngineProvider injectFirst>
      <div className="App">
        <div className={styles.container}>
          <div className={styles.sortFilterContainer}>
            <Filters updateStore={updateFilters} />
            <Sort updateStore={updateSort} />
          </div>
          <Search updateStore={updateQuery} />
        </div>
        <Table rows={filteredData || data || []} />
      </div>
    </StyledEngineProvider>
  );
};
