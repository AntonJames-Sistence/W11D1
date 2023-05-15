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
    const [errorMessages, setErrorMessages] = useState({});

    const validate = () => {
        // test const option
        let errors = {};
        // nice regexp use, need to be tested
        let emailFormat = /^[a-z0-9]+\@[a-z]+\.[a-z]{2,3}$/;
        let phoneFormat = /^[0-9]{3}\-[0-9]{3}\-[0-9]{4}$/;

        // name validation
        if (name.length === 0) {
            errors.name = 'Name can not be blank🧙';
            setFail('name');
        }

        // email validation
        if (emailFormat.test(email) === false || email.length === 0) {
            errors.email = 'Email is not valid';
            setFail('email');
        }

        // phone and phone type validations
        if (phone.length > 0) {
            if (phoneFormat.test(phone) === false) {
                errors.phoneNum = 'Please provide valid phone number +(country code) 1233456789';
                setFail('phone-num');
            }
            if (phoneType === '') {
                errors.phoneType = 'Please select a phone type.';
                setFail('phone-type');
            }
        }

        // bio validation
        if (bio.length > 280) {
            errors.bio = 'Limit for bio is 280 characters';
            setFail('bio');
        }

        return errors;
    }

    const setFail = (classId) => {
        let name = document.getElementById(classId);
        name.className = 'fail';
    }

    const removeFail = () => {
        document.getElementById('name').classList.remove('fail');
        document.getElementById('email').classList.remove('fail');
        document.getElementById('phone-num').classList.remove('fail');
        document.getElementById('phone-type').classList.remove('fail');
        document.getElementById('bio').classList.remove('fail');
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

        removeFail('name');
        let errors = validate();
        

        if (!!errors) {
            setErrorMessages(errors);
            // debugger
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

    // const showErrors = () => {
    //     if (errorMessages.length === 0) {
    //         return null;
    //     }
    //     else {
    //         return (
    //             <ul>
    //                 {
    //                     errorMessages.map((error) => (
    //                         <li>{error}</li>
    //                     ))
    //                 }
    //             </ul>
    //         )
    //     }
    // }

    return (
        <>
            <form className="userForm" onSubmit={handleSubmit}>
                <label id='name'>Name:
                    <input type="text" placeholder="Name" value={name} onChange={handleChange('name')} />
                </label>
                {errorMessages.name && <li>{errorMessages.name}</li>}

                <br />

                <label id='email'>Email:
                    <input type="text" placeholder="Email" value={email} onChange={handleChange('email')} />
                </label>
                {errorMessages.email && <li>{errorMessages.email}</li>}

                <br />

                <label id='phone-num'>Phone Number:
                    <input type="text" placeholder="212-345-6677" value={phone} onChange={handleChange('phone')} />
                </label>
                {errorMessages.phoneNum && <li>{errorMessages.phoneNum}</li>}

                <br />

                <label id='phone-type'>Phone Type:
                    <select disabled={phone.length === 0} value={phoneType} onChange={handleChange('phoneType')}>
                        <option value="">-- Select --</option>
                        <option value="home">Home</option>
                        <option value="work">Work</option>
                        <option value="mobile">Mobile</option>
                    </select>
                </label>
                {errorMessages.phoneType && <li>{errorMessages.phoneType}</li>}

                <br />
                <div id='staff'>
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
                <label id='bio'>Bio:
                    <textarea placeholder="Limit 280 characters" value={bio} onChange={handleChange('bio')} />
                </label>
                {errorMessages.bio && <li>{errorMessages.bio}</li>}

                <br />
                <label id='sign'>Sign Up: 
                    <input
                    type="checkbox"
                    // value={signUp}
                    checked={signUp}
                    onChange={handleChange('signUp')} />
                </label>

                <br />

                <button>Submit</button>
            </form>
            {/* {showErrors()} */}
        </>
    )

}

export default UserForm;