import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TableContext from './TableContext';

export default function TableProvider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const endpoint = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const { results } = await endpoint.json();
      const planets = results.filter((planet) => planet !== 'residents');

      setData(planets);
    };
    getData();
  }, []);

  const typeContext = {
    data,
    setData,
  };

  return (
    <TableContext.Provider value={ typeContext }>
      {children}
    </TableContext.Provider>
  );
}

TableProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
