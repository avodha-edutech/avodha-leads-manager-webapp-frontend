import React from "react";
import Dashboard from './components/Dashboard';
import './css/Dashboard.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert } from "@mui/material";


const UpdateLegacy = () => {

    axios.defaults.withCredentials = true;

    const [loadingState, setLoadingState] = useState(false);

    const [email,setEmail] = useState(null);
    const [language,setLanguage] = useState('Malayalam');
    const [legacy,setLegacy] = useState(null);
    const [mode, setMode] = useState('Allocation');

    const [emptyErr, setEmptyErr] = useState(false);
    const [formatErr, setFormatErr] = useState(false);
    const [randErr, setRandErr] = useState(false);
    const [userNotFoundErr, setNoDataFoundErr] = useState(false);
    const [successMsg, setSuccessMsg] = useState(false);

    const navigate = useNavigate();


    const isValidEmail = (emailID) => {
        return(emailID).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    };


    const handleSubmit = () => {
        
        if((email)&&email != null && (language)&&language != null && (legacy)&&legacy != null && (mode)&&mode != null)
        {

            if(isValidEmail((email)&&email) != null && Number.isInteger(Number((legacy)&&legacy)) === true)
            {
                
                setLoadingState(true);
                setEmptyErr(false);
                setFormatErr(false);
                setRandErr(false);
                setNoDataFoundErr(false);
                setSuccessMsg(false);

                var toPostData = {
                    email: (email)&&email,
                    language: (language)&&language,
                    mode: (mode)&&mode,
                    legacy: (legacy)&&legacy
                };

                axios.put('https://apileads.avodha.net/api/v1/updatelegacy',(toPostData)).then((data) => {

                
                    if(data.data.status === true)
                    {
                        
                        setLoadingState(false);
                        setEmptyErr(false);
                        setFormatErr(false);
                        setRandErr(false);
                        setNoDataFoundErr(false);
                        setSuccessMsg(true);

                    }else
                    {
                        if(data.data.code === "ER001")
                        {
                            setLoadingState(false);
                            setEmptyErr(false);
                            setFormatErr(false);
                            setRandErr(true);
                            setNoDataFoundErr(false);
                            setSuccessMsg(false);
                        } else if(data.data.code === "ER002")
                        {
                            setLoadingState(false);
                            setEmptyErr(true);
                            setFormatErr(false);
                            setRandErr(false);
                            setNoDataFoundErr(false);
                            setSuccessMsg(false);
                        } else if(data.data.code === "ER003")
                        {
                            setLoadingState(false);
                            setEmptyErr(false);
                            setFormatErr(true);
                            setRandErr(false);
                            setNoDataFoundErr(false);
                            setSuccessMsg(false);
                        } else if(data.data.code === "ER011")
                        {
                            setLoadingState(false);
                            setEmptyErr(false);
                            setFormatErr(false);
                            setRandErr(false);
                            setNoDataFoundErr(true);
                            setSuccessMsg(false);
                        } else
                        {
                            localStorage.clear('isLogin');
                            navigate('/logavodhaleadsin');
                        }
                    }


                }).catch((e) => {
                    setLoadingState(false);
                    setEmptyErr(false);
                    setFormatErr(false);
                    setRandErr(true);
                    setNoDataFoundErr(false);
                    setSuccessMsg(false);
                });

            } else
            {
                setLoadingState(false);
                setEmptyErr(false);
                setFormatErr(true);
                setRandErr(false);
                setNoDataFoundErr(false);
                setSuccessMsg(false);
            }

        } else
        {
            setLoadingState(false);
            setEmptyErr(true);
            setFormatErr(false);
            setRandErr(false);
            setNoDataFoundErr(false);
            setSuccessMsg(false);
        }

    };



    const buttonData = (<>
        <div className="d-flex justify-content-center align-items-center mt-3 p-4">
            <button className="main-button" onClick={handleSubmit}>Submit</button>
        </div>
    </>);

    const loadingSpinner = (<>
        <div className="d-flex justify-content-center align-items-center p-4 mt-3">
            <span className="loader"></span>
        </div>
    </>);


    //errors

    const emptyError = (
        <div className="d-flex justify-content-center align-items-center mt-4">
            <Alert severity="error" className="mt-3">Input fields cannot be empty</Alert>
        </div>
    );

    const formatError = (
        <div className="d-flex justify-content-center align-items-center mt-4">
            <Alert severity="error" className="mt-3">Inavlid input formats</Alert>
        </div>
    );

    const randError = (
        <div className="d-flex justify-content-center align-items-center mt-4">
            <Alert severity="error" className="mt-3">Something went wrong </Alert>
        </div>
    );

    const userNotFoundError = (
        <div className="d-flex justify-content-center align-items-center mt-4">
            <Alert severity="error" className="mt-3">User not found on database</Alert>
        </div>
    );

    const successMessage = (
        <div className="d-flex justify-content-center align-items-center mt-4">
            <Alert severity="success" className="mt-3">Successfully updated legacy count</Alert>
        </div>
    );

    //errors


    const mainData = (<>
        <div className="main-div-dashboard">
            <div className="sub-main-div">
                <div className="data-div">
                    <h3 className="text-center mt-3">Update Legacy Count</h3>
                    <div className="d-flex justify-content-center align-items-center mt-4">
                        <label>
                            Email
                            <input className="main-input" type="email" onChange={(e) => {setEmail(e.target.value)}}></input>
                        </label>
                    </div>
                    <div className="d-flex justify-content-center align-items-center mt-3">
                        <label>
                            Language
                            <select className="main-input" onChange={(e) => {setLanguage(e.target.value)}}>
                                <option>Malayalam</option>
                                <option>Tamil</option>
                                <option>Kannada</option>
                                <option>Telugu</option>
                                <option>Hindi</option>
                            </select>
                        </label>
                    </div>
                    <div className="d-flex justify-content-center align-items-center mt-3">
                        <label>
                            Legacy
                            <input className="main-input" type="text" onChange={(e) => {setLegacy(e.target.value)}}></input>
                        </label>
                    </div>
                    <div className="d-flex justify-content-center align-items-center mt-3">
                        <label>
                            Mode
                            <select className="main-input" onChange={(e) => {setMode(e.target.value)}}>
                                <option>Allocation</option>
                                <option>Reallocation</option>
                            </select>
                        </label>
                    </div>
                    {(emptyErr)&&emptyErr ? emptyError : null}
                    {(formatErr)&&formatErr ? formatError : null}
                    {(randErr)&&randErr ? randError : null}
                    {(userNotFoundErr)&&userNotFoundErr ? userNotFoundError : null}
                    {(successMsg)&&successMsg ? successMessage : null}
                    {(loadingState)&&loadingState ? loadingSpinner : buttonData}
                </div>
            </div>
        </div>
    </>);

    const returnData = (<>
    
        <Dashboard selected={2}>{mainData}</Dashboard>

    </>);


    return returnData;


};


export default UpdateLegacy;