import { useState } from 'react';

const userForm = () => {
    // form fields
    const [ name, setName ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ phone, setPhone ] = useState('');
    const [ phoneType, setPhoneType ] = useState('');
    const [ staff, setStaff ] = useState('');
    const [ bio, setBio ] = useState('');
    const [ signUp, setSignUp ] = useState(true);

    // errors array holder
    const [ errorMessages, setErrorMessages ] = useState([]);

    const validate = () => {
        // test const option
        let errors = [];
        // nice regexp use, need to be tested
        let emailFormat = new RegExp('[a-z0-9]+\@[a-z]+\.[a-z]{2,3}');
        let phoneFormat = new RegExp('^\+[0-9]{11}$');

        // name validation
        if (name.length === 0) {
            errors.push('Name can not be blank ;(');
        }

        // email validation
        if (emailFormat.test(email) === false || email.length === 0) {
            errors.push('Email is not valid');
        }

        // phone and phone type validations
        if (phone.length > 0) {
            if (phoneFormat.test(phone) === false) {
                errors.push('Please provide valid phone number +(country code) 1233456789')
            }
            if (phoneType === '') {
                errors.push('Please select a phone type.');
            }
        }

        // bio validation
        if (bio.length > 280) {
            errors.push('Limit for bio is 280 characters');
        }
    }

}