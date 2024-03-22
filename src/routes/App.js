import React from "react";
import Error from "./errors/Error";
import Forms from "./routes/Form";
import GetPosition from "./routes/GetPosition";
import Login from "./routes/Login";
import Verification from './verification/Verification';
import AddUser from "./routes/AddUser";
import UpdateLegacy from "./routes/UpdateLegacy";
import GetList from "./routes/GetList";
import GetUserData from "./routes/GetUserData";
import DeleteUser from "./routes/DeleteUser";
import DeleteAllUsers from "./routes/DeleteAllUsers";
import UpdateCSRToken from "./routes/UpdateCSRToken";
import UpdateFinanceToken from "./routes/UpdateFinanceToken";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const App = () => {
    
    const RouteFunction = (<>

        <Router>
            <Routes>
                <Route path="/" element={<Forms />} />
                <Route path="/position" element={<GetPosition />} />
                <Route path="/logavodhaleadsin" element={<Login />} />
                <Route element={<Verification />}>
                    <Route path="/dashboard" element={<AddUser />} />
                    <Route path="/dashboard/updatelegacy" element={<UpdateLegacy />} />
                    <Route path="/dashboard/getlist" element={<GetList />} />
                    <Route path="/dashboard/getuserdata" element={<GetUserData />} />
                    <Route path="/dashboard/deleteuser" element={<DeleteUser />} />
                    <Route path="/dashboard/deleteallusers" element={<DeleteAllUsers />} />
                    <Route path="/dashboard/updatecsrtoken" element={<UpdateCSRToken />} />
                    <Route path="/dashboard/updatefinancetoken" element={<UpdateFinanceToken />} />
                </Route>
                <Route path="*" element={<Error />} />
            </Routes>
        </Router>

    </>);

    return RouteFunction;

};


export default App;