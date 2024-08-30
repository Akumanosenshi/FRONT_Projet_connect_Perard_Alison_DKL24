import React, { useState, useEffect } from 'react';
import { validateEmail, validatePostalCode, validateAge, validateName } from '../utils/validators';
import './RegistrationForm.css';

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
    const [isFormValid, setIsFormValid] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');  // Nouvel état pour le message de succès

    useEffect(() => {
        // Met à jour l'état de validation du formulaire à chaque modification de formData ou errors
        setIsFormValid(Object.values(formData).every(value => value.trim() !== '') &&
            Object.keys(errors).every(key => !errors[key]));
    }, [formData, errors]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        // Valider le champ spécifique en fonction de son nom
        validateField(name, value);
    };

    const validateField = (name, value) => {
        let error = '';

        switch (name) {
            case 'firstName':
            case 'lastName':
                if (!validateName(value)) {
                    error = 'Invalid name';
                }
                break;
            case 'email':
                if (!validateEmail(value)) {
                    error = 'Invalid email';
                }
                break;
            case 'birthDate':
                if (!validateAge(value)) {
                    error = 'You must be over 18';
                }
                break;
            case 'postalCode':
                if (!validatePostalCode(value)) {
                    error = 'Invalid postal code';
                }
                break;
            default:
                break;
        }

        // Mettre à jour l'objet des erreurs
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Log du contenu du formulaire avant l'envoi
        console.log("Sending form data:", formData);

        if (isFormValid) {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });

                if (response.ok) {
                    // Log du succès de l'envoi
                    console.log('Form submission successful:', formData);

                    // Vider le formulaire après soumission réussie
                    setFormData({
                        firstName: '',
                        lastName: '',
                        email: '',
                        birthDate: '',
                        city: '',
                        postalCode: ''
                    });

                    // Afficher un message de succès
                    setSuccessMessage('Form submitted successfully!');
                    // Effacer le message de succès après 5 secondes
                    setTimeout(() => setSuccessMessage(''), 5000);
                } else {
                    // Log de l'échec de l'envoi avec la réponse du serveur
                    console.error('Form submission failed. Server responded with:', response.statusText);
                }
            } catch (err) {
                // Log de l'erreur si la requête échoue
                console.error('Form submission error:', err);
            }
        } else {
            console.log("Form is invalid and won't be submitted.");
        }
    };

    return (
        <form className="registration-form" onSubmit={handleSubmit}>
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
            <button onClick={handleSubmit} type="button" disabled={!isFormValid} >
                Save
            </button>
            {successMessage && <div className="success-message">{successMessage}</div>}
        </form>
    );
};

export default RegistrationForm;
