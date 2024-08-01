export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const validatePostalCode = (postalCode) => {
    const re = /^\d{5}$/;
    return re.test(postalCode);
};

export const validateAge = (birthDate) => {
    const today = new Date();
    const birthDateObj = new Date(birthDate);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const m = today.getMonth() - birthDateObj.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
        age--;
    }
    return age >= 18;
};

export const validateName = (name) => {
    const re = /^[a-zA-ZÀ-ÿ\s'-]+$/;
    return re.test(name);
};
