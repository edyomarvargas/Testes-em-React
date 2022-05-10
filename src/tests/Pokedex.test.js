import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../RenderWithRouter';

const NUMBER_OF_FILTER_BTNS = 7;

test('Testa se a página contém um heading h2 com o texto "Encountered pokémons".', () => {
  renderWithRouter(<App />);

  const title = screen.getByRole('heading', { name: 'Encountered pokémons', level: 2 });
  expect(title).toBeInTheDocument();
});

test(`Testa se é exibido o próximo pokémon da lista
  quando o botão "Próximo pokémon" é clicado.`, () => {
  renderWithRouter(<App />);

  const nextPokemonBtn = screen.getByRole('button', { name: /próximo pokémon/i });
  expect(nextPokemonBtn).toBeInTheDocument();

  userEvent.click(nextPokemonBtn);

  const nextPokemon = screen.getByText(/charmander/i);
  expect(nextPokemon).toBeInTheDocument();
});

test('Testa se é mostrado apenas um pokémon por vez.', () => {
  renderWithRouter(<App />);

  const pokemonImage = screen.getAllByRole('img', { name: /sprite/i });
  expect(pokemonImage.length).toBe(1);
});

test('Testa se a Pokédex tem os botões de filtro.', () => {
  renderWithRouter(<App />);

  const filterButtons = screen.getAllByTestId('pokemon-type-button');
  expect(filterButtons.length).toBe(NUMBER_OF_FILTER_BTNS);

  // Consultei o seguinte link para a linha de teste abaixo:
  // https://github.com/testing-library/jest-dom#tohavetextcontent
  expect(filterButtons[0]).toHaveTextContent('Electric');

  const allPokemonsButton = screen.getByRole('button', { name: /all/i });
  expect(allPokemonsButton).not.toBeDisabled();
  expect(allPokemonsButton).toHaveTextContent('All');

  const nextPokemonBtn = screen.getByRole('button', { name: /próximo pokémon/i });
  userEvent.click(filterButtons[0]);
  expect(nextPokemonBtn).toBeDisabled();
});

test('Testa se a Pokédex contém um botão para resetar o filtro.', () => {
  renderWithRouter(<App />);

  const allPokemonsButton = screen.getByRole('button', { name: /all/i });
  expect(allPokemonsButton).toBeInTheDocument();

  const filterButtons = screen.getAllByTestId('pokemon-type-button');

  userEvent.click(filterButtons[1]);

  const charmander = screen.getByText(/charmander/i);
  expect(charmander).toBeInTheDocument();

  userEvent.click(allPokemonsButton);

  const pikachu = screen.getByText(/pikachu/i);
  expect(pikachu).toBeInTheDocument();
});
