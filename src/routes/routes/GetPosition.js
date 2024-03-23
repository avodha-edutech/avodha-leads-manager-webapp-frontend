import React from "react";
import './css/GetPosition.css';
import { useState } from "react";
import { useEffect } from "react";
import { Alert } from "@mui/material";
import axios from "axios";


const GetPosition = () => {

    axios.defaults.withCredentials = true;

    const [token, setToken] = useState(true);
    const [buttonState, setButtonState] = useState(true);
    const [loadingState, setLoadingState] = useState(false);

    const [tokenValue, setTokenValue] = useState(null);
    const [email, setEmail] = useState(null);
    const [language, setLanguage] = useState('Malayalam');
    const [mode, setMode] = useState('Allocation');

    const [searchState, setSearchState] = useState(true);

    const [tokenEmprtErr, setTokenEmptyErr] = useState(false);
    const [emptyErr, setEmptyErr] = useState(false);
    const [formatErr, setFormatErr] = useState(false);
    const [randErr, setRandErr] = useState(false);
    const [invalidTokenErr, setInvalidTokenErr] = useState(false);
    const [userNotErr, setUserNotErr] = useState(false);
    const [noDataErr, setNoDataErr] = useState(false);

    const [data, setData] = useState({email:'',language:'',mode:'',position:''});



    const isValidEmail = (emailInput) => {
        return(emailInput).toLowerCase().match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    };

    const proper = (word) => {
        return(word.charAt(0).toUpperCase()+word.substr(1));
    };



    useEffect(() => {

        var savedTokenValue = localStorage.getItem('financeToken');

        if(savedTokenValue != null)
        {
            setTokenValue(savedTokenValue);
            setToken(false);
        }

    },[]);


    const handleSubmit = () => {

        if((tokenValue)&&tokenValue != null)
        {

            localStorage.setItem('financeToken',(tokenValue)&&tokenValue);

            if((email)&&email != null && (language)&&language != null && (mode)&&mode != null && (tokenValue)&&tokenValue != null)
            {

                if(isValidEmail((email)&&email) != null)
                {
                    
                    setTokenEmptyErr(false);
                    setEmptyErr(false);
                    setFormatErr(false);
                    setRandErr(false);
                    setInvalidTokenErr(false);
                    setUserNotErr(false);
                    setNoDataErr(false);
                    setButtonState(false);
                    setLoadingState(true);

                    var toPostdata = {
                        email: (email)&&email,
                        language: (language)&&language,
                        mode: (mode)&&mode,
                        token: (tokenValue)&&tokenValue
                    };

                    axios.post('https://apileads.avodha.net/api/v1/getposition',(toPostdata)).then((data) => {

                        if(data.data.status === true)
                        {
                            
                            setData(data.data);

                            setSearchState(false);

                        } else
                        {
                            if(data.data.code === "ER001")
                            {
                                setTokenEmptyErr(false);
                                setEmptyErr(false);
                                setFormatErr(false);
                                setRandErr(true);
                                setInvalidTokenErr(false);
                                setUserNotErr(false);
                                setNoDataErr(false);
                                setButtonState(true);
                                setLoadingState(false);
                            } else if(data.data.code === "ER002")
                            {
                                setTokenEmptyErr(false);
                                setEmptyErr(true);
                                setFormatErr(false);
                                setRandErr(false);
                                setInvalidTokenErr(false);
                                setUserNotErr(false);
                                setNoDataErr(false);
                                setButtonState(true);
                                setLoadingState(false);
                            } else if(data.data.code === "ER006")
                            {

                                localStorage.removeItem('financeToken');
                                setToken(true);

                                setTokenEmptyErr(false);
                                setEmptyErr(false);
                                setFormatErr(false);
                                setRandErr(false);
                                setInvalidTokenErr(true);
                                setUserNotErr(false);
                                setNoDataErr(false);
                                setButtonState(true);
                                setLoadingState(false);
                            } else if(data.data.code === "ER003")
                            {
                                setTokenEmptyErr(false);
                                setEmptyErr(false);
                                setFormatErr(true);
                                setRandErr(false);
                                setInvalidTokenErr(false);
                                setUserNotErr(false);
                                setNoDataErr(false);
                                setButtonState(true);
                                setLoadingState(false);
                            } else if (data.data.code === "ER011")
                            {
                                setTokenEmptyErr(false);
                                setEmptyErr(false);
                                setFormatErr(false);
                                setRandErr(false);
                                setInvalidTokenErr(false);
                                setUserNotErr(false);
                                setNoDataErr(true);
                                setButtonState(true);
                                setLoadingState(false);
                            } else if(data.data.code === "ER009")
                            {
                                setTokenEmptyErr(false);
                                setEmptyErr(false);
                                setFormatErr(false);
                                setRandErr(false);
                                setInvalidTokenErr(false);
                                setUserNotErr(true);
                                setNoDataErr(false);
                                setButtonState(true);
                                setLoadingState(false);
                            } else
                            {
                                setTokenEmptyErr(false);
                                setEmptyErr(false);
                                setFormatErr(false);
                                setRandErr(true);
                                setInvalidTokenErr(false);
                                setUserNotErr(false);
                                setNoDataErr(false);
                                setButtonState(true);
                                setLoadingState(false);
                            }
                        }

                    }).catch((e) => {
                        setTokenEmptyErr(false);
                        setEmptyErr(false);
                        setFormatErr(false);
                        setRandErr(true);
                        setInvalidTokenErr(false);
                        setUserNotErr(false);
                        setNoDataErr(false);
                        setButtonState(true);
                        setLoadingState(false);
                    });

                } else
                {
                    setTokenEmptyErr(false);
                    setEmptyErr(false);
                    setFormatErr(true);
                    setRandErr(false);
                    setInvalidTokenErr(false);
                    setUserNotErr(false);
                    setNoDataErr(false);
                    setButtonState(true);
                    setLoadingState(false);
                }

            } else
            {
                setTokenEmptyErr(false);
                setEmptyErr(true);
                setFormatErr(false);
                setRandErr(false);
                setInvalidTokenErr(false);
                setUserNotErr(false);
                setNoDataErr(false);
                setButtonState(true);
                setLoadingState(false);    
            }

        } else
        {
            setTokenEmptyErr(true);
            setEmptyErr(false);
            setFormatErr(false);
            setRandErr(false);
            setInvalidTokenErr(false);
            setUserNotErr(false);
            setNoDataErr(false);
            setButtonState(true);
            setLoadingState(false);
        }

    };

    const refreshFunction = () => {
        setTokenEmptyErr(false);
        setEmptyErr(false);
        setFormatErr(false);
        setRandErr(false);
        setInvalidTokenErr(false);
        setUserNotErr(false);
        setNoDataErr(false);
        setButtonState(true);
        setLoadingState(false);
        setSearchState(true);
        setToken(false);
    }



    const loadingSpinner = (<>
    <div className="d-flex justify-content-center align-items-center p-4 mt-4">
        <span className="loader"></span>
    </div>
    </>);


    //errors
    const tokenEmptyError = (
        <div className="d-flex justify-content-center align-items-center mt-4">
            <Alert severity="error" className="mt-3">Access Token cannot be empty</Alert>
        </div>
    );

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

    const invalidTokenError = (
        <div className="d-flex justify-content-center align-items-center mt-4">
            <Alert severity="error" className="mt-3">Invalid or expired Access Token</Alert>
        </div>
    );

    const userNotFoundError = (
        <div className="d-flex justify-content-center align-items-center mt-4">
            <Alert severity="error" className="mt-3">User not found on database</Alert>
        </div>
    );

    const noDataError = (
        <div className="d-flex justify-content-center align-items-center mt-4">
            <Alert severity="error" className="mt-3">No data found on database</Alert>
        </div>
    );
    //errors

    

    const tokenData = (<>
    <div className="d-flex justify-content-center align-items-center mt-3">
        <label>
            Access Token
            <input type="text" className="main-input" onChange={(e) => {setTokenValue(e.target.value)}}></input>
        </label>
    </div>
    </>);

    const buttonData = (<>
    <div className="d-flex justify-content-center align-items-center mt-3 p-4">
        <button className="main-button" onClick={handleSubmit}>Submit</button>
    </div>
    </>);

    
    const searchData = (<>
    <h3 className="text-center mt-2">Get User Position</h3>
        <div className="d-flex justify-content-center align-items-center mt-4">
            <label>
                Email
                <input type="email" className="main-input" onChange={(e) => {setEmail(e.target.value)}}></input>
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
        {(token)&&token ? tokenData : null}
        {(tokenEmprtErr)&&tokenEmprtErr ? tokenEmptyError : null}
        {(emptyErr)&&emptyErr ? emptyError : null}
        {(formatErr)&&formatErr ? formatError : null}
        {(randErr)&&randErr ? randError : null}
        {(invalidTokenErr)&&invalidTokenErr ? invalidTokenError : null}
        {(userNotErr)&&userNotErr ? userNotFoundError : null}
        {(noDataErr)&&noDataErr ? noDataError : null}
        {(loadingState)&&loadingState ? loadingSpinner : null}
        {(buttonState)&&buttonState ? buttonData : null}
    </>);


    const resultData = (<>
    <div className="d-flex justify-content-center align-items-center mt-3">
        <h3 className="text-center">User Details</h3>
    </div>
    <div className="p-4">
        <h4 className="text-center mt-2">Email: {(data).email&&data.email}</h4>
        <h4 className="text-center mt-2">Language: {proper((data).language&&data.language)}</h4>
        <h4 className="text-center mt-2">Mode: {proper((data).mode&&data.mode)}</h4>
        <h4 className="text-center mt-2">Position: {(data).position&&data.position}</h4>
    </div>
    <div className="d-flex justify-content-center align-items-center mb-4 mt-2">
        <button className="main-button" onClick={refreshFunction}>Okay</button>
    </div>
    </>);


    const mainData = (<>
    
    <div className="main-div">
        <div className="sub-main-div">
            <div className="data-div">
                {(searchState)&&searchState ? searchData : resultData}
            </div>
        </div>
    </div>
    
    </>);

    return mainData;


};


export default GetPosition;