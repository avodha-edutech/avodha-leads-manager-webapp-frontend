import React from "react";
import Dashboard from "./components/Dashboard";
import './css/Dashboard.css';
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";


const UpdateCSRToken = () => {

    axios.defaults.withCredentials = true;


    const [mainState, setMainState] = useState(true);

    const [token, setToken] = useState('');


    const [buttonState, setButtonState] = useState(false);
    const [emptyErr, setEmptyErr] = useState(false);
    const [randErr, setRandErr] = useState(false);
    const [successMsg, setSuccessMsg] = useState(false);


    const [newTokenValue, setNewTokenValue] = useState(null);


    const navigate = useNavigate();


    useEffect(() => {

    axios.get('https://apileads.avodha.net/api/v1/getcsrtoken').then((data) => {

        if(data.data.status === true)
        {

            setToken(data.data.token);
            setMainState(false);

        } else
        {
            localStorage.removeItem('isLogin');
            navigate('/logavodhaleadsin');
        }

    }).catch((e) => {
        console.error(e);
    });

    },[(token)&&token]);



    const handleUpdate = () => {

        if((newTokenValue)&&newTokenValue != null)
        {

            setButtonState(true);
            setEmptyErr(false);
            setRandErr(false);
            setSuccessMsg(false);

            var toPutData = {
                token: (newTokenValue)&&newTokenValue
            };

            axios.put('https://apileads.avodha.net/api/v1/updatecsrtoken',(toPutData)).then((data) => {

                if(data.data.status === true)
                {

                    setButtonState(false);
                    setEmptyErr(false);
                    setRandErr(false);
                    setToken(data.data.newToken);
                    setSuccessMsg(true);

                } else
                {
                    if(data.data.code === "ER001")
                    {
                        setButtonState(false);
                        setEmptyErr(false);
                        setRandErr(true);
                        setSuccessMsg(false);
                    } else if(data.data.code === "ER002")
                    {
                        setButtonState(false);
                        setEmptyErr(true);
                        setRandErr(false);
                        setSuccessMsg(false);
                    } else
                    {
                        localStorage.removeItem('isLogin');
                        navigate('/logavodhaleadsin');
                    }
                }

            }).catch((e) => {
                setButtonState(false);
                setEmptyErr(false);
                setRandErr(true);
                setSuccessMsg(false);
            });

        } else
        {
            setButtonState(false);
            setEmptyErr(true);
            setRandErr(false);
            setSuccessMsg(false);
        }

    };



    //errors

    const emptyError = (
        <div className="d-flex justify-content-center align-items-center mt-4">
            <Alert severity="error" className="mt-3">Token value cannot be empty</Alert>
        </div>
    );

    const randError = (
        <div className="d-flex justify-content-center align-items-center mt-4">
            <Alert severity="error" className="mt-3">Something went wrong</Alert>
        </div>
    );

    const successMessage = (
        <div className="d-flex justify-content-center align-items-center mt-4">
            <Alert severity="success" className="mt-3">CSR Token successfully updated</Alert>
        </div>
    );

    //errors



    const buttonData = (<>
        <div className="d-flex justify-content-center align-items-center mt-3 p-4">
            <button className="main-button" onClick={handleUpdate}>Update</button>
        </div>
    </>);

    const loadingSpinner = (<>
        <div className="d-flex justify-content-center align-items-center p-4 mt-3">
            <span className="loader"></span>
        </div>
    </>);

    const mainLoading = (<>
        <div className="main-div-dashboard">
            <div className="sub-main-div">
                <div className="d-flex justify-content-center align-items-center custom-loading p-4">
                    <span className="loader"></span>
                </div>
            </div>
        </div>
    </>);

    

    const mainData = (<>
        <div className="main-div-dashboard">
            <div className="sub-main-div">
                <div className="data-div">
                    <h3 className="text-center mt-3">Update CSR Token</h3>
                    <h4 className="mt-4 text-center">Current Token: {(token)&&token}</h4>
                    <div className="d-flex justify-content-center align-items-center mt-4">
                        <label>
                            New CSR Token
                            <input className="main-input" type="text" onChange={(e) => {setNewTokenValue(e.target.value)}}></input>
                        </label>
                    </div>
                    {(emptyErr)&&emptyErr ? emptyError : null}
                    {(randErr)&&randErr ? randError : null}
                    {(successMsg)&&successMsg ? successMessage : null}
                    {(buttonState)&&buttonState ? loadingSpinner : buttonData}
                </div>
            </div>
        </div>
    </>);


    const returnData = (<>
        <Dashboard selected={7}>{(mainState)&&mainState ? mainLoading : mainData}</Dashboard>
    </>);

    return returnData;

};


export default UpdateCSRToken;