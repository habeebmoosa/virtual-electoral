import  Axios  from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = ()=>{

    const navigate = useNavigate();

    if(window.location.pathname === '/auth/login' && localStorage.getItem('token')){
        navigate('/dashboard');
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailChange = (e)=>{
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e)=>{
        setPassword(e.target.value);
    }

    const login = async ()=>{
        try {
            const response = await Axios.post(process.env.REACT_APP_API_BASE_URL+'/auth/login', {
                email,
                password
            });
            alert("Login Successful");
            localStorage.setItem("token", response.data.token);
            navigate('/dashboard');
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div className="auth">
            <div className="auth-content">
                <div id="auth-title">
                    <h2>LOGIN</h2>
                </div>
                <div className="form">
                    
                <label htmlFor="user-email">&nbsp;Email</label>
                    <input id="user-email" className="form-content" type="email" name="email" autocomplete="on" required 
                        onChange={handleEmailChange} value={email}
                    />
                    <div className="form-border"></div>

                    <label htmlFor="user-password">&nbsp;Password</label>
                    <input id="user-password" className="form-content" type="password" name="password" required 
                        onChange={handlePasswordChange} value={password}
                    />
                    <div className="form-border"></div>

                    <button id="submit-btn" type="submit" name="submit" 
                        onClick={login}
                    >Login</button>
                    <Link to={"/auth/register"} id="signup">Don't have account yet?</Link>
                </div>
            </div>
        </div>
    );
}