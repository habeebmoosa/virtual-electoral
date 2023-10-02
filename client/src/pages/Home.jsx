import React from "react";

export const Home = ()=>{

    if(localStorage.getItem("token")){
        window.location.href = "/dashboard";
    }

    return(
        <h1>Hello World</h1>
    );
}