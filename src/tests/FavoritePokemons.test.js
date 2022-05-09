import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import { Pokemon } from '../components';

const pokemon = {
  type: 'Psychic',
  id: 65,
  name: 'Alakazam',
  image: 'https://cdn2.bulbagarden.net/upload/8/88/Spr_5b_065_m.png',
  averageWeight:
{ measurementUnit: 'kg', value: '48.0' },
};

describe('Testes do requisito 3', () => {
  test('testa se aparece msg padrão caso não tenha poke.. favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
    const mockNotFound = jest.spyOn(FavoritePokemons, 'notFound');
    mockNotFound();
    const titleNotFound = screen.getByText(/No favorite pokemon/i);
    expect(titleNotFound).toBeInTheDocument();
  });
  test('Verifica se pokemon é renderizado na tela', () => {
    renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);
    const nomePokemon = screen.getByTestId('pokemon-name');
    expect(nomePokemon).toHaveTextContent('Alakazam');
  });
});
