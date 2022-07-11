import React, { useContext, useState } from 'react';
import TableContext from '../context/TableContext';

export default function Table() {
  const { data } = useContext(TableContext);
  const [filterName, setFilterName] = useState('');
  const handleFilterName = ({ target: { value } }) => setFilterName(value);

  return (
    <div>
      <label htmlFor="filterName">
        Name:
        <input
          id="filterName"
          type="text"
          name="filterByName"
          data-testid="name-filter"
          onChange={ handleFilterName }
        />
      </label>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {data.filter((planet) => planet.name.toLowerCase()
            .includes(filterName.toLowerCase()))
            .map((planet, index) => (
              <tr key={ index }>
                <td>{planet.name}</td>
                <td>{planet.rotation_period}</td>
                <td>{planet.orbital_period}</td>
                <td>{planet.diameter}</td>
                <td>{planet.climate}</td>
                <td>{planet.gravity}</td>
                <td>{planet.terrain}</td>
                <td>{planet.surface_water}</td>
                <td>{planet.population}</td>
                <td>{planet.films}</td>
                <td>{planet.created}</td>
                <td>{planet.edited}</td>
                <td>{planet.url}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
