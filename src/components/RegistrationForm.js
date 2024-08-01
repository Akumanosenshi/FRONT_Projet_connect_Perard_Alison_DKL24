import React, { useState } from 'react';
import { validateEmail, validatePostalCode, validateAge, validateName } from '../utils/validators';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
        city: '',
        postalCode: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form Submitted', formData);
            setIsSubmitted(true);
        }
    };

    const validateForm = () => {
        let formErrors = {};
        let isValid = true;

        if (!validateName(formData.firstName)) {
            isValid = false;
            formErrors.firstName = 'Invalid first name';
        }
        if (!validateName(formData.lastName)) {
            isValid = false;
            formErrors.lastName = 'Invalid last name';
        }
        if (!validateEmail(formData.email)) {
            isValid = false;
            formErrors.email = 'Invalid email';
        }
        if (!validateAge(formData.birthDate)) {
            isValid = false;
            formErrors.birthDate = 'You must be over 18';
        }
        if (!validatePostalCode(formData.postalCode)) {
            isValid = false;
            formErrors.postalCode = 'Invalid postal code';
        }

        setErrors(formErrors);
        return isValid;
    };

    const isFormValid = () => {
        return Object.values(formData).every(value => value !== '') && Object.keys(errors).length === 0;
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                {errors.firstName && <span>{errors.firstName}</span>}
            </div>
            <div>
                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                {errors.lastName && <span>{errors.lastName}</span>}
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" name="email" value={formData.email} onChange={handleChange} />
                {errors.email && <span>{errors.email}</span>}
            </div>
            <div>
                <label htmlFor="birthDate">Date of Birth</label>
                <input id="birthDate" type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
                {errors.birthDate && <span>{errors.birthDate}</span>}
            </div>
            <div>
                <label htmlFor="city">City</label>
                <input id="city" type="text" name="city" value={formData.city} onChange={handleChange} />
                {errors.city && <span>{errors.city}</span>}
            </div>
            <div>
                <label htmlFor="postalCode">Postal Code</label>
                <input id="postalCode" type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} />
                {errors.postalCode && <span>{errors.postalCode}</span>}
            </div>
            <button type="submit" disabled={!isFormValid()}>
                Save
            </button>
        </form>
    );
};

export default RegistrationForm;
