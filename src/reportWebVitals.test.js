import reportWebVitals from './ReportWebVitals';

describe('reportWebVitals', () => {
    beforeEach(() => {
        jest.resetModules(); // Pour réinitialiser les modules importés entre les tests
    });

    jest.mock('web-vitals', () => ({
        getCLS: jest.fn(),
        getFID: jest.fn(),
        getFCP: jest.fn(),
        getLCP: jest.fn(),
        getTTFB: jest.fn(),
    }));


    test('ne fait rien si onPerfEntry n\'est pas une fonction', async () => {
        const mockOnPerfEntry = null;

        await reportWebVitals(mockOnPerfEntry);

        const { getCLS, getFID, getFCP, getLCP, getTTFB } = require('web-vitals');
        expect(getCLS).not.toHaveBeenCalled();
        expect(getFID).not.toHaveBeenCalled();
        expect(getFCP).not.toHaveBeenCalled();
        expect(getLCP).not.toHaveBeenCalled();
        expect(getTTFB).not.toHaveBeenCalled();
    });

    test('ne fait rien si onPerfEntry n\'est pas une fonction', async () => {
        const mockOnPerfEntry = null;

        const importSpy = jest.spyOn(import('web-vitals'), 'then');

        reportWebVitals(mockOnPerfEntry);

        // Vérifier que rien n'a été importé
        expect(importSpy).not.toHaveBeenCalled();
    });
});
