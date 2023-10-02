import React from "react";
import {Sidebar} from "../components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";

export const DashboardLayout = ()=>{

    const navigate = useNavigate();

    if(!localStorage.getItem('token')){
        navigate('/auth/login');
    }

    return(
        <div className="dashboardContainer">
            <Sidebar />
            <div className="dashboardContent">
                <Outlet />
            </div>
        </div>
    );
}