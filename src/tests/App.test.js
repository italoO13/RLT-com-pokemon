import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe("Verifica os testes do requisito 1", () => {
  test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação.', () => {
    renderWithRouter(<App />)
    const linkHome  = screen.getByRole('link', {name:"Home"})
    expect(linkHome).toBeInTheDocument();

    const linkAbout  = screen.getByRole('link', {name:"About"})
    expect(linkAbout).toBeInTheDocument();

    const LinkFavorite  = screen.getByRole('link', {name:/favorite pokémons/i})
    expect(LinkFavorite).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home da barra de navegação.', () => {
    const {history} = renderWithRouter(<App />)
    const linkHome  = screen.getByRole('link', {name:"Home"})
    userEvent.click(linkHome);
    const {pathname} = history.location;
    expect(pathname).toBe("/");
  });

  test('Teste se a aplicação é redirecionada para a página de About, na URL /about, ao clicar no link About da barra de navegação.', () => {
    const {history} = renderWithRouter(<App />)
    const linkAbout  = screen.getByRole('link', {name:"About"})
    userEvent.click(linkAbout);
    const {pathname} = history.location;
    expect(pathname).toBe("/about");
  });

  test('Teste se a aplicação é redirecionada para a página de Pokémons Favoritados, na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.', () => {
    const {history} = renderWithRouter(<App />)
    const LinkFavorite  = screen.getByRole('link', {name:/favorite pokémons/i})
    userEvent.click(LinkFavorite);
    const {pathname} = history.location;
    expect(pathname).toBe("/favorites");
  });

  test('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    const {history} = renderWithRouter(<App />)
    history.push("/NotFound")
    const notFound = screen.getByRole("heading", {name:/Page requested not found/i})
  });
})
