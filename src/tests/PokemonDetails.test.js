import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../RenderWithRouter';

test(`Testa se as informações detalhadas do pokémon
  selecionado são mostradas na tela.`, () => {
  renderWithRouter(<App />);

  const moreDetailsBtn = screen.getByRole('link', { name: /more details/i });
  userEvent.click(moreDetailsBtn);

  const title = screen.getByRole('heading', { name: /pikachu details/i });
  expect(title).toBeInTheDocument();
  expect(moreDetailsBtn).not.toBeInTheDocument();

  const summaryEl = screen.getByRole('heading', { name: /summary/i, level: 2 });
  expect(summaryEl).toBeInTheDocument();

  const pokemonSummary = screen.getByText(/this intelligent pokémon roasts hard/i);
  expect(pokemonSummary).toBeInTheDocument();
});

test(`Testa se existe na página uma seção com os mapas
  contendo as localizações do pokémon.`, () => {
  renderWithRouter(<App />);

  const moreDetailsBtn = screen.getByRole('link', { name: /more details/i });
  userEvent.click(moreDetailsBtn);

  const text = /game locations of pikachu/i;
  const locationsTitle = screen.getByRole('heading', { name: text, level: 2 });
  expect(locationsTitle).toBeInTheDocument();

  const images = screen.getAllByAltText(/pikachu location/i);
  expect(images.length).toBe(2);
  expect(images[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  expect(images[1].src).toBe('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
});

test(`Testa se o usuário pode favoritar um pokémon
  através da página de detalhes.`, () => {
  const { history } = renderWithRouter(<App />);

  const moreDetailsBtn = screen.getByRole('link', { name: /more details/i });
  userEvent.click(moreDetailsBtn);

  const checkboxEl = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
  expect(checkboxEl).toBeInTheDocument();

  userEvent.click(checkboxEl);
  history.push('/favorites');

  const pokemonName = screen.getByText(/pikachu/i);
  expect(pokemonName).toBeInTheDocument();

  history.push('/pokemons/25');
  userEvent.click(checkboxEl);

  history.push('/favorites');
  expect(pokemonName).not.toBeInTheDocument();
});
