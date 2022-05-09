import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testes para o requisito 4', () => {
  test('Verifica se o h2 da pag contem Page request...', () => {
    renderWithRouter(<NotFound />);
    const titleNotFoud = screen
      .getByRole('heading', { name: /Page requested not found/i }, { level: 2 });
    expect(titleNotFoud).toBeInTheDocument();
    const img = screen.getByRole('img', { name: /Pikachu crying/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
