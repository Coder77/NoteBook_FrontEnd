import React from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import './Titlebar.css' 

function TitleBar() {

    let location = useLocation();
    let Navigate = useNavigate();
    const handleLogOut = () => {
        Navigate("/login");
        localStorage.removeItem('token');
        console.log("LoggedOut");
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    {/* <Link className="navbar-brand" to="/">NoteBook</Link> */}
                    <div className="logo mx-4">
                            <Link to="/">
                                <span className="note"><b>Note</b></span>
                                <span className="book"><b>Book</b></span>
                            </Link>
                        </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse mx-3" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ margin: "0", padding: "0" }}>
                            <li className="nav-item mx-1">
                                <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
                            </li>
                            {/* <li className="nav-item mx-1">
                                <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
                            </li>
                            <li className="nav-item mx-1">
                                <Link className={`nav-link ${location.pathname==="/add"?"active":""}`} to="/add">Add Note</Link>
                            </li> */}
                        </ul>
                        {!localStorage.getItem('token') ?<form className="d-flex">
                            <Link className="btn btn-success mx-1" to="/login" role="button">LogIn</Link>
                            <Link className="btn btn-success mx-1" to="/signup" role="button">SignUp</Link>
                        </form> :
                            <form className="d-flex">
                            <Link className="btn btn-success mx-1" to="/login" onClick={handleLogOut} role="button">LogOut</Link>
                            </form>
                        }
                    </div>
                </div>
            </nav>

        </>
    )
}

export default TitleBar
