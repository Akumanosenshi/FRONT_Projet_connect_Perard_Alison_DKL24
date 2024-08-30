import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import RegistrationForm from './RegistrationForm';

// Mock the validators
jest.mock('../utils/validators', () => ({
    validateEmail: jest.fn((email) => email.includes('@')),
    validatePostalCode: jest.fn((code) => code.length === 5),
    validateAge: jest.fn((age) => new Date().getFullYear() - new Date(age).getFullYear() >= 18),
    validateName: jest.fn((name) => name.length > 1)
}));

describe('RegistrationForm', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should show error message for invalid email', () => {
        render(<RegistrationForm />);
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalid-email' } });
        fireEvent.click(screen.getByText(/Save/i));
        expect(screen.getByText(/Invalid email/i)).toBeInTheDocument();
    });

    it('should show error message for invalid postal code', () => {
        render(<RegistrationForm />);
        fireEvent.change(screen.getByLabelText(/Postal Code/i), { target: { value: '12' } });
        fireEvent.click(screen.getByText(/Save/i));
        expect(screen.getByText(/Invalid postal code/i)).toBeInTheDocument();
    });

    it('should show error message for invalid name', () => {
        render(<RegistrationForm />);
        fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'J' } });
        fireEvent.click(screen.getByText(/Save/i));
        expect(screen.getByText(/Invalid name/i)).toBeInTheDocument();
    });

    it('should show error message for underage user', () => {
        render(<RegistrationForm />);
        fireEvent.change(screen.getByLabelText(/Date of Birth/i), { target: { value: '2010-01-01' } });
        fireEvent.click(screen.getByText(/Save/i));
        expect(screen.getByText(/You must be over 18/i)).toBeInTheDocument();
    });

    it('should disable save button when form is invalid', () => {
        render(<RegistrationForm />);
        fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: '' } }); // Last name is empty
        expect(screen.getByText(/Save/i)).toBeDisabled();
    });

});
