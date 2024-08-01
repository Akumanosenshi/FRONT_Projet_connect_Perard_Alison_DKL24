import { validateEmail, validatePostalCode, validateAge, validateName } from './validators';

test('validates email correctly', () => {
    expect(validateEmail('test@example.com')).toBe(true);
    expect(validateEmail('invalid-email')).toBe(false);
});

test('validates postal code correctly', () => {
    expect(validatePostalCode('75001')).toBe(true);
    expect(validatePostalCode('abcde')).toBe(false);
});

test('validates age correctly', () => {
    const today = new Date();
    const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
    const seventeenYearsAgo = new Date(today.getFullYear() - 17, today.getMonth(), today.getDate());
    expect(validateAge(eighteenYearsAgo.toISOString().split('T')[0])).toBe(true);
    expect(validateAge(seventeenYearsAgo.toISOString().split('T')[0])).toBe(false);
});

test('validates name correctly', () => {
    expect(validateName('Jean-Pierre')).toBe(true);
    expect(validateName('Jean-Pierre123')).toBe(false);
});
