import React from "react";
import Dashboard from './components/Dashboard';
import './css/Dashboard.css';
import NoDataImage from './assets/no-data.svg';
import { useState } from "react";
import { Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';


const GetList = () => {

    axios.defaults.withCredentials = true;

    const [refreshState, setRefreshState] = useState(false);

    const [buttonState, setButtonState] = useState(false);

    const [mode, setMode] = useState('Allocation');
    const [language, setLanguage] = useState('Malayalam');

    const [emptyErr, setEmptyErr] = useState(false);
    const [formatErr, setFormatErr] = useState(false);
    const [randErr, setRandErr] = useState(false);
    const [noDataErr, setNoDataErr] = useState(false);

    const [formShow, setFormShow] = useState(true);
    const [dataShow, setDataShow] = useState(false);

    const [resData, setResData] = useState(null);



    const navigate = useNavigate();


    const handleHoverEnter = () => {
        setRefreshState(true);
    }

    const handleHoverLeave = () => {
        setRefreshState(false);
    }

    const refreshFunction = () => {
        window.location.reload();
    }


    const handleSubmit = () => {

        if((mode)&&mode != null && (language)&&language != null)
        {
            setButtonState(true);
            setEmptyErr(false);
            setFormatErr(false);
            setRandErr(false);
            setNoDataErr(false);
            setFormShow(true);
            setDataShow(false);

            var modeValue = (mode)&&mode;
            var languageValue = (language)&&language

            var requestUrl = "https://apileads.avodha.net/api/v1/getlist/" + modeValue + "/" + languageValue;

            axios.get(requestUrl).then((data) => {

                if(data.data.status === true)
                {

                    setResData(data.data.users);
                    setButtonState(true);
                    setEmptyErr(false);
                    setFormatErr(false);
                    setRandErr(false);
                    setNoDataErr(false);
                    setFormShow(false);
                    setDataShow(true);

                } else
                {
                    if(data.data.code === "ER001")
                    {
                        setButtonState(false);
                        setEmptyErr(false);
                        setFormatErr(false);
                        setRandErr(true);
                        setNoDataErr(false);
                        setFormShow(true);
                        setDataShow(false);
                    } else if(data.data.code === "ER002")
                    {
                        setButtonState(false);
                        setEmptyErr(true);
                        setFormatErr(false);
                        setRandErr(false);
                        setNoDataErr(false);
                        setFormShow(true);
                        setDataShow(false);
                    } else if(data.data.code === "ER003")
                    {
                        setButtonState(false);
                        setEmptyErr(false);
                        setFormatErr(true);
                        setRandErr(false);
                        setNoDataErr(false);
                        setFormShow(true);
                        setDataShow(false);
                    } else if(data.data.code === "ER011")
                    {
                        setButtonState(false);
                        setEmptyErr(false);
                        setFormatErr(false);
                        setRandErr(false);
                        setNoDataErr(true);
                        setFormShow(false);
                        setDataShow(false);
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
                setFormShow(true);
                setDataShow(false);
            });

        } else
        {
            setButtonState(false);
            setEmptyErr(true);
            setFormatErr(false);
            setRandErr(false);
            setNoDataErr(false);
            setFormShow(true);
            setDataShow(false);
        }

    }


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

    //errors


    const buttonData = (<>
    <div className="d-flex justify-content-center align-items-center mt-3 p-4">
        <button className="main-button" onClick={handleSubmit}>Submit</button>
    </div>
    </>);

    const loadingSpinner = (<>
        <div className="d-flex justify-content-center align-items-center p-4 mt-4">
            <span className="loader"></span>
        </div>
    </>);


    const noData = (<>
        <div className="main-div-dashboard">
            <div className="sub-main-div">
               <div className="data-div">
                    <div className="d-flex justify-content-center align-items-center p-4">
                        <img className="img-fluid no-data" src={NoDataImage}></img>
                    </div>
                    <h3 className="text-center">Sorry, No data found</h3>
                    <div className="d-flex justify-content-center align-items-center p-4">
                        <button className="main-button" onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave} onClick={refreshFunction}>Refresh<i className={(refreshState)&&refreshState ? 'fa-solid fa-arrows-rotate refresh-icon rotate' : 'fa-solid fa-arrows-rotate refresh-icon'}></i></button>
                    </div>
               </div>
            </div>
        </div>
    </>);

    const formData = (<>

        <div className="main-div-dashboard">
            <div className="sub-main-div">
                <div className="data-div">
                    <h3 className="text-center mt-3">Get Users List</h3>
                    <div className="d-flex justify-content-center align-items-center mt-4">
                        <label>
                            Mode
                            <select className="main-input" onChange={(e) => {setMode(e.target.value)}}>
                                <option>Allocation</option>
                                <option>Reallocation</option>
                            </select>
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
                    {(emptyErr)&&emptyErr ? emptyError : null}
                    {(formatErr)&&formatErr ? formatError : null}
                    {(randErr)&&randErr ? randError : null}
                    {(buttonState)&&buttonState ? loadingSpinner : buttonData}
                </div>
            </div>
        </div>

    </>);

    const responseData = (<>

        <div className="main-div-dashboard">
            <div className="sub-main-div">
                <div className="data-div">
                    <h3 className="text-center mt-3">{(language)&&language} {(mode)&&mode} Users List</h3>
                    <div className="d-flex justify-content-center align-items-center mt-4 p-4">
                        <div className="table-responsive">
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th>Sl.No</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        (resData)&&resData.map((subdata,index) => {
                                            return(
                                            <tr key={index}>
                                                <td key={index + 1}>{index + 1}</td>
                                                <td key={index + 2}>{subdata.email}</td>
                                            </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        </div>
                    </div>
                    <div className="d-flex justify-content-center align-items-center mb-4">
                        <button className="main-button" onClick={refreshFunction}>Okay</button>
                    </div>
                </div>
            </div>
        </div>

    </>);


    const mainData = (<>
    
    {(formShow)&&formShow ? formData : null}
    {(dataShow)&&dataShow ? responseData : null}
    {(noDataErr)&&noDataErr ? noData : null}

    </>);


    const returnData = (<>
        <Dashboard selected={3}>{mainData}</Dashboard>
    </>);

    
    return returnData;


};


export default GetList;