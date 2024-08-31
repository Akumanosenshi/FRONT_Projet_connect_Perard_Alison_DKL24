import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserTable from './UserTable';

describe('UserTable Component', () => {
    beforeEach(() => {
        // Mock pour l'API fetch
        global.fetch = jest.fn(() =>
            Promise.resolve({
                json: () => Promise.resolve([
                    {
                        id: 1,
                        firstName: 'John',
                        lastName: 'Doe',
                        email: 'john.doe@example.com',
                        birthDate: '1990-01-01',
                        city: 'Paris',
                        postalCode: '75000',
                    },
                    {
                        id: 2,
                        firstName: 'Jane',
                        lastName: 'Smith',
                        email: 'jane.smith@example.com',
                        birthDate: '1985-05-05',
                        city: 'Lyon',
                        postalCode: '69000',
                    },
                ]),
            })
        );
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('affiche les utilisateurs correctement après la récupération des données', async () => {
        render(<UserTable />);

        // Vérifier les éléments de chargement initial
        expect(screen.getByText('Liste des utilisateurs inscrits')).toBeInTheDocument();

        // Attendre que les utilisateurs soient affichés
        await waitFor(() => {
            expect(screen.getByText('John')).toBeInTheDocument();
            expect(screen.getByText('Doe')).toBeInTheDocument();
            expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
            expect(screen.getByText('1990-01-01')).toBeInTheDocument();
            expect(screen.getByText('Paris')).toBeInTheDocument();
            expect(screen.getByText('75000')).toBeInTheDocument();

            expect(screen.getByText('Jane')).toBeInTheDocument();
            expect(screen.getByText('Smith')).toBeInTheDocument();
            expect(screen.getByText('jane.smith@example.com')).toBeInTheDocument();
            expect(screen.getByText('1985-05-05')).toBeInTheDocument();
            expect(screen.getByText('Lyon')).toBeInTheDocument();
            expect(screen.getByText('69000')).toBeInTheDocument();
        });
    });

    test('affiche un message quand il n\'y a aucun utilisateur', async () => {
        // Mock d'une réponse vide
        global.fetch.mockImplementationOnce(() =>
            Promise.resolve({
                json: () => Promise.resolve([]),
            })
        );

        render(<UserTable />);

        await waitFor(() => {
            expect(screen.getByText('Aucun utilisateur inscrit pour le moment.')).toBeInTheDocument();
        });
    });

    test('affiche un message d\'erreur en cas de problème avec la récupération des données', async () => {
        // Mock d'une erreur de fetch
        global.fetch.mockImplementationOnce(() =>
            Promise.reject(new Error('API error'))
        );

        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        render(<UserTable />);

        await waitFor(() => {
            expect(consoleErrorSpy).toHaveBeenCalledWith('Erreur lors de la récupération des utilisateurs :', expect.any(Error));
        });

        consoleErrorSpy.mockRestore();
    });
});
