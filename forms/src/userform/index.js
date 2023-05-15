import { useState } from 'react';
import "./userForm.css"

const UserForm = () => {
    // form fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [phoneType, setPhoneType] = useState('');
    const [staff, setStaff] = useState('');
    const [bio, setBio] = useState('');
    const [signUp, setSignUp] = useState(true);

    // errors array holder
    const [errorMessages, setErrorMessages] = useState([]);

    const validate = () => {
        // test const option
        let errors = [];
        // nice regexp use, need to be tested
        let emailFormat = /^[a-z0-9]+\@[a-z]+\.[a-z]{2,3}$/;
        let phoneFormat = /^\+[0-9]{11}$/;

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
        return errors;
    }

    const handleChange = field => {
        return (event) => {
            switch (field) {
                case "name":
                    setName(event.target.value);
                    break;
                case "email":
                    setEmail(event.target.value);
                    break;
                case "phone":
                    setPhone(event.target.value);
                    break;
                case "phoneType":
                    setPhoneType(event.target.value);
                    break;
                case "staff":
                    setStaff(event.target.value);
                    break;
                case "bio":
                    setBio(event.target.value);
                    break;
                case "signUp":
                    setSignUp( (prevState) => {
                        // debugger
                        return !prevState
                        // if (prevState === true) {
                        //     setSignUp(false);     
                        // } else {
                        //     setSignUp(true);
                        // }
                        
                    });
                    break;
                default:
                    break;
            }
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        let errors = validate();

        if (errors.length > 0) {
            setErrorMessages(errors);
        } else {
            let user = {
                name,
                email,
                phone,
                phoneType,
                staff,
                bio,
                signUp,
                submittedOn: new Date()
            }

            console.log(user);
            setName("");
            setPhone("");
            setEmail("");
            setPhoneType("");
            setStaff("");
            setBio("");
            setSignUp("");
            setErrorMessages([]);
            alert("Thank you. You have successfully signed up! 🙂");
        }
    }

    const showErrors = () => {
        if (errorMessages.length === 0) {
            return null;
        }
        else {
            return (
                <ul>
                    {
                        errorMessages.map((error, i) => (
                            <li key={i}>{error}</li>
                        ))
                    }
                </ul>
            )
        }
    }

    return (
        <>
            <form className="userForm" onSubmit={handleSubmit}>
                <label>Name:
                    <input type="text" placeholder="Name" value={name} onChange={handleChange('name')} />
                </label>

                <br />

                <label>Email:
                    <input type="text" placeholder="Email" value={email} onChange={handleChange('email')} />
                </label>

                <br />

                <label>Phone Number:
                    <input type="text" placeholder="Phone Num: +17180008888" value={phone} onChange={handleChange('phone')} />
                </label>

                <br />

                <label>Phone Type:
                    <select value={phoneType} onChange={handleChange('phoneType')}>
                        <option value="">-- Select --</option>
                        <option value="home">Home</option>
                        <option value="work">Work</option>
                        <option value="mobile">Mobile</option>
                    </select>
                </label>

                <br />
                <div>
                    <label>
                        <input
                            type="radio"
                            value="instructor"
                            checked={staff === "instructor"}
                            onChange={handleChange('staff')}
                        />
                        Instructor
                    </label>

                    <label>
                        <input
                            type="radio"
                            value="student"
                            checked={staff === "student"}
                            onChange={handleChange('staff')}
                        />
                        Student
                    </label>
                </div>

                <br />
                <label>Bio:
                    <textarea placeholder="Limit 280 characters" value={bio} onChange={handleChange('bio')} />
                </label>

                <br />
                <label>Sign Up: 
                    <input
                    type="checkbox"
                    value={signUp}
                    checked={signUp === true}
                    onChange={handleChange('signUp')} />
                </label>

                <br />

                <button>Submit</button>
            </form>
            {showErrors()}
        </>
    )

}

export default UserForm;