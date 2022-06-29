import renderWithRouterAndRedux from '../helpers/renderWithRouterAndRedux';
import App from '../../App';
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Testes Login', () => {
  it('Verifica se o input de Nome esta na tela', () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByLabelText(/name:/i);
    expect(inputName).toBeInTheDocument();
  })

  it('Verifica se o input de Email esta na tela', () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByLabelText(/email:/i);
    expect(inputEmail).toBeInTheDocument();
  })

  it('Verifica se o botao de Play esta na tela', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const playButton = screen.getByRole('button', { name: /play/i });
    const inputEmail = screen.getByLabelText(/email:/i);
    const inputName = screen.getByLabelText(/name:/i);

    expect(playButton).toBeInTheDocument();
    expect(playButton).toBeDisabled();

    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputName, 'teste');

    expect(playButton).not.toBeDisabled();

    userEvent.click(playButton);

    expect(history.location.pathname).toBe('/game');
  })

  it('Verifica se o botao de Settings esta na tela', () => {
    renderWithRouterAndRedux(<App />);

    const settingsButton = screen.getByRole('button', { name: /settings/i });
    expect(settingsButton).toBeInTheDocument();
  })
})