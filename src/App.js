import { BrowserRouter, Routes, Route } from "react-router-dom"
import TitleBar from './Components/TitleBar';
import Dashboard from './Components/Dashboard';
import AboutApp from './Components/AboutApp';
import Alert from "./Components/Alert";
import NoteState from "./Context/Notes/NoteState";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import React, {useState} from 'react'


function App() {

    const [alert, setAlert] = useState(null);

    const showAlert = (message, type) => {
        setAlert({
            msg: message,
            type: type
        });
        setTimeout(() => {
            setAlert(null);
        }, 2000);
    }
    return (
        <>
            <NoteState>
                <BrowserRouter>
                    <TitleBar />
                    <div> <Alert alert={alert} /> </div>
                    <div className="container">
                        <Routes>
                            <Route exact path="/" element={<Dashboard showAlert={showAlert} />} />
                            <Route exact path="/about" element={<AboutApp showAlert={showAlert}/>} />
                            <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
                            <Route exact path="/signup" element={<SignUp showAlert={showAlert}/>} />
                        </Routes>
                    </div>
                </BrowserRouter>
            </NoteState>
        </>
    );
}

export default App;
