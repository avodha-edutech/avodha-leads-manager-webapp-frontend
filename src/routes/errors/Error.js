import React from "react";
import './css/Error.css';
import ErrorImage from './assets/Error-Image.svg';
import { useState } from "react";


const Error = () => {

    const [rotateState, setRotateState] = useState(false);

    const handleHoverEnter = () => {
        setRotateState(true);
    };

    const handleHoverLeave = () => {
        setRotateState(false);
    };

    const refreshFunction = () => {
        window.location.href = '/';
    }

    const ErrorFunction = (<>
    
        <div className="error-main-div">
            <div className="d-flex justify-content-center align-items-center p-4">
                <img className="img-fluid error-image p-4" src={ErrorImage}/>
            </div>
            <div className="d-flex justify-content-center align-items-center mt-4 p-4 mx-auto">
                <button className="main-button" onMouseEnter={handleHoverEnter} onMouseLeave={handleHoverLeave} onClick={refreshFunction}>Refresh<i className={(rotateState)&&rotateState ? 'fa-solid fa-arrows-rotate refresh-icon rotate' : 'fa-solid fa-arrows-rotate refresh-icon'}></i></button>
            </div>
        </div>
        
    </>);

    return ErrorFunction;

};


export default Error;