import React from "react";
import Dashboard from "./components/Dashboard";
import './css/Dashboard.css';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Alert } from "@mui/material";


const DeleteAllUsers = () => {

    axios.defaults.withCredentials = true;


    const [buttonState, setButtonState] = useState(false);

    const [emptyErr, setEmptyErr] = useState(false);
    const [invalidErr, setInvalidErr] = useState(false);
    const [randErr, setRandErr] = useState(false);
    const [successMsg, setSuccessMsg] = useState(false);


    const [code, setCode] = useState(null);


    const navigate = useNavigate();



    const handleSubmit = () => {

        if((code)&&code != null)
        {

            if((code)&&code === "deleteallusers")
            {

                setButtonState(true);
                setEmptyErr(false);
                setInvalidErr(false);
                setRandErr(false);
                setSuccessMsg(false);


                var codeValue = (code)&&code;

                var apiUri = "https://apileads.avodha.net/api/v1/deleteallusers/" + codeValue;


                axios.delete(apiUri).then((data) => {

                    if(data.data.status === true)
                    {

                        setButtonState(false);
                        setEmptyErr(false);
                        setInvalidErr(false);
                        setRandErr(false);
                        setSuccessMsg(true);

                    } else
                    {
                        if(data.data.code === "ER001")
                        {
                            setButtonState(false);
                            setEmptyErr(false);
                            setInvalidErr(false);
                            setRandErr(true);
                            setSuccessMsg(false);
                        } else if(data.data.code === "ER002")
                        {
                            setButtonState(false);
                            setEmptyErr(true);
                            setInvalidErr(false);
                            setRandErr(false);
                            setSuccessMsg(false);
                        } else if(data.data.code === "ER003" || data.data.code === "ER014")
                        {
                            setButtonState(false);
                            setEmptyErr(false);
                            setInvalidErr(true);
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
                    setInvalidErr(false);
                    setRandErr(true);
                    setSuccessMsg(false);   
                });


            } else
            {
                setButtonState(false);
                setEmptyErr(false);
                setInvalidErr(true);
                setRandErr(false);
                setSuccessMsg(false);
            }

        } else
        {
            setButtonState(false);
            setEmptyErr(true);
            setInvalidErr(false);
            setRandErr(false);
            setSuccessMsg(false);
        }

    };



    const buttonData = (<>
        <div className="d-flex justify-content-center align-items-center mt-3 p-4">
            <button className="main-button" onClick={handleSubmit}>Delete All Users</button>
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
            <Alert severity="error" className="mt-3">Verification code cannot be empty</Alert>
        </div>
    );

    const invalidError = (
        <div className="d-flex justify-content-center align-items-center mt-4">
            <Alert severity="error" className="mt-3">Please enter "deleteallusers" in the input field</Alert>
        </div>
    );

    const randError = (
        <div className="d-flex justify-content-center align-items-center mt-4">
            <Alert severity="error" className="mt-3">Something went wrong</Alert>
        </div>
    );

    const successMessage = (
        <div className="d-flex justify-content-center align-items-center mt-4">
            <Alert severity="success" className="mt-3">Successfully deleted all users from database</Alert>
        </div>
    );

    //errors



    const mainData = (<>
        <div className="main-div-dashboard">
            <div className="sub-main-div">
                <div className="data-div">
                    <h3 className="mt-3 text-center">Delete All Users</h3>
                    <div className="d-flex justify-content-center align-items-center mt-4">
                        <label>
                            Confirmation
                            <input className="main-input" type="text" placeholder="deleteallusers" onChange={(e) => {setCode(e.target.value)}}></input>
                        </label>
                    </div>
                    {(emptyErr)&&emptyErr ? emptyError : null}
                    {(randErr)&&randErr ? randError : null}
                    {(invalidErr)&&invalidErr ? invalidError : null}
                    {(successMsg)&&successMsg ? successMessage : null}
                    {(buttonState)&&buttonState ? loadingSpinner : buttonData}
                </div>
            </div>
        </div>
    </>);

    const returnData = (<>
        <Dashboard selected={6}>{mainData}</Dashboard>
    </>);

    return returnData;

};


export default DeleteAllUsers;