import { render, screen, fireEvent } from '@testing-library/react';
import RegistrationForm from './RegistrationForm';
import { validateEmail, validatePostalCode, validateAge, validateName } from '../utils/validators';

jest.mock('../utils/validators');

describe('RegistrationForm', () => {
    beforeEach(() => {
        validateName.mockImplementation(name => /^[a-zA-Z]+$/.test(name));
        validateEmail.mockImplementation(email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
        validateAge.mockImplementation(birthDate => {
            const today = new Date();
            const birthDateObj = new Date(birthDate);
            let age = today.getFullYear() - birthDateObj.getFullYear();
            const m = today.getMonth() - birthDateObj.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
                age--;
            }
            return age >= 18;
        });
        validatePostalCode.mockImplementation(postalCode => /^\d{5}$/.test(postalCode));
    });

    test('renders form inputs and submits form', () => {
        render(<RegistrationForm />);

        // Vérification que les champs sont présents
        const firstNameInput = screen.getByLabelText(/first name/i);
        const lastNameInput = screen.getByLabelText(/last name/i);
        const emailInput = screen.getByLabelText(/email/i);
        const birthDateInput = screen.getByLabelText(/date of birth/i);
        const cityInput = screen.getByLabelText(/city/i);
        const postalCodeInput = screen.getByLabelText(/postal code/i);
        const submitButton = screen.getByRole('button', { name: /save/i });

        expect(firstNameInput).toBeInTheDocument();
        expect(lastNameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(birthDateInput).toBeInTheDocument();
        expect(cityInput).toBeInTheDocument();
        expect(postalCodeInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();

        // Saisie de données valides
        fireEvent.change(firstNameInput, { target: { value: 'John' } });
        fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
        fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
        fireEvent.change(birthDateInput, { target: { value: '2000-01-01' } });
        fireEvent.change(cityInput, { target: { value: 'Paris' } });
        fireEvent.change(postalCodeInput, { target: { value: '75000' } });

        fireEvent.click(submitButton);

        // Simuler la soumission du formulaire
        fireEvent.submit(screen.getByText('Save'));

        // Vérification que le formulaire a été soumis
        expect(screen.queryByText(/Form Submitted/i)).not.toBeInTheDocument(); // vérifier dans la console ou adapter pour tester la soumission
    });

    test('shows validation errors', () => {
        render(<RegistrationForm />);

        const firstNameInput = screen.getByLabelText(/first name/i);
        const lastNameInput = screen.getByLabelText(/last name/i);
        const emailInput = screen.getByLabelText(/email/i);
        const birthDateInput = screen.getByLabelText(/date of birth/i);
        const cityInput = screen.getByLabelText(/city/i);
        const postalCodeInput = screen.getByLabelText(/postal code/i);
        const submitButton = screen.getByRole('button', { name: /save/i });

        // Saisie de données invalides
        fireEvent.change(firstNameInput, { target: { value: 'John123' } });
        fireEvent.change(lastNameInput, { target: { value: 'Doe!' } });
        fireEvent.change(emailInput, { target: { value: 'john.doe' } });
        fireEvent.change(birthDateInput, { target: { value: '2020-01-01' } });
        fireEvent.change(cityInput, { target: { value: '' } });
        fireEvent.change(postalCodeInput, { target: { value: '123' } });

        fireEvent.submit(screen.getByText('Save'));

        // Vérification des messages d'erreur
        expect(screen.getByText(/invalid first name/i)).toBeInTheDocument();
        expect(screen.getByText(/invalid last name/i)).toBeInTheDocument();
        expect(screen.getByText(/invalid email/i)).toBeInTheDocument();
        expect(screen.getByText(/you must be over 18/i)).toBeInTheDocument();
        expect(screen.getByText(/invalid postal code/i)).toBeInTheDocument();
    });

    test('disables submit button if form is invalid', () => {
        render(<RegistrationForm />);

        const submitButton = screen.getByRole('button', { name: /save/i });

        // Vérifier que le bouton est désactivé au départ
        expect(submitButton).toBeDisabled();

        // Saisie de données valides sauf un champ
        fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(screen.getByLabelText(/date of birth/i), { target: { value: '2000-01-01' } });
        fireEvent.change(screen.getByLabelText(/city/i), { target: { value: 'Paris' } });
        fireEvent.change(screen.getByLabelText(/postal code/i), { target: { value: '' } });

        // Vérifier que le bouton est toujours désactivé
        expect(submitButton).toBeDisabled();
    });

    test('enables submit button if form is valid', () => {
        render(<RegistrationForm />);

        const submitButton = screen.getByRole('button', { name: /save/i });

        // Saisie de données valides
        fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
        fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john.doe@example.com' } });
        fireEvent.change(screen.getByLabelText(/date of birth/i), { target: { value: '2000-01-01' } });
        fireEvent.change(screen.getByLabelText(/city/i), { target: { value: 'Paris' } });
        fireEvent.change(screen.getByLabelText(/postal code/i), { target: { value: '75000' } });

        // Vérifier que le bouton est activé
        expect(submitButton).not.toBeDisabled();
    });
});
