import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';

const pokemons = [{
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
},
{
  id: 64,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '48.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/8/88/Spr_5b_065_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Alakazam_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Unova Accumula Town',
      map: 'https://cdn2.bulbagarden.net/upload/4/44/Unova_Accumula_Town_Map.png',
    },
  ],
  summary: 'Closing both its eyes heightens',
},
{
  id: 68,
  name: 'Mew',
  type: 'Psychic',
  averageWeight: {
    value: '48.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/8/88/Spr_5b_065_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Alakazam_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Unova Accumula Town',
      map: 'https://cdn2.bulbagarden.net/upload/4/44/Unova_Accumula_Town_Map.png',
    },
  ],
  summary: 'Closing both its eyes heightens',
},
];

const isPokemonFavoriteById = {
  64: false,
  65: true,
};

describe('Requisito 5', () => {
  test('Verifica se cotem texto h2 com Encoureted...', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const title = screen.getByRole('heading', { name: /Encountered pokémons/i });
    expect(title).toBeInTheDocument();
  });
  test('Verifica a funcionalidade do botao nest pokemon', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const buttonNext = screen.getByRole('button', { name: /próximo/i });
    expect(buttonNext).toBeInTheDocument();
  });
  test('verifica se o proximo pokemon da lista é mostrado', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const buttonNext = screen.getByRole('button', { name: /próximo/i });
    userEvent.click(buttonNext);
    const namePokemon = screen.getByText('Pikachu');
    expect(namePokemon).toHaveTextContent('Pikachu');
  });
  test('O primeiro pokemon deve aparecer caso o bt for clicado no ultimo pokemon', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const buttonNext = screen.getByRole('button', { name: /próximo/i });
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    userEvent.click(buttonNext);
    const namePokemon = screen.getByTestId(/pokemon-name/i);
    expect(namePokemon).toHaveTextContent('Alakazam');
  });
  test('Verifica se apenas um pokemon é renderizado por vez', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const namePokemon = screen.getAllByTestId(/pokemon-name/i);
    expect(namePokemon.length).toBe(1);
  });
  test('Verifica se todos os tipos são renderizados na tela', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const types = screen.getAllByTestId('pokemon-type-button');
    expect(types.length).toBe(2);
    expect(types[0]).toHaveTextContent('Psychic');
    expect(types[1]).toHaveTextContent('Electric');
  });
  test('Apos clicar em um botao, deve circular apenas pokemons daquele tipo', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    const buttonNext = screen.getByRole('button', { name: /próximo/i });
    const buttonAll = screen.getByRole('button', { name: /all/i });
    const types = screen.getAllByTestId('pokemon-type-button');
    expect(buttonAll).toBeInTheDocument();
    expect(types[0]).toHaveTextContent('Psychic');
    userEvent.click(types[0]);
    expect(buttonAll).toBeInTheDocument();
    let namePokemon = screen.getAllByTestId(/pokemon-name/i);
    expect(namePokemon[0]).toHaveTextContent('Alakazam');
    userEvent.click(buttonNext);
    namePokemon = screen.getAllByTestId('pokemon-name');
    expect(namePokemon[0]).toHaveTextContent('Mew');
    expect(buttonAll).toBeInTheDocument();
  });
  test('Verifica se ao carregar o botao é all', () => {
    const verificaPokemons = () => {
      pokemons.forEach(({ name }) => {
        const buttonNext = screen.getByRole('button', { name: /próximo/i });
        const namePokemon = screen.getAllByTestId('pokemon-name');
        expect(namePokemon[0]).toHaveTextContent(name);
        userEvent.click(buttonNext);
      });
    };

    renderWithRouter(<Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);
    verificaPokemons();
    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toHaveTextContent('All');
    userEvent.click(buttonAll);
    verificaPokemons();
  });
});
