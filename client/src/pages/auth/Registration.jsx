import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from 'axios';

export const Registration = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneno, setPhoneno] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleNameChange = (e) => {
        setName(e.target.value);
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    const handlePhonenoChange = (e) => {
        setPhoneno(e.target.value);
    }
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    }

    const register = async ()=>{
        try {
            if(password !== confirmPassword){
                alert("Password and Confirm Password do not match");
                return;
            }
    
           await Axios.post(process.env.REACT_APP_API_BASE_URL+'/auth/registration', {
            name,
            email,
            phoneno,
            password
           });
    
           alert("Registration Successful");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="auth">
            <div className="auth-content">
                <div id="auth-title">
                    <h2>Registration</h2>
                </div>
                <div className="form">

                    <label htmlFor="user-name">&nbsp;Full Name</label>
                    <input id="user-name" className="form-content" type="text" name="name" required 
                        onChange={handleNameChange} value={name}
                    />
                    <div className="form-border"></div>
                    
                    <label htmlFor="user-email">&nbsp;Email</label>
                    <input id="user-email" className="form-content" type="email" name="email" autocomplete="on" required 
                        onChange={handleEmailChange} value={email}
                    />
                    <div className="form-border"></div>

                    <label htmlFor="user-phoneno">&nbsp;Phone No.</label>
                    <input id="user-phoneno" className="form-content" type="number" name="phoneno" required 
                        onChange={handlePhonenoChange} value={phoneno}
                    />
                    <div className="form-border"></div>


                    <label htmlFor="user-password">&nbsp;Password</label>
                    <input id="user-password" className="form-content" type="password" name="password" required 
                        onChange={handlePasswordChange} value={password}
                    />
                    <div className="form-border"></div>

                    <label htmlFor="user-password-con">&nbsp;Confirm Password</label>
                    <input id="user-password-con" className="form-content" type="password" name="confirmPassword" required 
                        onChange={handleConfirmPasswordChange} value={confirmPassword}
                    />
                    <div className="form-border"></div>

                    <button id="submit-btn" type="submit" name="submit" 
                        onClick={register}
                    >CREATE</button>
                    <Link to={"/auth/login"} id="signup">Already have an account?</Link>
                </div>
            </div>
        </div>
    );
}