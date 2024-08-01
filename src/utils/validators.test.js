import { validateEmail, validatePostalCode, validateAge, validateName } from './validators';

describe('Utils validators', () => {

    // Test pour validateEmail
    test('validateEmail should return true for valid emails', () => {
        expect(validateEmail('test@example.com')).toBe(true);
        expect(validateEmail('user.name+tag+sorting@example.com')).toBe(true);
        expect(validateEmail('user.name@example.co.uk')).toBe(true);
    });

    test('validateEmail should return false for invalid emails', () => {
        expect(validateEmail('plainaddress')).toBe(false);
        expect(validateEmail('@missingusername.com')).toBe(false);
        expect(validateEmail('username@.com')).toBe(false);
    });

    // Test pour validatePostalCode
    test('validatePostalCode should return true for valid postal codes', () => {
        expect(validatePostalCode('75000')).toBe(true);
        expect(validatePostalCode('12345')).toBe(true);
    });

    test('validatePostalCode should return false for invalid postal codes', () => {
        expect(validatePostalCode('1234')).toBe(false); // 4 digits
        expect(validatePostalCode('123456')).toBe(false); // 6 digits
        expect(validatePostalCode('ABCDE')).toBe(false); // Non-numeric
    });

    // Test pour validateAge
    test('validateAge should return true for ages 18 and above', () => {
        const today = new Date();
        const eighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate());
        const moreThanEighteenYearsAgo = new Date(today.getFullYear() - 19, today.getMonth(), today.getDate());

        expect(validateAge(eighteenYearsAgo)).toBe(true);
        expect(validateAge(moreThanEighteenYearsAgo)).toBe(true);
    });

    test('validateAge should return false for ages below 18', () => {
        const today = new Date();
        const seventeenYearsAgo = new Date(today.getFullYear() - 17, today.getMonth(), today.getDate());
        const lessThanEighteenYearsAgo = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate() + 1);

        expect(validateAge(seventeenYearsAgo)).toBe(false);
        expect(validateAge(lessThanEighteenYearsAgo)).toBe(false);
    });

    // Test pour validateName
    test('validateName should return true for valid names', () => {
        expect(validateName('John')).toBe(true);
        expect(validateName('Jean-Luc')).toBe(true);
        expect(validateName("O'Conner")).toBe(true);
        expect(validateName('Marie Curie')).toBe(true);
        expect(validateName('Élodie')).toBe(true);
    });

    test('validateName should return false for invalid names', () => {
        expect(validateName('John123')).toBe(false); // Contains numbers
        expect(validateName('!@#$%')).toBe(false); // Special characters
        expect(validateName('')).toBe(false); // Empty string
    });
});
