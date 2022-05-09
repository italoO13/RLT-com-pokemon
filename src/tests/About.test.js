import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testes para o requisito 2', () => {
  test('testa se contem info sobre pokedex', () => {
    renderWithRouter(<About />);
    const titleAbout = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(titleAbout).toBeInTheDocument();
  });
  test('Teste se contem dois paragrafos no About', () => {
    renderWithRouter(<About />);
    const paragrafo1 = screen.getByText(/This application simulates a Pokédex/i);
    expect(paragrafo1).toBeInTheDocument();
    const paragrafo2 = screen.getByText(/One can filter Pokémons by/i);
    expect(paragrafo2).toBeInTheDocument();
  });
  test('Testa se imagem com src especifico renderizou na tela', () => {
    renderWithRouter(<About />);
    const img = screen.getByRole('img', { name: 'Pokédex' });
    expect(img)
      .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
