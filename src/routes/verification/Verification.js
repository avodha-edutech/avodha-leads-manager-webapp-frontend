import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useState } from "react";


const Verification = () => {
    
    const [loginState, setLoginState] = useState(localStorage.getItem('isLogin'));


    return (loginState)&&loginState === "true" ? <Outlet /> : <Navigate to='/logavodhaleadsin' />;

};


export default Verification;