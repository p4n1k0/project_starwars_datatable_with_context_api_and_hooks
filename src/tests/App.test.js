import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';


const array = ['Name', 'Rotation Period', 'Orbital Period', 'Diameter', 'Climate', 'Gravity', 'Terrain', 'Surface Water', 'Population', 'Films', 'Created', 'Edited', 'URL']

describe('Testa app', () => {
  beforeEach(() => render(<App />))
  test('Verifica se há uma tabela', async () => {
    array.forEach((theaders) => expect(screen.getByText(theaders)).toBeInTheDocument())
    const filterName = screen.getByTestId('name-filter');
    expect(filterName ).toBeInTheDocument();

    userEvent.type(filterName, 'tato')
    userEvent.type(filterName, '')
  })
  
  test('I am your test', async () => {
    expect(await screen.findByText(/Endor/i)).toBeInTheDocument()

    const filterBtn = screen.getByTestId('button-filter')
    const filterColumn = screen.getByTestId('column-filter')
    const filterComparison = screen.getByTestId('comparison-filter')
    const filterValue = screen.getByTestId('value-filter')

    userEvent.selectOptions(filterColumn,
      screen.getByRole('option', { name: /population/i }))
      userEvent.selectOptions(filterComparison,
      screen.getByRole('option', { name: 'maior que'}))
      userEvent.type(filterValue, '999')
      userEvent.click(filterBtn)

    const deleteBtn = screen.getAllByRole('button', { name: /x/i })
    userEvent.click(deleteBtn[0])

    const deleteAllBtn = screen.getByRole('button', { name: /remove filters/i})
    userEvent.click(deleteAllBtn)

  });
})