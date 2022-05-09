import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from '../RenderWithRouter';

test('Testa se a página é rederizada com os links de navegação', () => {
  renderWithRouter(<App />);

  const homeLink = screen.getByRole('link', { name: 'Home' });
  const aboutLink = screen.getByRole('link', { name: 'About' });
  const favPokemonLink = screen.getByRole('link', { name: 'Favorite Pokémons' });

  expect(homeLink).toBeInTheDocument();
  expect(aboutLink).toBeInTheDocument();
  expect(favPokemonLink).toBeInTheDocument();
});

test(`Testa se a aplicação é redirecionada para a página inicial,
  na URL / ao clicar no link Home da barra de navegação`, () => {
  renderWithRouter(<App />);

  const homeLink = screen.getByRole('link', { name: 'Home' });
  expect(homeLink).toBeInTheDocument();

  userEvent.click(homeLink);

  const title = screen.getByRole('heading', { name: /encountered pokémons/i, level: 2 });
  expect(title).toBeInTheDocument();
});

test(`Testa se a aplicação é redirecionada para a página de About,
  na URL /about, ao clicar no link About da barra de navegação.`, () => {
  renderWithRouter(<App />);

  const aboutLink = screen.getByRole('link', { name: 'About' });
  expect(aboutLink).toBeInTheDocument();

  userEvent.click(aboutLink);

  const title = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
  expect(title).toBeInTheDocument();
});

test(`Testa se a aplicação é redirecionada para a página de Pokémons Favoritados,
  na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.`, () => {
  renderWithRouter(<App />);

  const favPokemonLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
  expect(favPokemonLink).toBeInTheDocument();

  userEvent.click(favPokemonLink);

  const title = screen.getByRole('heading', { name: /Favorite pokémons/i, level: 2 });
  expect(title).toBeInTheDocument();
});

test(`Testa se a aplicação é redirecionada para a página Not Found
  ao entrar em uma URL desconhecida.`, () => {
  const { history } = renderWithRouter(<App />);
  history.push('/xablau');

  const title = screen.getByRole(
    'heading', { name: /Page requested not found/i, level: 2 },
  );
  expect(title).toBeInTheDocument();
});
