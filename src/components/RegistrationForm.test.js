import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RegistrationForm from './RegistrationForm';

test('renders registration form', () => {
    render(<RegistrationForm />);
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Date of Birth/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/City/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Postal Code/i)).toBeInTheDocument();
});

test('disables save button if form is incomplete', () => {
    render(<RegistrationForm />);
    expect(screen.getByText(/Save/i)).toBeDisabled();
});

test('shows error messages for invalid inputs', async () => {
    render(<RegistrationForm />);

    // Change the email input to an invalid email
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalid-email' } });
    fireEvent.blur(screen.getByLabelText(/Email/i));

    // Trigger form submission
    fireEvent.submit(screen.getByText(/Save/i));

    // Check if the error message is displayed
    const errorMessage = await screen.findByText(/Invalid-email/i);
    expect(errorMessage).toBeInTheDocument();
});