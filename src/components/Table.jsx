import React, { useContext, useEffect } from 'react';
import TableContext from '../context/TableContext';

export default function Table() {
  const { filterByName: { name }, handleFilterName,
    filterData, filterColumn, handleFilterColumn,
    filterComparison, handleFilterComparison, filterQuantity, orderToSort,
    handleFilterQuantity, filterSubmit, selectColumn, columnToSort,
    filterByNumberValues, deleteFilter, deleteAllFilters, order, setOrder,
    handleRadioButtons, setColumnToSort, isAscendent, isDescendent,
  } = useContext(TableContext);

  useEffect(() => { }, [filterData]);
  const sortColumns = (data) => {
    if (order.column === 'name') return data.sort((a, b) => a.name.localeCompare(b.name));
    if (order.sort === 'ASC') {
      return data.sort((a, b) => a[order.column] - b[order.column]);
    }
    data.sort((a, b) => a[order.column] - b[order.column]);
    return data.sort((a, b) => b[order.column] - a[order.column]);
  };

  return (
    <div>
      <label htmlFor="filterName">
        <input
          id="filterName"
          type="text"
          name="filterByName"
          data-testid="name-filter"
          value={ name }
          onChange={ handleFilterName }
        />
      </label>
      <br />
      <label htmlFor="columnFilter">
        Coluna:
        <select
          data-testid="column-filter"
          value={ filterColumn }
          onChange={ handleFilterColumn }
        >
          {selectColumn.map((filter, index) => (
            <option key={ index }>{ filter }</option>
          ))}
        </select>
      </label>
      <label htmlFor="comparison-filter">
        Operador:
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
        Quantidade:
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
        Filtrar
      </button>
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ deleteAllFilters }
      >
        Delete filtros
      </button>
      <select
        name="column-sort"
        data-testid="column-sort"
        onChange={ (event) => { setColumnToSort(event.target.value); } }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <div>
        <input
          type="radio"
          name="radio-asc"
          id="radio-asc"
          data-testid="column-sort-input-asc"
          value="ASC"
          checked={ isAscendent }
          onChange={ handleRadioButtons }
        />
        Ascendente
        <input
          type="radio"
          name="radio-desc"
          id="radio-desc"
          data-testid="column-sort-input-desc"
          value="DESC"
          checked={ isDescendent }
          onChange={ handleRadioButtons }
        />
        Descendente
      </div>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ () => { setOrder({ column: columnToSort, sort: orderToSort }); } }
      >
        Ordenar
      </button>
      <br />
      <ul>
        Filters applied:
        {
          filterByNumberValues.map((filter, index) => (
            <li key={ index } data-testid="filter">
              {`${filter.column} - ${filter.comparison} - ${filter.value}`}
              <button
                type="button"
                onClick={ () => deleteFilter(index) }
                data-testid="filter-btn"
              >
                X
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
          {sortColumns(filterData).map((planet, index) => (
            <tr key={ index }>
              <td data-testid="planet-name">{planet.name}</td>
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
