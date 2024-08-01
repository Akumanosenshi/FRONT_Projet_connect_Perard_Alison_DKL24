import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App component with all elements including RegistrationForm', () => {
  render(<App />);

  // Vérifier que RegistrationForm est rendu
  const registrationFormElement = screen.getByText(/First Name/i);
  expect(registrationFormElement).toBeInTheDocument();
});
