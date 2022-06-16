import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Signup(props) {
  const [credential, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" })
  let navigate = useNavigate();
  //destructring for take out from credential
  const { name, email, password } = credential
  const handleSubmit = async (e) => {
    e.preventDefault();
    //ApiCall
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json()
    console.log(json)
    if (json.success) {
      // save auth token and redirect 
      localStorage.setItem('token', json.authToken);
      navigate("/");
      props.showAlert("Singuped  Succesfully","success")
    }
    else {
      alert("invalid ")
      props.showAlert("Invalide Credentials","danger")
    }


  }
  const onChange = (e) => {
    setCredentials({ ...credential, [e.target.name]: e.target.value })

  }
  return (
    <>
      <div className="container w-50 h-50">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="name" className="form-control" name='name' value={credential.name} onChange={onChange} id="name" aria-describedby="emailHelp" required />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" name='email' value={credential.email} onChange={onChange} id="email" aria-describedby="emailHelp" required />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" name='password' value={credential.password} onChange={onChange} id="password" minLength={5} required />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Password</label>
            <input type="cpassword" className="form-control" name='cpassword' onChange={onChange} id="password" minLength={5} required />
          </div>
          <button type="submit" className="btn btn-primary"  >SignUp</button>
        </form>
      </div>
    </>
  )
}

export default Signup
