import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


function SignUp(props) {

  const [credentials, setcredentials] = useState({ name: "", email: "", password: "", cpassword: "" });

  const onChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value })
  }

  let history = useNavigate();

  const handleSubmit = async (e) => {

    if (credentials.password.length >= 5 && credentials.password === credentials.cpassword && credentials.name.length >= 1) {
      e.preventDefault();
      const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //   "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQ5ZWFkYjZhZDFjOWE2Y2E1OTQ3NzUyIn0sImlhdCI6MTY4ODEyMjk2OH0.enexaEvvtEx6xmbPUvPfDxr8jNGytE0XzGbiF74kr-c"
        },
        body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password }),
      });
      const json = await response.json();
      if (json.success) {
        localStorage.setItem('token', json.authToken);
        history("/");
        props.showAlert("Sign Up Successfully","success");
      }
      else {
         props.showAlert(json.error,"danger");
      }
    }
    else {
        props.showAlert("Invalid Credentials","danger");
    }
  }

  return (
    <div className="container col-md-6">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" name="name" onChange={onChange} id="name" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" name="email" onChange={onChange} id="email" aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name="password" minLength={5} required onChange={onChange} id="password" />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" name="cpassword" minLength={5} required onChange={onChange} id="cpassword" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default SignUp
