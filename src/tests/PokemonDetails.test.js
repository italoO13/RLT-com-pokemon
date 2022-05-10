import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import App from '../App';

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

const match = {
  params: { id: '65' },
};

describe('Testes para o requisito 7', () => {
  test('Informações detalhadas do pokemon são mostradas na tela', () => {
    renderWithRouter(<PokemonDetails
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
      match={ match }
      onUpdateFavoritePokemons={ () => {} }
    />);
    const titleDetails = screen
      .getByRole('heading', { name: 'Alakazam Details' }, { level: 2 });
    expect(titleDetails).toBeInTheDocument();

    const linkMoreDetails = screen.queryByRole('link', { name: 'More details' });
    expect(linkMoreDetails).toBe(null);

    const summary = screen
      .getByRole('heading', { name: 'Summary' }, { level: 2 });
    expect(summary).toBeInTheDocument();

    const detailsPokemon = screen
      .getByText(/Cloing both its eyes heightens/i);
    expect(detailsPokemon).toBeInTheDocument();
  });

  test('exibir na pagina conteudo de localização', () => {
    renderWithRouter(<PokemonDetails
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
      match={ match }
      onUpdateFavoritePokemons={ () => {} }

    />);
    const infoMap = screen
      .getByRole('heading', { name: /Game Locations of Alakazam/i }, { level: 2 });
    expect(infoMap).toBeInTheDocument();

    const locationDescrip = screen.getByText('Unova Accumua Town');
    expect(locationDescrip);

    const imgLocal = screen.getByRole('img', { name: 'Alakazam location' });
    expect(imgLocal).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/4/44/Unova_Accumula_Town_Map.png');
  });
  test('teste se é possivel favoritar um pokemon atravez de detais', () => {
    renderWithRouter(<App />);
    localStorage.clear();
    const linkMoreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkMoreDetails);
    const checkbox = screen.getByLabelText('Pokémon favoritado?');
    expect(checkbox).toBeInTheDocument();
    let img = screen.queryByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(img).toBe(null);
    userEvent.click(checkbox);
    img = screen.queryByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(img).toBeInTheDocument();
  });
});
