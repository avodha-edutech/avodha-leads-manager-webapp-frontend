import React from "react";
import './css/Form.css';
import { useState, useEffect } from "react";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import { Alert } from '@mui/material';


const Form = () => {

    axios.defaults.withCredentials = true;

    const [mainStatus, setMainStatus] = useState(false);
    const [mainErrorStatus, setMainErrorStatus] = useState(false);
    const [mainLoadingStatus, setMainLoadingStatus] = useState(true);
    const [hoverStatus, setHoverStatus] = useState(false); 

    const [adNames, setAdNames] = useState(null);
    const [courses, setCourses] = useState(null);
    const [staffNames, setStaffNames] = useState(null);

    const [token,setToken] = useState({status: true, value: null});
    const [tokenValue, setTokenValue] = useState(null);

    const [name, setName] = useState(null);
    const [number, setNumber] = useState(null);
    const [language, setLangauge] = useState('Malayalam');
    const [mode, setMode] = useState('Inbound');
    const [staff, setStaff] = useState(null);
    const [ad, setAd] = useState(null);
    const [courseName, setCourseName] = useState(null);

    const [emptyErr, setEmptyErr] = useState(false);
    const [randomErr, setRandomErr] = useState(false);
    const [tokenEmpty, setTokenEmpty] = useState(false);
    const [invalidToken, setInvalidToken] = useState(false);
    const [formatErr, setFormatErr] = useState(false);
    const [hubspotExists, setHubspotExists] = useState(false);
    const [databaseExists, setDatabaseExists] = useState(false);
    const [successAlert, setSuccessAlert] = useState(false);
    const [buttonState, setButtonState] = useState(true);

    const [submitSpinner, setSubmitSpinner] = useState(false);






    useEffect(() => {
        try
        {

            axios.get('https://apileads.avodha.net/api/v1/punchingfields').then((data) => {

                if(data.data.status === true)
                {
                    var tokenValue = localStorage.getItem('token');

                    if(tokenValue != null)
                    {
                        setToken({status: false, value: tokenValue});
                    }

                    setAdNames(data.data.adnames);
                    setCourses(data.data.courses);
                    setStaffNames(data.data.staffnames);

                    setStaff(data.data.staffnames[0]);
                    setAd(data.data.adnames[0]);
                    setCourseName(data.data.courses[0]);
    
                    setMainStatus(true);
                    setMainErrorStatus(false);
                    setMainLoadingStatus(false); 

                } else
                {
                    setMainStatus(false);
                    setMainErrorStatus(true);
                    setMainLoadingStatus(false);   
                }

            }).catch((e) => {
                setMainStatus(false);
                setMainErrorStatus(true);
                setMainLoadingStatus(false);
                console.error(e); 
            });

        } catch(e)
        {
            setMainStatus(false);
            setMainErrorStatus(true);
            setMainLoadingStatus(false)
            console.error(e);
        }
    },[]);



    const inHover = () => {
        setHoverStatus(true);
    }

    const outHover = () => {
        setHoverStatus(false);
    }

    const refreshFunction = () => {
        window.location.reload();
    };



    const handleSubmit = () => {

        if((tokenValue)&&tokenValue != null)
        {
            localStorage.setItem('token',(tokenValue)&&tokenValue);
        }

        var accessToken = localStorage.getItem('token');

        if(accessToken != null)
        {

            if((name)&&name != null && (number)&&number != null && (language)&&language != null && (mode)&&mode != null && (staff)&&staff != null && (ad)&&ad != null && (courseName)&&courseName != null)
            {

                setEmptyErr(false);
                setRandomErr(false);
                setTokenEmpty(false);
                setInvalidToken(false);
                setFormatErr(false);
                setHubspotExists(false);
                setDatabaseExists(false);
                setSuccessAlert(false);
                setSubmitSpinner(true);
                setButtonState(false);

                try
                {

                    var toPostData = {
                        token: accessToken,
                        name: (name)&&name,
                        number: (number)&&number,
                        language: (language)&&language,
                        mode: (mode)&&mode,
                        staff: (staff)&&staff,
                        ad: (ad)&&ad,
                        course: (courseName)&&courseName
                    };

                    axios.post('https://apileads.avodha.net/api/v1/forms',toPostData).then((data) => {

                    if(data.data.status === true)
                    {
                        setEmptyErr(false);
                        setRandomErr(false);
                        setTokenEmpty(false);
                        setInvalidToken(false);
                        setFormatErr(false);
                        setHubspotExists(false);
                        setDatabaseExists(false);
                        setSuccessAlert(true);
                        setSubmitSpinner(false);
                        setButtonState(true);    
                    } else
                    {
                        if(data.data.code === "ER001")
                        {
                            setEmptyErr(false);
                            setRandomErr(true);
                            setTokenEmpty(false);
                            setInvalidToken(false);
                            setFormatErr(false);
                            setHubspotExists(false);
                            setDatabaseExists(false);
                            setSuccessAlert(false);
                            setSubmitSpinner(false);
                            setButtonState(true);    
                        } else if(data.data.code === "ER010")
                        {
                            setEmptyErr(false);
                            setRandomErr(false);
                            setTokenEmpty(true);
                            setInvalidToken(false);
                            setFormatErr(false);
                            setHubspotExists(false);
                            setDatabaseExists(false);
                            setSuccessAlert(false);
                            setSubmitSpinner(false);
                            setButtonState(true);
                        } else if(data.data.code === "ER006")
                        {
                            localStorage.clear('token');
                            setToken({status: true, value: null});
                            setEmptyErr(false);
                            setRandomErr(false);
                            setTokenEmpty(false);
                            setInvalidToken(true);
                            setFormatErr(false);
                            setHubspotExists(false);
                            setDatabaseExists(false);
                            setSuccessAlert(false);
                            setSubmitSpinner(false);
                            setButtonState(true);
                        } else if(data.data.code === "ER002")
                        {
                            setEmptyErr(true);
                            setRandomErr(false);
                            setTokenEmpty(false);
                            setInvalidToken(false);
                            setFormatErr(false);
                            setHubspotExists(false);
                            setDatabaseExists(false);
                            setSuccessAlert(false);
                            setSubmitSpinner(false);
                            setButtonState(true);
                        } else if(data.data.code === "ER003")
                        {
                            setEmptyErr(false);
                            setRandomErr(false);
                            setTokenEmpty(false);
                            setInvalidToken(false);
                            setFormatErr(true);
                            setHubspotExists(false);
                            setDatabaseExists(false);
                            setSuccessAlert(false);
                            setSubmitSpinner(false);
                            setButtonState(true);   
                        } else if (data.data.code === "ER013")
                        {
                            setEmptyErr(false);
                            setRandomErr(false);
                            setTokenEmpty(false);
                            setInvalidToken(false);
                            setFormatErr(false);
                            setHubspotExists(true);
                            setDatabaseExists(false);
                            setSuccessAlert(false);
                            setSubmitSpinner(false);
                            setButtonState(true);
                        } else if(data.data.code === "ER012")
                        {
                            setEmptyErr(false);
                            setRandomErr(false);
                            setTokenEmpty(false);
                            setInvalidToken(false);
                            setFormatErr(false);
                            setHubspotExists(false);
                            setDatabaseExists(true);
                            setSuccessAlert(false);
                            setSubmitSpinner(false);
                            setButtonState(true);
                        } else
                        {
                            setEmptyErr(false);
                            setRandomErr(true);
                            setTokenEmpty(false);
                            setInvalidToken(false);
                            setFormatErr(false);
                            setHubspotExists(false);
                            setDatabaseExists(false);
                            setSuccessAlert(false);
                            setSubmitSpinner(false);
                            setButtonState(true);
                        }
                    }

                    }).catch((e) => {
                        setEmptyErr(false);
                        setRandomErr(true);
                        setTokenEmpty(false);
                        setInvalidToken(false);
                        setFormatErr(false);
                        setHubspotExists(false);
                        setDatabaseExists(false);
                        setSuccessAlert(false);
                        setSubmitSpinner(false);
                        setButtonState(true);
                    });

                } catch(e)
                {
                    setEmptyErr(false);
                    setRandomErr(true);
                    setTokenEmpty(false);
                    setInvalidToken(false);
                    setFormatErr(false);
                    setHubspotExists(false);
                    setDatabaseExists(false);
                    setSuccessAlert(false);
                    setSubmitSpinner(false);
                    setButtonState(true);    
                }

            } else
            {
                setEmptyErr(true);
                setRandomErr(false);
                setTokenEmpty(false);
                setInvalidToken(false);
                setFormatErr(false);
                setHubspotExists(false);
                setDatabaseExists(false);
                setSuccessAlert(false);
                setSubmitSpinner(false);
                setButtonState(true);   
            }

        } else
        {
            setEmptyErr(false);
            setRandomErr(false);
            setTokenEmpty(true);
            setInvalidToken(false);
            setFormatErr(false);
            setHubspotExists(false);
            setDatabaseExists(false);
            setSuccessAlert(false);
            setSubmitSpinner(false);
            setButtonState(true);
        }

    };



    const accessTokenData = (<>
    
    <div className="d-flex justify-content-center align-items-center mt-3">
        <label>
            Access Token
            <input type="text" className="main-input" onChange={(e) => {setTokenValue(e.target.value)}}></input>
        </label>
    </div>

    </>);

    //errors

    const emptyError = (
        <div className="d-flex justify-content-center align-items-center mt-4">
            <Alert severity="error" className="mt-3">Input fields cannot be empty</Alert>
        </div>
    );

    const randomError = (
        <div className="d-flex justify-content-center align-items-center mt-4">
            <Alert severity="error" className="mt-3">Something went wrong</Alert>
        </div>
    );

    const emptyAccessTokenError = (
        <div className="d-flex justify-content-center align-items-center mt-4">
            <Alert severity="error" className="mt-3">Access Token cannot be empty</Alert>
        </div>
    );

    const invalidAccessTokenError = (
        <div className="d-flex justify-content-center align-items-center mt-4">
            <Alert severity="error" className="mt-3">Invalid or expired Access Token</Alert>
        </div>
    );

    const formatError = (
        <div className="d-flex justify-content-center align-items-center mt-4">
            <Alert severity="error" className="mt-3">Invalid input formats</Alert>
        </div>
    );

    const alreadyExistsHubspotError = (
        <div className="d-flex justify-content-center align-items-center mt-4">
            <Alert severity="error" className="mt-3">Data already exists in hubspot</Alert>
        </div>
    );

    const alreadyExistsDatabaseError = (
        <div className="d-flex justify-content-center align-items-center mt-4">
            <Alert severity="error" className="mt-3">Data already exists in database</Alert>
        </div>
    );

    const successMsg = (
        <div className="d-flex justify-content-center align-items-center mt-4">
            <Alert severity="success" className="mt-3">Data successfully added</Alert>
        </div>
    );

    //errors

    const loadinSpinner = (<>
    <div className="d-flex justify-content-center align-items-center p-4 mt-4">
        <span className="loader loader-sub"></span>
    </div>
    </>);

    const submitButton = (<>
    <div className="d-flex justify-content-center align-items-center mt-3 p-4">
        <button className="main-button" onClick={handleSubmit}>Submit</button>
    </div>
    </>);



    const formData = (<>
        <div className={(mainStatus)&&mainStatus ? "data-div" : "data-div mt-error"}>
            <h3 className="text-center mt-2">Avodha Leads Form</h3> 
            <div className="d-flex justify-content-center align-items-center mt-4">
                <label>
                    Name
                    <input type="text" className="main-input" onChange={(e) => {setName(e.target.value)}}></input>
                </label>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-3">
                <label>
                    Number
                    <PhoneInput country={'in'} onChange={(e) => {setNumber(e)}}/>
                </label>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-3">
                <label>
                    Language
                    <select className="main-input" onChange={(e) => {setLangauge(e.target.value)}}>
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
                    Mode of Inbound
                    <select className="main-input" onChange={(e) => {setMode(e.target.value)}}>
                        <option>Inbound</option>
                        <option>Inbound Offline</option>
                        <option>DM</option>
                    </select>
                </label>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-3">
                <label>
                    CSR Executive Name
                    <select className="main-input" onChange={(e) => {setStaff(e.target.value)}}>
                        {
                            (staffNames)&&staffNames.map((name,index) => {
                                return <option key={index}>{name}</option>
                            })
                        }
                    </select>
                </label>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-3">
                <label>
                    Creative Material
                    <select className="main-input" onChange={(e) => {setAd(e.target.value)}}>
                        {
                            (adNames)&&adNames.map((ad,index) => {
                                return <option key={index}>{ad}</option>
                            })
                        }
                    </select>
                </label>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-3">
                <label>
                    Preferred Course
                    <select className="main-input" onChange={(e) => {setCourseName(e.target.value)}}>
                        {
                            (courses)&&courses.map((course,index) => {
                                return <option key={index}>{course}</option>
                            })
                        }
                    </select>
                </label>
            </div>
            {(token).status&&token.status ? accessTokenData : null}
            {(emptyErr)&&emptyErr ? emptyError : null}
            {(randomErr)&&randomErr ? randomError : null}
            {(tokenEmpty)&&tokenEmpty ? emptyAccessTokenError : null}
            {(invalidToken)&&invalidToken ? invalidAccessTokenError : null}
            {(formatErr)&&formatErr ? formDataError : null}
            {(hubspotExists)&&hubspotExists ? alreadyExistsHubspotError : null}
            {(databaseExists)&&databaseExists ? alreadyExistsDatabaseError : null}
            {(successAlert)&&successAlert ? successMsg : null}
            {(submitSpinner)&&submitSpinner ? loadinSpinner : null}
            {(buttonState)&&buttonState ? submitButton : null}   
        </div>
    </>);



    const formDataError = (<>
        <div className={(mainStatus)&&mainStatus ? "data-div" : "data-div mt-error"}>
            <h3 className="text-center mt-4">Something went wrong, Please Try Again</h3>
            <div className="d-flex justify-content-center align-items-center p-4">
                <button className="main-button" onMouseEnter={inHover} onMouseLeave={outHover} onClick={refreshFunction}>Refresh<i className={(hoverStatus)&&hoverStatus ? 'fa-solid fa-arrows-rotate refresh-icon rotate' : 'fa-solid fa-arrows-rotate refresh-icon'}></i></button>
            </div>     
        </div>
    </>);



    const mainLoadingSpiner = (<>
    <div className="d-flex justify-content-center align-items-center mt-loading">
        <span className="loader"></span>
    </div>
    </>);



    const mainData = (<>
    
        <div className="main-div">
            <div className="sub-main-div">
                {(mainLoadingStatus)&&mainLoadingStatus ? mainLoadingSpiner : null}
                {(mainStatus)&&mainStatus ? formData : null}
                {(mainErrorStatus)&&mainErrorStatus ? formDataError : null}
            </div>
        </div>

    </>);


    return mainData;


};


export default Form;