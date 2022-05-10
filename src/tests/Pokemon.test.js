import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokemon from '../components/Pokemon';

const pokemons = {
  id: 65,
  name: 'Alakazam',
  type: 'Psychic',
  averageWeight: {
    value: '48.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.et/upload/8/88/Spr_5b_065_m.png',
  moreInfo: 'https://bulbapedia.ulbagarden.net/wiki/Alakazam_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Unova Accumua Town',
      map: 'https://cdn.bulbagarden.net/upload/4/44/Unova_Accumula_Town_Map.png',
    },
  ],
  summary: 'Cloing both its eyes heightens',
};

describe('Testes para o requisito 6', () => {
  test('TEsta se é renderizado um card com as informações de um pokemon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons } isFavorite />);
    const namePokemon = screen.getByTestId(/pokemon-name/i);
    expect(namePokemon).toHaveTextContent('Alakazam');
    const typePokemon = screen.getByTestId(/pokemon-type/i);
    expect(typePokemon).toHaveTextContent('Psychic');
    const weightPokemon = screen.getByTestId(/pokemon-weight/i);
    expect(weightPokemon).toHaveTextContent('Average weight: 48.0 kg');
    const img = screen.getByRole('img', { name: /Alakazam sprite/i });
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.et/upload/8/88/Spr_5b_065_m.png');
  });
  test('testa se o card possui link com More Details', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons } isFavorite />);
    const linkMoreDetails = screen.getByRole('link', { name: 'More details' });
    expect(linkMoreDetails).toBeInTheDocument();
    expect(linkMoreDetails).toHaveAttribute('href', `/pokemons/${pokemons.id}`);
  });
  test('TEste se ao clicar no link de more details a pag é renderizada', () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ pokemons } isFavorite />);
    const linkMoreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkMoreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemons.id}`);
  });
  test('verifica se tem um item de estrela no componenete', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons } isFavorite />);
    const icone = screen.getByRole('img', { name: /Alakazam is marked as favorite/i });
    expect(icone).toHaveAttribute('src', '/star-icon.svg');
  });
});
