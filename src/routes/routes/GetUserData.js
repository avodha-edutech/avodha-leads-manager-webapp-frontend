import React from "react";
import Dashboard from './components/Dashboard';
import './css/Dashboard.css';
import { useState } from "react";
import axios from "axios";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";


const GetUserData = () => {

    axios.defaults.withCredentials = true;


    const [buttonState, setButtonState] = useState(false);

    const [emptyErr, setEmptyErr] = useState(false);
    const [formatErr, setFormatErr] = useState(false);
    const [randErr, setRandErr] = useState(false);
    const [noDataErr, setNoDataErr] = useState(false);

    const [formScreen, setFormScreen] = useState(false);


    const [email, setEmail] = useState(null);
    const [mode, setMode] = useState('Allocation');
    const [language, setLanguage] = useState('Malayalam');


    const [response, setResponse] = useState({count:'',email:'',langauge:'',legacy:'',mode:'', position: ''});


    const navigate = useNavigate();



    const properCase = (inputValue) => {
        return inputValue.charAt(0).toUpperCase() + inputValue.substr(1).toLowerCase();
    };


    const refreshFunction = () => {
        window.location.reload();
    };


    const isValidEmail = (emailID) => {
        return(emailID).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    };


    const handleSubmit = () => {

        if((email)&&email != null && (mode)&&mode != null && (language)&&language != null)
        {

            if(isValidEmail((email)&&email) != null)
            {

                setButtonState(true);
                setEmptyErr(false);
                setFormatErr(false);
                setRandErr(false);
                setNoDataErr(false);
                setFormScreen(false);

                var emailValue = (email)&&email;
                var modeValue = (mode)&&mode;
                var languageValue = (language)&&language;

                var apiUri = "https://apileads.avodha.net/api/v1/getuserdata/" + emailValue + "/" + languageValue + "/" + modeValue;

                axios.get(apiUri).then((data) => {

                    if(data.data.status === true)
                    {

                        setResponse(data.data);
                        setButtonState(true);
                        setEmptyErr(false);
                        setFormatErr(false);
                        setRandErr(false);
                        setNoDataErr(false);
                        setFormScreen(true);

                    } else
                    {
                        if(data.data.code === "ER001")
                        {
                            setButtonState(false);
                            setEmptyErr(false);
                            setFormatErr(false);
                            setRandErr(true);
                            setNoDataErr(false);
                            setFormScreen(false);
                        } else if(data.data.code === "ER002")
                        {
                            setButtonState(false);
                            setEmptyErr(true);
                            setFormatErr(false);
                            setRandErr(false);
                            setNoDataErr(false);
                            setFormScreen(false);
                        } else if(data.data.code === "ER003")
                        {
                            setButtonState(false);
                            setEmptyErr(false);
                            setFormatErr(true);
                            setRandErr(false);
                            setNoDataErr(false);
                            setFormScreen(false);
                        } else if(data.data.code === "ER011")
                        {
                            setButtonState(false);
                            setEmptyErr(false);
                            setFormatErr(false);
                            setRandErr(false);
                            setNoDataErr(true);
                            setFormScreen(false);
                        } else
                        {
                            localStorage.removeItem('isLogin');
                            navigate('/logavodhaleadsin');
                        }
                    }

                }).catch((e) => {
                    setButtonState(false);
                    setEmptyErr(false);
                    setFormatErr(false);
                    setRandErr(true);
                    setNoDataErr(false);
                    setFormScreen(false);
                });

            } else
            {
                setButtonState(false);
                setEmptyErr(false);
                setFormatErr(true);
                setRandErr(false);
                setNoDataErr(false);
                setFormScreen(false);
            }

        } else
        {
            setButtonState(false);
            setEmptyErr(true);
            setFormatErr(false);
            setRandErr(false);
            setNoDataErr(false);
            setFormScreen(false);
        }
        
    };



    const buttonData = (<>
        <div className="d-flex justify-content-center align-items-center p-4 mt-3">
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
            <Alert severity="error" className="mt-3">Invalid input formats</Alert>
        </div>
    );

    const randError = (
        <div className="d-flex justify-content-center align-items-center mt-4">
            <Alert severity="error" className="mt-3">Something went wrong</Alert>
        </div>
    );

    const noDataError = (
        <div className="d-flex justify-content-center align-items-center mt-4">
            <Alert severity="error" className="mt-3">No data found on database</Alert>
        </div>
    );

    //errors


    const formData = (<>
        <div className="main-div-dashboard">
            <div className="sub-main-div">
                <div className="data-div">
                    <h3 className="mt-3 text-center">Get User Data</h3>
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
                    {(noDataErr)&&noDataErr ? noDataError : null}
                    {(buttonState)&&buttonState ? loadingSpinner : buttonData}
                </div>
            </div>
        </div>
    </>);

    const responseData = (<>
        <div className="main-div-dashboard">
            <div className="sub-main-div">
                <div className="data-div">
                    <h3 className="mt-3 text-center">User Details</h3>
                    <h4 className="text-center mt-4">Email: {(response).email&&response.email}</h4>
                    <h4 className="text-center mt-2">Language: {properCase((response).langauge&&response.langauge)}</h4>
                    <h4 className="text-center mt-2">Mode: {properCase((response).mode&&response.mode)}</h4>
                    <h4 className="text-center mt-2">Leads Given Count: {(response).count&&response.count}</h4>
                    <h4 className="text-center mt-2">Position: {(response).position&&response.position}</h4>
                    <h4 className="text-center mt-2">Legacy Count: {(response).legacy&&response.legacy}</h4>
                    <div className="d-flex justify-content-center align-items-center mt-3 p-4">
                        <button className="main-button" onClick={refreshFunction}>Okay</button>
                    </div>
                </div>
            </div>
        </div>
    </>);


    const returnData = (<>
        <Dashboard selected={4}>{(formScreen)&&formScreen ? responseData : formData}</Dashboard>
    </>);

    return returnData;


}


export default GetUserData;
