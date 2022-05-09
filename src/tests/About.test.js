import { screen } from '@testing-library/react';
import React from 'react';
import { About } from '../components';
import renderWithRouter from '../RenderWithRouter';

test('Testa se a página contém as informações sobre a Pokédex.', () => {
  renderWithRouter(<About />);

  const title = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });
  const firstParagraph = screen.getByText(/this application simulates a pokédex, a dig/i);
  const secondParagraph = screen.getByText(/one can filter pokémons by type, and see/i);

  expect(title).toBeInTheDocument();
  expect(firstParagraph).toBeInTheDocument();
  expect(secondParagraph).toBeInTheDocument();
});

test('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
  renderWithRouter(<About />);

  const title = screen.getByRole('heading', { name: /about pokédex/i, level: 2 });
  expect(title).toBeInTheDocument();
});

test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
  renderWithRouter(<About />);

  const firstParagraph = screen.getByText(/this application simulates a pokédex, a dig/i);
  const secondParagraph = screen.getByText(/one can filter pokémons by type, and see/i);

  expect(firstParagraph).toBeInTheDocument();
  expect(secondParagraph).toBeInTheDocument();
});

test('Teste se a página contém a imagem de uma Pokédex', () => {
  renderWithRouter(<About />);

  const image = screen.getByRole('img', { name: /pokédex/i });
  expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
