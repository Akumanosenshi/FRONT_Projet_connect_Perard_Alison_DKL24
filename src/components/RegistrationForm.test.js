import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegistrationForm from './RegistrationForm';
import { validateEmail, validatePostalCode, validateAge, validateName } from '../utils/validators';

// Mock des fonctions de validation
jest.mock('../utils/validators', () => ({
    validateEmail: jest.fn(),
    validatePostalCode: jest.fn(),
    validateAge: jest.fn(),
    validateName: jest.fn(),
}));

describe('RegistrationForm Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('affiche le formulaire avec les champs et le bouton désactivé', () => {
        render(<RegistrationForm />);

        expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Date of Birth/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/City/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Postal Code/i)).toBeInTheDocument();
        expect(screen.getByText(/Save/i)).toBeDisabled();
    });

    test('active le bouton lorsque le formulaire est valide', () => {
        validateEmail.mockReturnValue(true);
        validatePostalCode.mockReturnValue(true);
        validateAge.mockReturnValue(true);
        validateName.mockReturnValue(true);

        render(<RegistrationForm />);

        fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(screen.getByLabelText(/Date of Birth/i), { target: { value: '1990-01-01' } });
        fireEvent.change(screen.getByLabelText(/City/i), { target: { value: 'Paris' } });
        fireEvent.change(screen.getByLabelText(/Postal Code/i), { target: { value: '75000' } });

        expect(screen.getByText(/Save/i)).toBeEnabled();
    });

    test('affiche des erreurs lorsque les champs sont invalides', () => {
        validateName.mockReturnValue(false);
        validateEmail.mockReturnValue(false);
        validatePostalCode.mockReturnValue(false);
        validateAge.mockReturnValue(false);

        render(<RegistrationForm />);

        fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'Invalid' } });
        fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Invalid' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalid email' } });
        fireEvent.change(screen.getByLabelText(/Date of Birth/i), { target: { value: '2010-01-01' } });
        fireEvent.change(screen.getByLabelText(/Postal Code/i), { target: { value: 'invalid' } });

        const nameErrors = screen.getAllByText('Invalid name');
        expect(nameErrors).toHaveLength(2); // Vérifie qu'il y a deux messages "Invalid name"
        expect(screen.getByText('Invalid email')).toBeInTheDocument();
        expect(screen.getByText('You must be over 18')).toBeInTheDocument();
        expect(screen.getByText('Invalid postal code')).toBeInTheDocument();
        expect(screen.getByText(/Save/i)).toBeDisabled();
    });

    test('affiche un message de succès après soumission réussie', async () => {
        validateName.mockReturnValue(true);
        validateEmail.mockReturnValue(true);
        validatePostalCode.mockReturnValue(true);
        validateAge.mockReturnValue(true);

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({}),
            })
        );

        render(<RegistrationForm />);

        fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(screen.getByLabelText(/Date of Birth/i), { target: { value: '1990-01-01' } });
        fireEvent.change(screen.getByLabelText(/City/i), { target: { value: 'Paris' } });
        fireEvent.change(screen.getByLabelText(/Postal Code/i), { target: { value: '75000' } });

        fireEvent.click(screen.getByText(/Save/i));

        await waitFor(() => {
            expect(screen.getByText('Form submitted successfully!')).toBeInTheDocument();
        });

        // Vérifier que le formulaire est réinitialisé
        expect(screen.getByLabelText(/First Name/i).value).toBe('');
    });

    test('affiche un message d\'erreur si la soumission échoue', async () => { // Ajout de async ici
        validateName.mockReturnValue(true);
        validateEmail.mockReturnValue(true);
        validatePostalCode.mockReturnValue(true);
        validateAge.mockReturnValue(true);

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
                statusText: 'Bad Request',
            })
        );

        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        render(<RegistrationForm />);

        fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(screen.getByLabelText(/Date of Birth/i), { target: { value: '1990-01-01' } });
        fireEvent.change(screen.getByLabelText(/City/i), { target: { value: 'Paris' } });
        fireEvent.change(screen.getByLabelText(/Postal Code/i), { target: { value: '75000' } });

        fireEvent.click(screen.getByText(/Save/i));

        await waitFor(() => {
            expect(consoleErrorSpy).toHaveBeenCalledWith(
                'Form submission failed. Server responded with:',
                'Bad Request'
            );
        });

        consoleErrorSpy.mockRestore();
    });


    test('affiche un message d\'erreur si la requête échoue', async () => {
        validateName.mockReturnValue(true);
        validateEmail.mockReturnValue(true);
        validatePostalCode.mockReturnValue(true);
        validateAge.mockReturnValue(true);

        global.fetch = jest.fn(() => Promise.reject(new Error('Network Error')));

        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        render(<RegistrationForm />);

        fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(screen.getByLabelText(/Date of Birth/i), { target: { value: '1990-01-01' } });
        fireEvent.change(screen.getByLabelText(/City/i), { target: { value: 'Paris' } });
        fireEvent.change(screen.getByLabelText(/Postal Code/i), { target: { value: '75000' } });

        fireEvent.click(screen.getByText(/Save/i));

        await waitFor(() => {
            expect(consoleErrorSpy).toHaveBeenCalledWith('Form submission error:', expect.any(Error));
        });

        consoleErrorSpy.mockRestore();
    });


    test('désactive le bouton de soumission si le formulaire est invalide', () => {
        validateName.mockReturnValue(true);
        validateEmail.mockReturnValue(false); // Email invalide
        validatePostalCode.mockReturnValue(true);
        validateAge.mockReturnValue(true);

        render(<RegistrationForm />);

        fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalid email' } }); // Email invalide
        fireEvent.change(screen.getByLabelText(/Date of Birth/i), { target: { value: '1990-01-01' } });
        fireEvent.change(screen.getByLabelText(/City/i), { target: { value: 'Paris' } });
        fireEvent.change(screen.getByLabelText(/Postal Code/i), { target: { value: '75000' } });

        expect(screen.getByText(/Save/i)).toBeDisabled();
    });

    test('réinitialise le formulaire et affiche un message de succès après soumission réussie', async () => {
        jest.useFakeTimers();
        validateName.mockReturnValue(true);
        validateEmail.mockReturnValue(true);
        validatePostalCode.mockReturnValue(true);
        validateAge.mockReturnValue(true);

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({}),
            })
        );

        render(<RegistrationForm />);

        fireEvent.change(screen.getByLabelText(/First Name/i), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText(/Last Name/i), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(screen.getByLabelText(/Date of Birth/i), { target: { value: '1990-01-01' } });
        fireEvent.change(screen.getByLabelText(/City/i), { target: { value: 'Paris' } });
        fireEvent.change(screen.getByLabelText(/Postal Code/i), { target: { value: '75000' } });

        fireEvent.click(screen.getByText(/Save/i));

        await waitFor(async () => {
            // Vérification que le formulaire est réinitialisé
            expect(screen.getByLabelText(/First Name/i).value).toBe('');
            expect(screen.getByLabelText(/Last Name/i).value).toBe('');
            expect(screen.getByLabelText(/Email/i).value).toBe('');
            expect(screen.getByLabelText(/Date of Birth/i).value).toBe('');
            expect(screen.getByLabelText(/City/i).value).toBe('');
            expect(screen.getByLabelText(/Postal Code/i).value).toBe('');

            // Vérification du message de succès
            expect(screen.getByText('Form submitted successfully!')).toBeInTheDocument();
        });

            jest.advanceTimersByTime(5000);

            await waitFor(() => {
                expect(screen.queryByText('Form submitted successfully!')).not.toBeInTheDocument();
            });

            jest.useRealTimers();
        });

});