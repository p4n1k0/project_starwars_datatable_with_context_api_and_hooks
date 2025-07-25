import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import testData from '../../cypress/mocks/testData';


describe("Testes da aplicação StarWars", () => {
  beforeEach(async () => {
    jest.spyOn(global, "fetch");
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(testData),
    });
    render(<App />);
    expect(
      await screen.findByRole("cell", { name: /tatooine/i })
    ).toBeInTheDocument();
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Verifica se a API foi chamada", () => {
    expect(fetch).toBeCalled();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toBeCalledWith("https://swapi.bry.com.br/api/planets/");
  });

  it("Teste se possui uma tabela", () => {
    expect(screen.getByRole("cell", { name: /alderaan/i })).toBeInTheDocument();
    expect(screen.getAllByRole("columnheader")).toHaveLength(13);
  });

  it("Testa botões de filtragem", () => {
    expect(screen.getByTestId("name-filter")).toBeInTheDocument();
    expect(screen.getByTestId("column-filter")).toBeInTheDocument();
    expect(screen.getByTestId("comparison-filter")).toBeInTheDocument();
    expect(screen.getByTestId("value-filter")).toBeInTheDocument();
    expect(screen.getByTestId("button-filter")).toBeInTheDocument();
    expect(screen.getByTestId("button-remove-filters")).toBeInTheDocument();
  });

  it("Teste de filtragem pelo nome", () => {
    const inputName = screen.getByTestId("name-filter");
    const nameTatooine = screen.getByRole("row", { name: /tatooine/i });
    const nameCoruscant = screen.getByRole("row", { name: /coruscant/i });
    const nameHoth = screen.getByRole("row", { name: /hoth/i });

    expect(nameTatooine).toBeInTheDocument();
    expect(nameCoruscant).toBeInTheDocument();
    expect(nameHoth).toBeInTheDocument();

    userEvent.type(inputName, "oo");

    expect(nameCoruscant).not.toBeInTheDocument();
    expect(nameHoth).not.toBeInTheDocument();
  });

  it("Teste de filtragem igual a ", () => {
    const column = screen.getByTestId("column-filter");
    const filter = screen.getByRole("button", { name: /filtrar/i });
    const comparison = screen.getByTestId("comparison-filter");
    const value = screen.getByTestId("value-filter");
    const removeAll = screen.getByTestId("button-remove-filters");
    const nameCoruscant = screen.getByRole("row", { name: /coruscant/i });

    userEvent.selectOptions(column, "rotation_period");
    userEvent.selectOptions(comparison, "igual a");
    userEvent.clear(value);
    userEvent.type(value, "23");
    userEvent.click(filter);

    expect(nameCoruscant).toBeInTheDocument();
    expect(removeAll).toBeInTheDocument();

    userEvent.click(removeAll);
    expect(screen.getAllByRole("row")).toHaveLength(11);
  });

  it("Teste de filtragem maior que", () => {
    const column = screen.getByTestId("column-filter");
    const comparison = screen.getByTestId("comparison-filter");
    const value = screen.getByTestId("value-filter");
    const button = screen.getByTestId("button-filter");

    userEvent.selectOptions(column, "population");
    userEvent.selectOptions(comparison, "maior que");
    userEvent.clear(value);
    userEvent.type(value, "0");
    userEvent.click(button);

    expect(screen.getByRole("cell", { name: /tatooine/i })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: /coruscant/i })).toBeInTheDocument();
    expect(screen.getByRole("cell", { name: /kamino/i })).toBeInTheDocument();
  });

  it("Verifica a utilização do Filtro Numérico 'menor que'", () => {
    const inputValue = screen.getByTestId("value-filter");
    const filterBtn = screen.getByRole("button", { name: /filtrar/i });
    const optionColumn = screen.getByTestId("column-filter");
    const optionComparison = screen.getByTestId("comparison-filter");
    const nameCoruscant = screen.getByRole("row", { name: /coruscant/i });
    const nameHoth = screen.getByRole("row", { name: /hoth/i });

    userEvent.selectOptions(optionColumn, "surface_water");
    userEvent.selectOptions(optionComparison, "menor que");
    userEvent.clear(inputValue);
    userEvent.type(inputValue, "30");
    userEvent.click(filterBtn);


    expect(nameHoth).toBeInTheDocument();
    expect(nameCoruscant).toBeInTheDocument();
  });

  it("Teste se o btn de remover filter funciona", () => {
    const filtrar = screen.getByTestId("button-filter");
    expect(filtrar).toBeInTheDocument();
    userEvent.click(filtrar);

    expect(screen.getByTestId("filter")).toBeInTheDocument();

    const btnFilter = screen.getByTestId("filter-btn");
    expect(btnFilter).toBeInTheDocument();

    userEvent.click(btnFilter);
    expect(btnFilter).not.toBeInTheDocument();
  });

  it("Verifica a utilização do Filtro Numérico e presença do botão remover", () => {
    const inputValue = screen.getByTestId("value-filter");
    const filterBtn = screen.getByRole("button", { name: /filtrar/i });
    const optionColumn = screen.getByTestId("column-filter");
    const nameTatooine = screen.getByRole("row", { name: /tatooine/i });
    const nameAlderaan = screen.getByRole("row", { name: /alderaan/i });
    const nameHoth = screen.getByRole("row", { name: /hoth/i });
    const nameCoruscant = screen.getByRole("row", { name: /coruscant/i });

    userEvent.selectOptions(optionColumn, "population");
    userEvent.clear(inputValue);
    userEvent.type(inputValue, "2000");
    userEvent.click(filterBtn);

    expect(nameAlderaan).toBeInTheDocument();
    expect(nameHoth).toBeInTheDocument();
    expect(nameCoruscant).toBeInTheDocument();

    const removeOne = screen.getByTestId("button-remove-filters");
    expect(removeOne).toBeInTheDocument();

    userEvent.click(removeOne);

    expect(nameAlderaan).toBeInTheDocument();
    expect(nameHoth).toBeInTheDocument();
    expect(nameCoruscant).toBeInTheDocument();
    expect(nameTatooine).not.toBeInTheDocument();
  });

  it('Testa se os botões de ascendente e descendente funcionam', () => {
    const columnSort = screen.getByTestId('column-sort');
    const sortAsc = screen.getByTestId('column-sort-input-asc');
    const sortDesc = screen.getByTestId('column-sort-input-desc');
    const submitSort = screen.getByRole('button', { name: /ordenar/i })

    userEvent.selectOptions(columnSort, 'diameter');
    expect(columnSort).toHaveValue('diameter');

    userEvent.click(sortAsc);
    userEvent.click(submitSort);
    expect(screen.getAllByTestId('planet-name')[0]).toHaveTextContent('Endor');

    userEvent.click(sortDesc);
    userEvent.click(submitSort);
    expect(screen.getAllByTestId('planet-name')[0]).toHaveTextContent('Bespin');
  });
});
