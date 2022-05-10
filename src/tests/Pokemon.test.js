import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../RenderWithRouter';

test('Testa se é renderizado um card com as informações de determinado pokémon.', () => {
  renderWithRouter(<App />);

  const title = screen.getByRole('heading', { name: 'Encountered pokémons', level: 2 });
  expect(title).toBeInTheDocument();
});
