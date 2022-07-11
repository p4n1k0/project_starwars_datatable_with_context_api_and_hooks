import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import TableContext from './TableContext';

function TableProvider({ children }) {
  const [results, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const endpoint = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
        const { data } = await endpoint.json();
        const planets = data.map((planet) => {
          delete planet.residents;
          return planet;
        });
        setData(planets);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const typeContext = {
    results,
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

export default TableProvider;
