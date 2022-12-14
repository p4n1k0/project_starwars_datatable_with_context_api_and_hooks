import React, { useContext } from 'react';
import TableContext from '../context/TableContext';

export default function Table() {
  const { filterByName: { name }, handleFilterName,
    filterData, filterColumn, handleFilterColumn,
    filterComparison, handleFilterComparison, filterQuantity,
    handleFilterQuantity, filterSubmit, selectColumn,
    filterByNumberValues, deleteFilter, deleteAllFilters } = useContext(TableContext);

  return (
    <div>
      <label htmlFor="filterName">
        Name:
        <input
          id="filterName"
          type="text"
          name="filterByName"
          data-testid="name-filter"
          value={ name }
          onChange={ handleFilterName }
        />
      </label>
      <label htmlFor="column-filter">
        Column:
        <select
          data-testid="column-filter"
          value={ filterColumn }
          onChange={ handleFilterColumn }
        >
          {selectColumn.map((filter, index) => (
            <option key={ index }>{filter}</option>
          ))}
        </select>
      </label>
      <label htmlFor="comparison-filter">
        Operator:
        <select
          data-testid="comparison-filter"
          value={ filterComparison }
          onChange={ handleFilterComparison }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="quantity">
        Quantity:
        <input
          id="quantity"
          type="number"
          data-testid="value-filter"
          value={ filterQuantity }
          onChange={ handleFilterQuantity }
        />
      </label>
      <button
        type="button"
        data-testid="button-filter"
        onClick={ filterSubmit }
      >
        Filter:
      </button>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ deleteAllFilters }
      >
        Delete Filters
      </button>
      <ul>
        Filters applied:
        {
          filterByNumberValues.map((filter, index) => (
            <li key={ index } data-testid="filter">
              {`${filter.column} - ${filter.comparison} - ${filter.value}`}
              <button
                type="button"
                onClick={ () => deleteFilter(index) }
              >
                .
              </button>
            </li>
          ))
        }
      </ul>
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
          {filterData.map((planet, index) => (
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
