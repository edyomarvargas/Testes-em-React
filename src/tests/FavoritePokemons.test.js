import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../components';
import App from '../App';
import renderWithRouter from '../RenderWithRouter';

test('Testa se a página contém as informações sobre a Pokédex.', () => {
  renderWithRouter(<FavoritePokemons />);

  const message = screen.getByText(/no favorite pokemon found/i);
  expect(message).toBeInTheDocument();
});

test('Testa se a página contém as informações sobre a Pokédex.', () => {
  const { history } = renderWithRouter(<App />);
  history.push('/pokemons/25');

  const favPokemon = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
  expect(favPokemon).toBeInTheDocument();

  userEvent.click(favPokemon);

  history.push('/favorites');

  const pokemonName = screen.getByText(/pikachu/i);
  expect(pokemonName).toBeInTheDocument();
});
