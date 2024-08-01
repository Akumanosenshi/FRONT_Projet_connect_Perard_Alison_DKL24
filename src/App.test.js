import { render, screen } from '@testing-library/react';
import App from './App';

test('renders registration form', () => {
  render(<App />);
  const headerElement = screen.getByText(/Registration Form/i);
  expect(headerElement).toBeInTheDocument();
});
