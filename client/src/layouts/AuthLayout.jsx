import React from "react";
import { Outlet } from "react-router-dom";
import '../css/Auth.css';

export const AuthLayout = ()=>{
    return(
        <div className="authContainer">
            <div className="sideText">
                <h1>WELCOME TO</h1>
                <h1>THE</h1>
                <h1>E-Voting</h1>
                <h1>APP</h1>
            </div>
            <div className="authContent">
                <Outlet />
            </div>
        </div>
    )
}