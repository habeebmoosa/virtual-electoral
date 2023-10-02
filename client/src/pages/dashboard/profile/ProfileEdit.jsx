import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import '../../../css/Dashboard.css';

export const ProfileEdit = () => {
    const navigate = useNavigate();

    const location = useLocation();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phoneno, setPhoneno] = useState("");
    const [password, setPassword] = useState("");
    const [newpassword, setNewpassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");

    useEffect(() => {
        if (location.state && location.state.user) {
            const user = location.state.user;
            setName(user.name || "");
            setEmail(user.email || "");
            setPhoneno(user.phoneno || "");
        }
    }, [location.state]);

    const Save = () => {
        if (password.length !== 0) {
            if (password === newpassword) {
                alert("New password and current password cannot be same");
            } else if (newpassword !== confirmpassword) {
                alert("New password and confirm password should be same");
            } else {
                alert("Password changed");
            }
        }


        if (!localStorage.getItem("token")) {
            navigate("/auth/login");
        } else {
            Axios.put("http://localhost:3010/api/user/update", {
                name,
                email,
                phoneno,
            }, {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            }).then(() => {
                alert("Profile Updated");
            }).catch((error) => {
                console.log(error);
            }
            );
            navigate("/dashboard/profile");
        }
        

    }

    return (
        <div className="profileContainer">
            <div className="profile">
                <div className="profileHeading">
                    <h1>Edit Profile</h1>
                </div>
                <div className="profileBodyEdit">
                    <div className="col">
                        <div className="profileBodyItem">
                            <h3>Name</h3>
                            <input type="text" onChange={(e) => {
                                setName(e.target.value);
                            }} value={name} className="inputBox" />
                        </div>
                        <div className="border-line"></div>
                        <div className="profileBodyItem">
                            <h3>Email</h3>
                            <input type="email" value="email"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }} value={email} className="inputBox" />
                        </div>
                        <div className="border-line"></div>
                        <div className="profileBodyItem">
                            <h3>Phone Number</h3>
                            <input type="number" value="number" className="inputBox"
                                onChange={(e) => {
                                    setPhoneno(e.target.value);
                                }} value={phoneno} />
                        </div>
                    </div>
                    <div className="col">
                        <div className="profileBodyItem">
                            <h3>Current Password</h3>
                            <input type="password" className="inputBox"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }} />
                        </div>
                        <div className="border-line"></div>
                        <div className="profileBodyItem">
                            <h3>New Password</h3>
                            <input type="password" className="inputBox"
                                onChange={(e) => {
                                    setNewpassword(e.target.value);
                                }} />
                        </div>
                        <div className="border-line"></div>
                        <div className="profileBodyItem">
                            <h3>Confirm Password</h3>
                            <input type="password" className="inputBox"
                                onChange={(e) => {
                                    setConfirmpassword(e.target.value);
                                }} />
                        </div>
                    </div>
                </div>
                <div className="editBtn">
                    <button className="btn" onClick={Save}>Save</button>
                </div>
            </div>
        </div>
    )
}