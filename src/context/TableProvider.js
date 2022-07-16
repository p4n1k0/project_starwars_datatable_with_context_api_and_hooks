import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TableContext from './TableContext';

const columnFilter = ['population', 'orbital_period',
  'diameter', 'rotation_period', 'surface_water'];

export default function TableProvider({ children }) {
  const [data, setData] = useState([]);
  const [filterByName, setFilterByName] = useState('');
  const handleFilterName = ({ target }) => setFilterByName(target.value);

  useEffect(() => {
    const getData = async () => {
      const endpoint = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const { results } = await endpoint.json();
      const planets = results.filter((planet) => planet !== 'residents');

      setData(planets);
    };
    getData();
  }, []);

  const [filterData, setFilterData] = useState([...data]);
  const [filterByNumberValues, setFilterByNumberValues] = useState([]);

  useEffect(() => {
    const nameByFilter = data.filter((planet) => (
      planet.name.toLowerCase().includes(filterByName)
    ));

    const newList = filterByNumberValues.reduce((acc, index) => acc.filter((planet) => {
      switch (index.comparison) {
      case 'maior que':
        return Number(planet[index.column]) > Number(index.value);
      case 'menor que':
        return Number(planet[index.column]) < Number(index.value);
      case 'igual a':
        return Number(planet[index.column]) === Number(index.value);
      default:
        return planet;
      }
    }), nameByFilter);
    setFilterData(newList);
  }, [data, filterByName, filterByNumberValues]);

  const [filterColumn, setFilterColumn] = useState('population');
  const handleFilterColumn = ({ target }) => { setFilterColumn(target.value); };

  const [filterComparison, setFilterComparison] = useState('maior que');
  const handleFilterComparison = ({ target }) => { setFilterComparison(target.value); };

  const [filterQuantity, setFilterQuantity] = useState(0);
  const handleFilterQuantity = ({ target }) => { setFilterQuantity(target.value); };

  const [selectColumn, setSelectColumn] = useState(columnFilter);

  const filterSubmit = () => {
    const newFilter = {
      column: filterColumn,
      comparison: filterComparison,
      value: filterQuantity,
    };
    setFilterByNumberValues([...filterByNumberValues, newFilter]);

    const newSelect = selectColumn.filter((select) => select !== filterColumn);
    setSelectColumn(newSelect);
    setFilterColumn(newSelect[0]);
  };

  const deleteFilter = (index) => {
    setFilterByNumberValues(
      filterByNumberValues.filter((_filter, indexFilter) => indexFilter !== index),
    );
  };

  const deleteAllFilters = () => {
    setFilterByNumberValues([]);
    setSelectColumn(columnFilter);
  };

  useEffect(() => {
    const selectReturn = columnFilter.reduce((acc, select) => {
      if (filterByNumberValues.some((e) => e.column === select)) {
        return acc;
      }
      acc.push(select);
      return acc;
    }, []);
    setSelectColumn(selectReturn);
  }, [filterByNumberValues]);

  const contextValue = {
    data,
    filterByName,
    handleFilterName,
    filterData,
    filterColumn,
    handleFilterColumn,
    filterComparison,
    handleFilterComparison,
    filterQuantity,
    handleFilterQuantity,
    filterSubmit,
    selectColumn,
    filterByNumberValues,
    deleteFilter,
    deleteAllFilters,
  };

  return (
    <TableContext.Provider value={ contextValue }>
      {children}
    </TableContext.Provider>
  );
}

TableProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
