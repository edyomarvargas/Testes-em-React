import { screen } from '@testing-library/react';
import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from '../RenderWithRouter';

test('Testa se a página contém um heading com o texto "Page requested not found"', () => {
  renderWithRouter(<NotFound />);

  const textInPage = /page requested not found/i;
  const title = screen.getByRole('heading', { name: textInPage, level: 2 });
  expect(title).toBeInTheDocument();
});

test('Testa se a página renderiza a imagem correta', () => {
  renderWithRouter(<NotFound />);

  const image = screen.getByRole('img', { name: /pikachu crying because the page/i });
  expect(image).toBeInTheDocument();
  expect(image.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
