import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App component with all elements', () => {
  render(<App />);

  // Vérifier que le logo est rendu
  const logoElement = screen.getByAltText(/logo/i);
  expect(logoElement).toBeInTheDocument();

  // Vérifier que le lien est rendu
  const linkElement = screen.getByRole('link', { name: /Learn React/i });
  expect(linkElement).toBeInTheDocument();

  // Vérifier que le lien a les bons attributs
  expect(linkElement).toHaveAttribute('href', 'https://reactjs.org');
  expect(linkElement).toHaveAttribute('target', '_blank');
  expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
});
