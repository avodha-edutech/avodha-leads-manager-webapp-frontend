import React from "react";
import './css/Dashboard.css';
import profileImage from './assets/profile.png';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Dashboard = (props) => {

    axios.defaults.withCredentials = true;
    
    const [toggleState, setToggleState] = useState(true);

    const navigate = useNavigate();


    const toggleFunction = () => {
        if((toggleState)&&toggleState === true)
        {
            setToggleState(false);
        } else
        {
            setToggleState(true);
        }
    };


    const logoutFunction = () => {
        axios.get('https://apileads.avodha.net/api/v1/logout').then((data) => {

            if(data.data.status === true)
            {

                localStorage.removeItem('isLogin');
                navigate('/logavodhaleadsin');

            } else
            {
                localStorage.removeItem('isLogin');
                navigate('/logavodhaleadsin');
            }

        }).catch((e) => {
            localStorage.removeItem('isLogin');
            navigate('/logavodhaleadsin');
        });
    }




    const mainData = (<>
        <div className="dashboard">
            <div className={(toggleState)&&toggleState ? 'sidebar close-sidebar' : 'sidebar'}>
                <div className="d-flex justify-content-center align-items-center mt-4">
                    <img className="profile" src={profileImage}></img>
                </div>
                <h4 className="text-center mb-4">Avodha</h4>
                <div className={props.selected === 1 ? 'options selected' : 'options'} onClick={() => {navigate('/dashboard')}}>Add Users <i className="fa-solid fa-user-plus"></i></div>
                <div className={props.selected === 2 ? 'options selected' : 'options'} onClick={() => {navigate('/dashboard/updatelegacy')}}>Update Legacy <i className="fa-solid fa-pen"></i></div>
                <div className={props.selected === 3 ? 'options selected' : 'options'} onClick={() => {navigate('/dashboard/getlist')}}>Get List <i className="fa-solid fa-list"></i></div>
                <div className={props.selected === 4 ? 'options selected' : 'options'} onClick={() => {navigate('/dashboard/getuserdata')}}>Get User Data <i className="fa-solid fa-database"></i></div>
                <div className={props.selected === 5 ? 'options selected' : 'options'} onClick={() => {navigate('/dashboard/deleteuser')}}>Delete User <i className="fa-solid fa-user-minus"></i></div>
                <div className={props.selected === 6 ? 'options selected' : 'options'} onClick={() => {navigate('/dashboard/deleteallusers')}}>Delete All Users <i className="fa-solid fa-trash"></i></div>
                <div className={props.selected === 7 ? 'options selected' : 'options'} onClick={() => {navigate('/dashboard/updatecsrtoken')}}>Update CSR Token <i className="fa-solid fa-phone"></i></div>
                <div className={props.selected === 8 ? 'options selected' : 'options'} onClick={() => {navigate('/dashboard/updatefinancetoken')}}>Update Finance Token <i className="fa-solid fa-sack-dollar"></i></div>
                <div className={props.selected === 9 ? 'options selected down' : 'options down'} onClick={logoutFunction}>Logout <i className="fa-solid fa-right-from-bracket"></i></div>
            </div>
            <div className={(toggleState)&&toggleState ? 'work-space' : 'work-space open-toggle'}>
                <button className="toggle-button" onClick={toggleFunction}>{(toggleState)&&toggleState ? <i className="fa-solid fa-bars"></i> : <i className="fa-solid fa-xmark"></i>}</button>
                <div className="main-work-space">
                    {props.children}
                </div>
            </div>
        </div>
    </>);

    return mainData;

};


export default Dashboard;