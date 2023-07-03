import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom' 
function Login(props) {

    const[credentials,setcredentials]=useState({email: "", password: ""});

    const onChange = (e) => {
        setcredentials({...credentials, [e.target.name]: e.target.value})
    }

    let history = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            //   "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5ZWFkYjZhZDFjOWE2Y2E1OTQ3NzUyIn0sImlhdCI6MTY4ODEyMjk2OH0.enexaEvvtEx6xmbPUvPfDxr8jNGytE0XzGbiF74kr-c"
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password}),
          });
          const json  = await response.json();
          if(json.success) 
          {
             localStorage.setItem('token', json.authToken);
             history("/");
             props.showAlert("Logged In Successfully","success");
          }
          else 
          {
            props.showAlert("Invalid Credentials","danger");
          }
          
    }
    return (
        <>
            <div className="container justify-content-center">
                <div className="container col-md-6 my-5">
                    <form onSubmit={handleClick}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" onChange={onChange} value={credentials.email} name="email" id="email" aria-describedby="emailHelp" />
                            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" onChange={onChange} value={credentials.password} name="password" id="password" />
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
