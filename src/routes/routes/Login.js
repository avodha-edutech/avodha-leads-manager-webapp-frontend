import React from "react";
import './css/Login.css';
import { Alert } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



const Login = () => {


    axios.defaults.withCredentials = true;


    const [loadingState, setLoadingState] = useState(false);

    const [emptyErr, setEmptyErr] = useState(false);
    const [randErr, setRandErr] = useState(false);
    const [incorrectErr, setIncorrectErr] = useState(false);

    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);


    const navigate = useNavigate();


    const loginFunction = () => {
        if((username)&&username != null && (password)&&password != null)
        {

            setLoadingState(true);
            setEmptyErr(false);
            setRandErr(false);
            setIncorrectErr(false);

            var toPostData = {
                username: (username)&&username,
                password: (password)&&password
            }

            axios.post('https://apileads.avodha.net/api/v1/login',(toPostData)).then((data) => {

                if(data.data.status === true)
                {
                    
                    localStorage.setItem('isLogin',true);
                    navigate('/dashboard');

                } else
                {
                    if(data.data.code === "ER001")
                    {
                        setLoadingState(false);
                        setEmptyErr(false);
                        setRandErr(true);
                        setIncorrectErr(false);
                    } else if(data.data.code === "ER002")
                    {
                        setLoadingState(false);
                        setEmptyErr(true);
                        setRandErr(false);
                        setIncorrectErr(false);
                    } else if(data.data.code === "ER004")
                    {
                        setLoadingState(false);
                        setEmptyErr(false);
                        setRandErr(false);
                        setIncorrectErr(true);
                    } else
                    {
                        setLoadingState(false);
                        setEmptyErr(false);
                        setRandErr(true);
                        setIncorrectErr(false);
                    }
                }

            }).catch((e) => {
                setLoadingState(false);
                setEmptyErr(false);
                setRandErr(true);
                setIncorrectErr(false);
            });

        }else
        {
            setLoadingState(false);
            setEmptyErr(true);
            setRandErr(false);
            setIncorrectErr(false);
        }
    };



    const loginButton = (
        <div className="d-flex justify-content-center align-items-center mt-3 p-4">
            <button className="main-button" onClick={loginFunction}>Login</button>
        </div>
    );

    const loadingSpinner = (<>
        <div className="d-flex justify-content-center align-items-center p-4 mt-3">
            <span className="loader"></span>
        </div>
    </>);


    //errors
    const emptyInputError = (
        <div className="d-flex justify-content-center align-items-center mt-4">
            <Alert severity="error" className="mt-3">Username or password cannot be empty</Alert>
        </div>
    );

    const randError = (
        <div className="d-flex justify-content-center align-items-center mt-4">
            <Alert severity="error" className="mt-3">Something went wrong</Alert>
        </div>
    );

    const incorrectError = (
        <div className="d-flex justify-content-center align-items-center mt-4">
            <Alert severity="error" className="mt-3">Incorrect Username or Password</Alert>
        </div>
    );
    //errors


    const mainData = (<>
        <div className="main-div p-4">
            <div className="sub-main-div p-4">
                <div className="data-div-login">
                    <h3 className="text-center mt-3">Login</h3>
                    <div className="d-flex justify-content-center align-items-center mt-2">
                        <label>
                            Username
                            <input className="main-input" type="text" onChange={(e) => {setUsername(e.target.value)}}></input>
                        </label>
                    </div>
                    <div className="d-flex justify-content-center align-items-center mt-3">
                        <label>
                            Password
                            <input className="main-input" type="password" onChange={(e) => {setPassword(e.target.value)}}></input>
                        </label>
                    </div>
                    {(emptyErr)&&emptyErr ? emptyInputError : null}
                    {(randErr)&&randErr ? randError : null}
                    {(incorrectErr)&&incorrectErr ? incorrectError : null}
                    {(loadingState)&&loadingState ? loadingSpinner : loginButton}
                </div>
            </div>
        </div>
    </>);

    return mainData;


}


export default Login;