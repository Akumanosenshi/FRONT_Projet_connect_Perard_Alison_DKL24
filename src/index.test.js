import React from 'react';
import { render } from '@testing-library/react';
import reportWebVitals from './reportWebVitals';

// Mocking reportWebVitals
jest.mock('./reportWebVitals', () => jest.fn());

test('renders without crashing and calls reportWebVitals', () => {
    // Créez un élément div avec l'ID root avant d'importer index.js
    const root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);

    // Importer index.js après avoir créé l'élément root
    require('./index');

    // Vérifiez si reportWebVitals a été appelé
    expect(reportWebVitals).toHaveBeenCalled();
});
